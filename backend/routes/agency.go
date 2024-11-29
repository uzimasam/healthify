package routes

import (
	"healthify/backend/models"
	"healthify/backend/storage"
	"healthify/backend/utils"
	"strings"

	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/x/errors"
	"gorm.io/gorm"
)

const (
	hospitalsQuery                 = "SELECT * FROM organizations WHERE type = 'hospital'"
	suppliersQuery                 = "SELECT * FROM organizations WHERE type = 'supplier'"
	activeSuppliersQuery           = "SELECT * FROM suppliers LEFT JOIN organizations ON organizations.id = suppliers.org_id WHERE compliance = true"
	pendingSuppliersQuery          = "SELECT * FROM suppliers LEFT JOIN organizations ON organizations.id = suppliers.org_id WHERE compliance = false"
	lowStockProductsQuery          = "SELECT * FROM products WHERE stock < min_stock"
)

// GetSuppliers returns a list of suppliers
func GetSuppliers(ctx iris.Context) {
	var suppliers []models.OrganizationOutput
	storage.DB.Raw(suppliersQuery).Scan(&suppliers)
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message":   "Suppliers",
		"suppliers": suppliers,
	})
}

// GetHospitals returns a list of hospitals
func GetHospitals(ctx iris.Context) {
	var hospitals []models.OrganizationOutput
	storage.DB.Raw(hospitalsQuery).Scan(&hospitals)
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message":   "Hospitals",
		"hospitals": hospitals,
	})
}

// GetProductCategories returns a list of product categories
func GetProductCategories(ctx iris.Context) {
	var productCategories []models.ProductCategory
	storage.DB.Find(&productCategories)
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message":           "Product categories",
		"productCategories": productCategories,
	})
}

// AddProductCategory adds a product category to the database
func AddProductCategory(ctx iris.Context) {
	var productCategoryInput models.ProductCategoryInput
	err := ctx.ReadJSON(&productCategoryInput)
	if err != nil {
		utils.HandleValidationError(err, ctx)
		return
	}

	var newProductCategory models.ProductCategory
	productCategoryExists, productCategoryExistsErr := getAndHandleProductCategoryExistsError(&newProductCategory, productCategoryInput.Name)
	if productCategoryExistsErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	if productCategoryExists {
		utils.CreateError(iris.StatusConflict, "Product category already exists", "A product category with this name already exists", ctx)
		return
	}

	newProductCategory = models.ProductCategory{
		Name:      productCategoryInput.Name,
		CreatedAt: utils.GetFormattedTime(),
		UpdatedAt: utils.GetFormattedTime(),
	}

	if err := storage.DB.Create(&newProductCategory).Error; err != nil {
		utils.CreateInternalError(ctx)
		return
	}

	ctx.StopWithJSON(iris.StatusCreated, iris.Map{
		"message": "Product category created",
		"productCategory": iris.Map{
			"id":   newProductCategory.ID,
			"name": newProductCategory.Name,
		},
	})
}

