package routes

import (
	"healthify/backend/models"
	"healthify/backend/storage"
	"healthify/backend/utils"

	"github.com/kataras/iris/v12"
	"gorm.io/gorm"
)

// GetProducts returns a list of products
func GetProducts(ctx iris.Context) {
	var products []models.Product
	storage.DB.Find(&products)
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message":  "Products",
		"products": products,
	})
}

// AddProduct adds a product to the database
func AddProduct(ctx iris.Context) {
	var productInput models.ProductInput
	err := ctx.ReadJSON(&productInput)
	if err != nil {
		utils.HandleValidationError(err, ctx)
		return
	}

	var newProduct models.Product
	productExists, productExistsErr := getAndHandleProductExistsError(&newProduct, productInput.Name)
	if productExistsErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	if productExists {
		utils.CreateError(iris.StatusConflict, "Product already exists", "A product with this name already exists", ctx)
		return
	}

	// create a random code for the product in the format "PROD-<random_4_digit_number>"
	newProduct.Code = "PROD-" + utils.GenerateRandomNumber()
	for productCodeExists(newProduct.Code) {
		newProduct.Code = "PROD-" + utils.GenerateRandomNumber()
	}

	newProduct = models.Product{
		Code:        newProduct.Code,
		Name:        productInput.Name,
		CategoryID:  productInput.CategoryID,
		Price:       productInput.Price,
		Description: productInput.Description,
		ImageURL:    productInput.ImageURL,
		SKU:         productInput.SKU,
		Unit:        productInput.Unit,
		Stock:       productInput.Stock,
		MinStock:    productInput.MinStock,
		SupplierID:  productInput.SupplierID,
		CreatedAt:   utils.GetFormattedTime(),
		UpdatedAt:   utils.GetFormattedTime(),
	}

	err = storage.DB.Create(&newProduct).Error
	if err != nil {
		utils.CreateInternalError(ctx)
		return
	}

	ctx.StopWithJSON(iris.StatusCreated, iris.Map{
		"message": "Product added successfully",
		"product": iris.Map{
			"id":          newProduct.ID,
			"code":        newProduct.Code,
			"name":        newProduct.Name,
			"category_id": newProduct.CategoryID,
			"price":       newProduct.Price,
			"description": newProduct.Description,
			"image_url":   newProduct.ImageURL,
			"sku":         newProduct.SKU,
			"unit":        newProduct.Unit,
			"stock":       newProduct.Stock,
			"min_stock":   newProduct.MinStock,
			"supplier_id": newProduct.SupplierID,
		},
	})
}

func getAndHandleProductExistsError(product *models.Product, name string) (bool, error) {
	err := storage.DB.Where("name = ?", name).First(product).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func productCodeExists(code string) bool {
	var product models.Product
	err := storage.DB.Where("code = ?", code).First(&product).Error
	if err != nil {
		return false
	}

	return product.ID != 0
}
