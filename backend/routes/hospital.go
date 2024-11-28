package routes

import (
	"fmt"
	"healthify/backend/models"
	"healthify/backend/storage"
	"healthify/backend/utils"
	"log"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/x/errors"
	"gorm.io/gorm"
)

const (
	invalidSupplierHospitalID = "Invalid supplier"
	invalidProduct            = "Invalid product"
)

// AddOrder is a function that adds an order to the database.
func AddOrder(ctx iris.Context) {
	log.Println("AddOrder")
	var orderInput models.OrderInput
	err := ctx.ReadJSON(&orderInput)
	if err != nil {
		utils.HandleValidationError(err, ctx)
		return
	}

	// check and get SupplierHospitalID if it exists, from SupplierID and HospitalID in the order input
	supplierHospitalID, supplierHospitalIDErr := getAndHandleSupplierHospitalID(&orderInput)
	if supplierHospitalIDErr != nil {
		utils.CreateError(iris.StatusBadRequest, invalidSupplierHospitalID, invalidSupplierHospitalID, ctx)
		return
	}

	if supplierHospitalID == "" {
		log.Println("SupplierHospitalID is empty")
	}

	// check and get ProductIDs if they exist, from ProductIDs in the order input
	productIDs, productIDsErr := getAndHandleProductIDs(&orderInput)
	if productIDsErr != nil {
		utils.CreateError(iris.StatusBadRequest, invalidProduct, invalidProduct, ctx)
		return
	}

	// Create a new orderNumber
	newOrderNumber := "ORD-" + utils.GenerateRandomNumber()
	for orderNumberExists(newOrderNumber) {
		newOrderNumber = "ORD-" + utils.GenerateRandomNumber()
	}

	// create a new order
	newOrder := models.Order{
		OrderNumber:        newOrderNumber,
		SupplierHospitalID: supplierHospitalID,
		Priority:           orderInput.Priority,
		RequiredBy:         orderInput.RequiredBy,
		Notes:              orderInput.Notes,
		Status:             "pending",
		Rating:             0,
		CreatedAt:          utils.GetFormattedTime(),
		UpdatedAt:          utils.GetFormattedTime(),
	}

	if err := storage.DB.Create(&newOrder).Error; err != nil {
		log.Println("Error creating order: ", err)
		utils.CreateInternalError(ctx)
		return
	}
	log.Println("New Order: Added")
	// create order products
	for _, product := range orderInput.Products {
		// check if product exists
		if !productExists(product.ProductID) {
			utils.CreateError(iris.StatusBadRequest, invalidProduct, invalidProduct, ctx)
			return
		}
		// get product
		theProduct := getProduct(product.ProductID)
		newOrderProduct := models.OrderProduct{
			OrderID:    newOrder.ID,
			ProductID:  product.ProductID,
			Quantity:   product.Qty,
			Unit:       product.Unit,
			UnitPrice:  theProduct.Price,
			TotalPrice: theProduct.Price * float64(product.Qty),
			CreatedAt:  utils.GetFormattedTime(),
			UpdatedAt:  utils.GetFormattedTime(),
		}

		if err := storage.DB.Create(&newOrderProduct).Error; err != nil {
			log.Println("Error creating order product: ", err)
			utils.CreateInternalError(ctx)
			return
		}
		log.Println("New Order Product: ", newOrderProduct)
	}

	ctx.StopWithJSON(iris.StatusCreated, iris.Map{
		"message": "Order created",
		"order": iris.Map{
			"order_number": newOrder.OrderNumber,
			"status":       newOrder.Status,
			"priority":     newOrder.Priority,
			"productIDs":   productIDs,
			"created_at":   newOrder.CreatedAt,
		},
	})
}

