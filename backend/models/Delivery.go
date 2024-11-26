package models

import "gorm.io/gorm"

type Delivery struct {
	gorm.Model
	SupplierHospitalID string `json:"supplier_hospital_id"`
	OrderID            string `json:"order_id"`
	Driver             string `json:"driver"`
	TruckNumber        string `json:"truck_number"`
	RequiredBy         string `json:"required_by"`
	DeliveryDate       string `json:"delivery_date"`
	Notes              string `json:"notes"`
	Status             string `json:"status"`
	Rating             uint   `json:"rating"`
	CreatedAt          string `json:"created_at"`
	UpdateAt           string `json:"update_at"`
	DeleteAt           string `json:"delete_at"`
}
