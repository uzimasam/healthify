package models

import "gorm.io/gorm"

type ProductCategory struct {
	gorm.Model
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdateAt  string `json:"update_at"`
	DeleteAt  string `json:"delete_at"`
}
