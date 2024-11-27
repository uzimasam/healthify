package models

import "gorm.io/gorm"

type Inventory struct {
	gorm.Model
	SupplierHospitalID string  `json:"supplier_hospital_id"`
	ProductID          uint    `json:"product_id"`
	Quantity           uint    `json:"quantity"`
	Unit               string  `json:"unit"`
	UnitPrice          float64 `json:"unit_price"`
	TotalPrice         float64 `json:"total_price"`
	Stock              uint    `json:"stock"`
	MinStock           uint    `json:"min_stock"`
	ExpiryDate         string  `json:"expiry_date"`
	Status             string  `json:"status"`
	CreatedAt          string  `json:"created_at"`
	UpdatedAt          string  `json:"updated_at"`
	DeletedAt          string  `json:"deleted_at"`
}
