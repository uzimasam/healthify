package routes

import (
	"healthify/backend/storage"

	"github.com/kataras/iris/v12"
)

const (
	supplierCompliantCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = true"
	supplierNonCompliantCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'supplier' AND compliance = false"
	hospitalCountQuery = "SELECT COUNT(*) FROM organizations WHERE type = 'hospital'"
)

// GetAgencyDashboard returns the dashboard data for an agency
func GetAgencyDashboard(ctx iris.Context) {
	// count the number of organizations where the type is supplier and compliance is true
	supplierCompliantCount := getSupplierCompliantCount()
	// count the number of organizations where the type is supplier and compliance is false
	supplierNonCompliantCount := getSupplierNonCompliantCount()
	// count the number of organizations where the type is hospital
	hospitalCount := getHospitalCount()
	ctx.StopWithJSON(iris.StatusOK, iris.Map{
		"message": "Agency dashboard",
		"dashboard": iris.Map{
			"supplierCompliantCount": supplierCompliantCount,
			"supplierNonCompliantCount": supplierNonCompliantCount,
			"hospitalCount": hospitalCount,
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
