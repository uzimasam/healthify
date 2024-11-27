package models

import "gorm.io/gorm"

type Hospital struct {
	gorm.Model
	OrgID     uint   `json:"org_id"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// hospitalInput is used to parse the JSON request body when creating a hospital.
type HospitalInput struct {
	Name  string `json:"name" validate:"required,max=512"`
	Niche string `json:"niche" validate:"required,max=512"`
	City  string `json:"city" validate:"required,max=256"`
	Code  string `json:"code" validate:"required,max=16"`
	Email string `json:"email" validate:"required,email"`
	Phone string `json:"phone" validate:"required,max=16"`
}
