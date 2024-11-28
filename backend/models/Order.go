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
}

/*
	Order input structure
	{
		"supplier_id": "1",
		"hospital_id": "2",
		"priority": 1,
		"required_by": "10/11/2024",
		"notes": "Nothing to say",
		"products": [
			{
				"product_id": 1,
				"qty": 2,
				"unit": "boxes"
			},
			{
				"product_id": 2,
				"qty": 5,
				"unit": "pieces"
			}
		]
	}
*/

type OrderInput struct {
	SupplierID string `json:"supplier_id" validate:"required,max=16"`
	HospitalID string `json:"hospital_id" validate:"required,max=16"`
	Priority   string `json:"priority" validate:"required,max=16"`
	RequiredBy string `json:"required_by" validate:"required"`
	Notes      string `json:"notes" validate:"required"`
	Products   []struct {
		ProductID uint `json:"product_id" validate:"required"`
		Qty       int    `json:"qty" validate:"required,min=1"`
		Unit      string `json:"unit" validate:"required"`
	} `json:"products" validate:"required"`
}
