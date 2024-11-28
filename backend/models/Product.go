package models

import (
	"healthify/backend/storage"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code        string `json:"code"`
	Name        string `json:"name"`
	CategoryID  int    `json:"category_id"`
	Price       float64    `json:"price"`
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
	Price       float64    `json:"price" validate:"required"`
	Description string `json:"description" validate:"required"`
	ImageURL    string `json:"image_url" validate:"required"`
	SKU         string `json:"sku" validate:"required"`
	Unit        string `json:"unit" validate:"required"`
	Stock       int    `json:"stock" validate:"required"`
	MinStock    int    `json:"min_stock" validate:"required"`
	SupplierID  int    `json:"supplier_id" validate:"required"`
}

// get the product category
func GetProductCategory(ProductID uint) (ProductCategory) {
	var product Product
	storage.DB.Where("id = ?", ProductID).First(&product)
	categoryID := product.CategoryID
	var productCategory ProductCategory
	storage.DB.Where("id = ?", categoryID).First(&productCategory)
	return productCategory
}