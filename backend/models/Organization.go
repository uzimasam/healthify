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

// OrganizationInput is the input for registering an organization
type OrganizationInput struct {
	Name     string `json:"name" validate:"required,max=512"`
	Type     string `json:"type" validate:"required,max=512"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

// OrganizationOutput is the output for an organization
type OrganizationOutput struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Type  string `json:"type"`
	Email string `json:"email"`
}

// OrganizationLoginInput is the input for logging in an organization
type OrganizationLoginInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}