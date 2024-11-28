package models

import (
	"healthify/backend/storage"

	"gorm.io/gorm"
)

type SupplierHospital struct {
	gorm.Model
	SupplierID         string `json:"supplier_id"`
	HospitalID         string `json:"hospital_id"`
	RequestCode        string `json:"request_code"`
	RequestStatus      string `json:"request_status"`
	Requirements       string `json:"requirements"`
	Rating             uint   `json:"rating"`
	SupplyStatus       string `json:"supply_status"`
	Status             string `json:"status"`
	CreatedAt          string `json:"created_at"`
	UpdatedAt          string `json:"updated_at"`
}

func GetSupplier (id string) Supplier {
	var supplier Supplier
	storage.DB.Where("id = ?", id).First(&supplier)
	return supplier
}

func GetHospital (id string) Hospital {
	var hospital Hospital
	storage.DB.Where("id = ?", id).First(&hospital)
	return hospital
}