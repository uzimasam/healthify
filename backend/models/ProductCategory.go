package models

import "gorm.io/gorm"

type ProductCategory struct {
	gorm.Model
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type ProductCategoryInput struct {
	Name string `json:"name" validate:"required"`
}
