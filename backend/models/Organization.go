package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name      string `json:"name"`
	Type      string `json:"type"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Niche     string `json:"niche"`
	City      string `json:"city"`
	Code      string `json:"code"`
	Status    string `json:"status"`
	Password  string `json:"password"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// OrganizationRegisterInput is the input for registering an organization
type OrganizationRegisterInput struct {
	Name     string `json:"name" validate:"required,max=512"`
	Type     string `json:"type" validate:"required,max=512"`
	Email    string `json:"email" validate:"required,email"`
	Phone    string `json:"phone" validate:"required,max=16"`
	Niche    string `json:"niche" validate:"required,max=256"`
	City     string `json:"city" validate:"required,max=256"`
	Code     string `json:"code" validate:"required,max=16"`
	Password string `json:"password" validate:"required,min=8"`
}

// OrganizationOutput is the output for an organization
type OrganizationOutput struct {
	ID              uint   `json:"id"`
	Name            string `json:"name"`
	Type            string `json:"type"`
	Email           string `json:"email"`
	Phone           string `json:"phone"`
	Niche           string `json:"niche"`
	City            string `json:"city"`
	Code            string `json:"code"`
	Compliance      bool   `json:"compliance"`
	BusinessLicense bool   `json:"business_license"`
	Insurance       bool   `json:"insurance"`
	Status          string `json:"status"`
	CreatedAt       string `json:"created_at"`
}

// OrganizationLoginInput is the input for logging in an organization
type OrganizationLoginInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}
