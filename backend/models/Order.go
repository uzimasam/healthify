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
	UpdatedAt          string `json:"updated_at"`
	DeletedAt          string `json:"deleted_at"`
}
