package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Code        string `json:"code"`
	Name        string `json:"name"`
	CategoryID  int    `json:"category_id"`
	Price       int    `json:"price"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	SKU         string `json:"sku"`
	Unit        string `json:"unit"`
	Stock       int    `json:"stock"`
	MinStock    int    `json:"min_stock"`
	SupplierID  int    `json:"supplier_id"`
	CreatedAt   string `json:"created_at"`
	UpdateAt    string `json:"update_at"`
	DeleteAt    string `json:"delete_at"`
}
