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
	supplierCompliantCountQuery    = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = true"
	supplierNonCompliantCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = false"
	hospitalCountQuery             = "SELECT COUNT(*) FROM organizations WHERE type = 'hospital'"
	suppliersQuery                 = "SELECT * FROM organizations WHERE type = 'supplier'"
	hospitalsQuery                 = "SELECT * FROM organizations WHERE type = 'hospital'"
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
	// count the number of organizations where the type is supplier and compliance is true
	supplierCompliantCount := getSupplierCompliantCount()
	// count the number of organizations where the type is supplier and compliance is false
	supplierNonCompliantCount := getSupplierNonCompliantCount()
	// count the number of organizations where the type is hospital
	hospitalCount := getHospitalCount()
	// get all the suppliers
	suppliers := getSuppliers()
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message": "Agency dashboard",
		"dashboard": iris.Map{
			"supplierCompliantCount":    supplierCompliantCount,
			"supplierNonCompliantCount": supplierNonCompliantCount,
			"hospitalCount":             hospitalCount,
		},
		"suppliers": iris.Map{
			"count":   len(suppliers),
			"list":    suppliers,
			"active":  activeSuppliers(suppliers),
			"pending": pendingSuppliers(suppliers),
		},
	})
}

func getSupplierCompliantCount() int {
	var supplierCompliantCount int
	storage.DB.Raw(supplierCompliantCountQuery).Scan(&supplierCompliantCount)
	return supplierCompliantCount
}

func getSupplierNonCompliantCount() int {
	var supplierNonCompliantCount int
	storage.DB.Raw(supplierNonCompliantCountQuery).Scan(&supplierNonCompliantCount)
	return supplierNonCompliantCount
}

func getHospitalCount() int {
	var hospitalCount int
	storage.DB.Raw(hospitalCountQuery).Scan(&hospitalCount)
	return hospitalCount
}

func getSuppliers() []models.OrganizationOutput {
	var suppliers []models.OrganizationOutput
	storage.DB.Raw(suppliersQuery).Scan(&suppliers)
	return suppliers
}

func activeSuppliers(suppliers []models.OrganizationOutput) []models.OrganizationOutput {
	var activeSuppliers []models.OrganizationOutput
	for _, supplier := range suppliers {
		// join the organizations and suppliers tables on the organization id
		var supplierData models.Supplier
		storage.DB.Raw("SELECT * FROM suppliers WHERE org_id = ?", supplier.ID).Scan(&supplierData)
		if supplierData.Compliance {
			activeSuppliers = append(activeSuppliers, supplier)
		}
	}
	// if activeSuppliers is nil, return an empty slice instead
	if activeSuppliers == nil {
		return []models.OrganizationOutput{}
	}
	return activeSuppliers
}

func pendingSuppliers(suppliers []models.OrganizationOutput) []models.OrganizationOutput {
	var pendingSuppliers []models.OrganizationOutput
	for _, supplier := range suppliers {
		// join the organizations and suppliers tables on the organization id
		var supplierData models.Supplier
		storage.DB.Raw("SELECT * FROM suppliers WHERE org_id = ?", supplier.ID).Scan(&supplierData)
		if !supplierData.Compliance {
			pendingSuppliers = append(pendingSuppliers, supplier)
		}
	}
	// if pendingSuppliers is nil, return an empty slice instead
	if pendingSuppliers == nil {
		return []models.OrganizationOutput{}
	}
	return pendingSuppliers
}
