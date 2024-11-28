package models

import "gorm.io/gorm"

type OrderProduct struct {
	gorm.Model
	OrderID    uint    `json:"order_id"`
	ProductID  uint    `json:"product_id"`
	Quantity   int    `json:"quantity"`
	Unit       string  `json:"unit"`
	UnitPrice  float64 `json:"unit_price"`
	TotalPrice float64 `json:"total_price"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
}