func getAndHandleProductCategoryExistsError(newProductCategory *models.ProductCategory, name string) (exists bool, err error) {
	productCategoryExistsQuery := storage.DB.Where("name = ?", name).First(newProductCategory)
	if productCategoryExistsQuery.Error != nil {
		if errors.Is(productCategoryExistsQuery.Error, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, productCategoryExistsQuery.Error
	}

	productCategoryExists := productCategoryExistsQuery.RowsAffected > 0
	if productCategoryExists {
		return true, nil
	}

	return false, nil
}

// AddHospital adds a hospital to the database
func AddHospital(ctx iris.Context) {
	var hospitalInput models.HospitalInput
	err := ctx.ReadJSON(&hospitalInput)
	if err != nil {
		utils.HandleValidationError(err, ctx)
		return
	}

	var newOrg models.Organization
	orgExists, orgExistsErr := getAndHandleOrganizationExistsError(&newOrg, hospitalInput.Email)
	if orgExistsErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	if orgExists {
		utils.CreateError(iris.StatusConflict, "Organization already exists", "An organization with this email already exists", ctx)
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(hospitalInput.Email)
	if hashErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	newOrg = models.Organization{
		Name:      hospitalInput.Name,
		Type:      "hospital",
		Phone:     hospitalInput.Phone,
		Niche:     hospitalInput.Niche,
		City:      hospitalInput.City,
		Code:      hospitalInput.Code,
		Email:     strings.ToLower(hospitalInput.Email),
		Password:  hashedPassword,
		Status:    "active",
		CreatedAt: utils.GetFormattedTime(),
		UpdatedAt: utils.GetFormattedTime(),
	}

	if err := storage.DB.Create(&newOrg).Error; err != nil {
		utils.CreateInternalError(ctx)
		return
	}

	var newOrgID uint
	if err := storage.DB.Raw("SELECT id FROM organizations WHERE email = ?", newOrg.Email).Scan(&newOrgID).Error; err != nil {
		utils.CreateInternalError(ctx)
		return
	}
	// create a new hospital
	newHospital := models.Hospital{
		OrgID:     newOrgID,
		CreatedAt: utils.GetFormattedTime(),
		UpdatedAt: utils.GetFormattedTime(),
	}

	if err := storage.DB.Create(&newHospital).Error; err != nil {
		utils.CreateInternalError(ctx)
		return
	}

	ctx.StopWithJSON(iris.StatusCreated, iris.Map{
		"message": "Hospital created",
		"hospital": iris.Map{
			"id":    newOrg.ID,
			"name":  newOrg.Name,
			"email": newOrg.Email,
			"type":  newOrg.Type,
		},
	})
}

// GetAgencyDashboard returns the dashboard data for an agency
func GetAgencyDashboard(ctx iris.Context) {
	// get all the hospitals
	hospitals := getHospitals()
	// get all the suppliers
	suppliers := getSuppliers()
	// get the active suppliers
	activeSuppliers := activeSuppliers()
	// get the pending suppliers
	pendingSuppliers := pendingSuppliers()
	// get the low stock products
	lowStockProducts := lowStockProducts()
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message": "Agency dashboard",
		"dashboard": iris.Map{
			"hospitalCount":             len(hospitals),
			"activeSupplierCount":       len(activeSuppliers),
			"pendingSupplierCount":      len(pendingSuppliers),
			"lowStockProductCount":      len(lowStockProducts),
		},
		"hospitals": iris.Map{
			"count": len(hospitals),
			"list":  hospitals,
		},
		"suppliers": iris.Map{
			"count":   len(suppliers),
			"list":    suppliers,
			"active":  activeSuppliers,
			"pending": pendingSuppliers,
		},
	})
}

func getHospitals() []models.OrganizationOutput {
	var hospitals []models.OrganizationOutput
	storage.DB.Raw(hospitalsQuery).Scan(&hospitals)
	return hospitals
}

func getSuppliers() []models.SupplierWithOrg {
	var suppliers []models.Supplier
	storage.DB.Raw(suppliersQuery).Scan(&suppliers)
	// get the suppliers with their organizations
	var suppliersWithOrg []models.SupplierWithOrg
	for _, supplier := range suppliers {
		supplierWithOrg := models.GetSupplierWithOrg(supplier.ID)
		suppliersWithOrg = append(suppliersWithOrg, supplierWithOrg)
	}
	return suppliersWithOrg
}

func activeSuppliers() []models.OrganizationOutput {
	var activeSuppliers []models.OrganizationOutput
	storage.DB.Raw(activeSuppliersQuery).Scan(&activeSuppliers)
	return activeSuppliers
}

func pendingSuppliers() []models.OrganizationOutput {
	var pendingSuppliers []models.OrganizationOutput
	storage.DB.Raw(pendingSuppliersQuery).Scan(&pendingSuppliers)
	return pendingSuppliers
}

func lowStockProducts() []models.Product {
	var lowStockProducts []models.Product
	storage.DB.Raw(lowStockProductsQuery).Scan(&lowStockProducts)
	return lowStockProducts
}
