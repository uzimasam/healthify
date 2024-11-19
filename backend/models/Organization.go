package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name string `json:"name"`
	Type string `json:"type"`
	Email string `json:"email"`
	Password string `json:"password"`
}