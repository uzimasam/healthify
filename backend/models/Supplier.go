package models

import (
	"healthify/backend/storage"

	"gorm.io/gorm"
)

type Supplier struct {
	gorm.Model
	OrgID             uint               `json:"org_id"`
	Compliance        bool               `json:"compliance"`
	BusinessLicense   bool               `json:"business_license"`
	Insurance         bool               `json:"insurance"`
	CreatedAt         string             `json:"created_at"`
	UpdatedAt         string             `json:"updated_at"`
	Org               Organization       `gorm:"foreignKey:OrgID" json:"org"`
	Products          []Product          `gorm:"foreignKey:SupplierID" json:"products"`
	Hospitals         []Hospital         `gorm:"many2many:supplier_hospitals" json:"hospitals"`
	SupplierHospitals []SupplierHospital `gorm:"foreignKey:SupplierID" json:"supplier_hospitals"`
}
type SupplierOutput struct {
	ID              uint   `json:"id"`
	OrgID           uint   `json:"org_id"`
	Compliance      bool   `json:"compliance"`
	BusinessLicense bool   `json:"business_license"`
	Insurance       bool   `json:"insurance"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
}

type SupplierDataSummed struct {
	ID              uint             `json:"id"`
	OrgID           uint             `json:"org_id"`
	Compliance      bool             `json:"compliance"`
	BusinessLicense bool             `json:"business_license"`
	Insurance       bool             `json:"insurance"`
	CreatedAt       string           `json:"created_at"`
	UpdatedAt       string           `json:"updated_at"`
	Products        []ProductSummary `gorm:"foreignKey:SupplierID" json:"products"`
	Hospitals       []Hospital       `gorm:"many2many:supplier_hospitals" json:"hospitals"`
	Orders          []OrderInfo      `json:"orders"`
}

func GetSupplierProducts(SupplierID uint) []ProductSummary {
	var supplier Supplier
	storage.DB.Preload("Products").Where("id = ?", SupplierID).First(&supplier)
	var products []ProductSummary
	for _, product := range supplier.Products {
		products = append(products, ProductSummary{
			ID:          product.ID,
			Code:        product.Code,
			Name:        product.Name,
			Price:       product.Price,
			Description: product.Description,
			ImageURL:    product.ImageURL,
			CategoryID:  product.CategoryID,
			Unit:        product.Unit,
			Stock:       product.Stock,
			MinStock:    product.MinStock,
			SupplierID:  product.SupplierID,
			CreatedAt:   product.CreatedAt,
			UpdatedAt:   product.UpdatedAt,
		})
	}
	return products
}

func GetSupplierHospitals(SupplierID uint) []Hospital {
	var supplier Supplier
	storage.DB.Preload("Hospitals").Where("id = ?", SupplierID).First(&supplier)
	return supplier.Hospitals
}

type OrderInfo struct {
	ID              uint   `json:"id"`
	OrderCode       string `json:"order_code"`
	OrderStatus     string `json:"order_status"`
	OrderDate       string `json:"order_date"`
	OrderRequiredBy string `json:"order_required_by"`
}

func GetSupplierWithProductsOrdersAndHospitals(SupplierID uint) SupplierDataSummed {
	var supplier Supplier
	var order Order
	var supplierData SupplierDataSummed

	// Load Supplier and its relationships. Keep in mind that Order is not a direct relationship of Supplier, it instead is linked through SupplierHospital
	storage.DB.Preload("Products").Preload("Hospitals").Preload("SupplierHospitals").Preload("SupplierHospitals.Hospital").Preload("SupplierHospitals.Orders").Where("id = ?", SupplierID).First(&supplier)

	// Map Supplier fields to SupplierDataSummed
	supplierData.ID = supplier.ID
	supplierData.OrgID = supplier.OrgID
	supplierData.Compliance = supplier.Compliance
	supplierData.BusinessLicense = supplier.BusinessLicense
	supplierData.Insurance = supplier.Insurance
	supplierData.CreatedAt = supplier.CreatedAt
	supplierData.UpdatedAt = supplier.UpdatedAt

	// Map related data
	for _, product := range supplier.Products {
		supplierData.Products = append(supplierData.Products, ProductSummary{
			ID:          product.ID,
			Code:        product.Code,
			Name:        product.Name,
			Price:       product.Price,
			Description: product.Description,
			ImageURL:    product.ImageURL,
			CategoryID:  product.CategoryID,
			Unit:        product.Unit,
			Stock:       product.Stock,
			MinStock:    product.MinStock,
			SupplierID:  product.SupplierID,
			CreatedAt:   product.CreatedAt,
			UpdatedAt:   product.UpdatedAt,
		})
	}
	supplierData.Hospitals = supplier.Hospitals
	for _, supplierHospital := range supplier.SupplierHospitals {
		for _, order = range supplierHospital.Orders {
			supplierData.Orders = append(supplierData.Orders, OrderInfo{
				ID:              order.ID,
				OrderCode:       order.OrderNumber,
				OrderStatus:     order.Status,
				OrderDate:       order.CreatedAt,
				OrderRequiredBy: order.RequiredBy,
			})
		}
	}

	return supplierData
}
