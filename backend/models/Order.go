package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	OrderNumber        string `json:"order_number"`
	SupplierHospitalID string `json:"supplier_hospital_id"`
	Priority           string `json:"priority"`
	RequiredBy         string `json:"required_by"`
	Notes              string `json:"notes"`
	Status             string `json:"status"`
	Rating             uint   `json:"rating"`
	CreatedAt          string `json:"created_at"`
	UpdateAt           string `json:"update_at"`
	DeleteAt           string `json:"delete_at"`
}
