package models

import "gorm.io/gorm"

type SupplierHospital struct {
	gorm.Model
	SupplierHospitalID uint   `json:"supplier_hospital_id"`
	RequestCode        string `json:"request_code"`
	RequestStatus      string `json:"request_status"`
	Requirements       string `json:"requirements"`
	Rating             uint   `json:"rating"`
	SupplyStatus       string `json:"supply_status"`
	Status             string `json:"status"`
	CreatedAt          string `json:"created_at"`
	UpdateAt           string `json:"update_at"`
	DeleteAt           string `json:"delete_at"`
}