// getAndHandleSupplierHospitalID is a function that checks and gets the SupplierHospitalID if it exists, from SupplierID and HospitalID in the order input.
func getAndHandleSupplierHospitalID(orderInput *models.OrderInput) (string, error) {
	var supplierHospital models.SupplierHospital
	supplierHospitalIDQuery := storage.DB.Where("supplier_id = ? AND hospital_id = ?", orderInput.SupplierID, orderInput.HospitalID).First(&supplierHospital)
	if supplierHospitalIDQuery.Error != nil {
		if supplierHospitalIDQuery.Error != gorm.ErrRecordNotFound {
			if errors.Is(supplierHospitalIDQuery.Error, gorm.ErrRecordNotFound) {
				log.Println("SupplierHospitalID not found A")
				return "", nil
			}
			log.Println("SupplierHospitalID not found B")
			return "", supplierHospitalIDQuery.Error
		}
	}

	strSupplierHospitalID := fmt.Sprint(supplierHospital.ID)

	if strSupplierHospitalID == "" || strSupplierHospitalID == "0" {
		log.Println("Creating SupplierHospital")
		// Create a ner request code
		newRequestCode := "REQ-" + utils.GenerateRandomNumber()
		for reqCodeExists(newRequestCode) {
			newRequestCode = "REQ-" + utils.GenerateRandomNumber()
		}
		// requirements are an arrray of distinct product categories from the products in the order input
		requirements := []string{}
		for _, product := range orderInput.Products {
			// check if product exists
			if productExists(product.ProductID) {
				// get product category
				theProductCategory := models.GetProductCategory(product.ProductID)
				theProductCategoryName := theProductCategory.Name
				if !utils.Contains(requirements, theProductCategoryName) {
					requirements = append(requirements, theProductCategoryName)
				}
			}
		}
		newSupplierHospital := models.SupplierHospital{
			SupplierID:    orderInput.SupplierID,
			HospitalID:    orderInput.HospitalID,
			RequestCode:   newRequestCode,
			RequestStatus: "pending",
			Requirements:  utils.Join(requirements, ", "),
			Rating: 	  0,
			SupplyStatus:  "pending",
			Status:        "active",
			CreatedAt:     utils.GetFormattedTime(),
			UpdatedAt:     utils.GetFormattedTime(),
		}

		if err := storage.DB.Create(&newSupplierHospital).Error; err != nil {
			return "", err
		}

		return fmt.Sprint(newSupplierHospital.ID), nil
	}

	log.Println("SupplierHospitalID Fimnal: ", supplierHospital.ID)
	return fmt.Sprint(supplierHospital.ID), nil
}

// check if reqCodeExists
func reqCodeExists(reqCode string) bool {
	var supplierHospital models.SupplierHospital
	reqCodeQuery := storage.DB.Where("request_code = ?", reqCode).First(&supplierHospital)
	if reqCodeQuery.Error != nil {
		if errors.Is(reqCodeQuery.Error, gorm.ErrRecordNotFound) {
			return false
		}
		return false
	}

	return true
}

// getAndHandleProductIDs is a function that checks and gets the ProductIDs if they exist, from ProductIDs in the order input.
func getAndHandleProductIDs(orderInput *models.OrderInput) ([]uint, error) {
	var productIDs []uint
	for _, product := range orderInput.Products {
		productIDs = append(productIDs, product.ProductID)
	}

	return productIDs, nil
}

// orderNumberExists is a function that checks if an order number exists in the database.
func orderNumberExists(orderNumber string) bool {
	var order models.Order
	orderNumberQuery := storage.DB.Where("order_number = ?", orderNumber).First(&order)
	if orderNumberQuery.Error != nil {
		if errors.Is(orderNumberQuery.Error, gorm.ErrRecordNotFound) {
			return false
		}
		return false
	}

	return true
}

// productExists is a function that checks if a product exists in the database.
func productExists(productID uint) bool {
	var product models.Product
	productQuery := storage.DB.Where("id = ?", productID).First(&product)
	if productQuery.Error != nil {
		if errors.Is(productQuery.Error, gorm.ErrRecordNotFound) {
			return false
		}
		return false
	}

	return true
}

// getProduct is a function that gets a product from the database.
func getProduct(productID uint) models.Product {
	var product models.Product
	storage.DB.Where("id = ?", productID).First(&product)

	return product
}
