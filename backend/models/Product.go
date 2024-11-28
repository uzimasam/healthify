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
	UpdatedAt   string `json:"updated_at"`
}

type ProductInput struct {
	Name        string `json:"name" validate:"required"`
	CategoryID  int    `json:"category_id" validate:"required"`
	Price       int    `json:"price" validate:"required"`
	Description string `json:"description" validate:"required"`
	ImageURL    string `json:"image_url" validate:"required"`
	SKU         string `json:"sku" validate:"required"`
	Unit        string `json:"unit" validate:"required"`
	Stock       int    `json:"stock" validate:"required"`
	MinStock    int    `json:"min_stock" validate:"required"`
	SupplierID  int    `json:"supplier_id" validate:"required"`
}