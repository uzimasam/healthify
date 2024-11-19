package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name     string `json:"name"`
	Type     string `json:"type"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (o *Organization) TableName() string {
	return "organizations"
}

func NewOrganization(name, email, password, orgType string) *Organization {
	return &Organization{
		Name:     name,
		Email:    email,
		Password: password,
		Type:     orgType,
	}
}