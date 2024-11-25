package routes

import (
	"healthify/backend/models"
	"healthify/backend/storage"

	"github.com/kataras/iris/v12"
)

const (
	supplierCompliantCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = true"
	supplierNonCompliantCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = false"
	hospitalCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'hospital'"
	suppliersQuery = "SELECT * FROM organizations WHERE type = 'supplier'"
)

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
			"supplierCompliantCount": supplierCompliantCount,
			"supplierNonCompliantCount": supplierNonCompliantCount,
			"hospitalCount": hospitalCount,
		},
		"suppliers": iris.Map{
			"count": len(suppliers),
			"list": suppliers,
			"active": activeSuppliers(suppliers),
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
        if supplier.Compliance {
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
		if !supplier.Compliance {
			pendingSuppliers = append(pendingSuppliers, supplier)
		}
	}
	// if pendingSuppliers is nil, return an empty slice instead
	if pendingSuppliers == nil {
		return []models.OrganizationOutput{}
	}
	return pendingSuppliers
}
