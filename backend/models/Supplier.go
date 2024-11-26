package models

import "gorm.io/gorm"

type Supplier struct {
	gorm.Model
	OrgID           uint   `json:"org_id"`
	Compliance      bool   `json:"compliance"`
	BusinessLicense bool   `json:"business_license"`
	Insurance       bool   `json:"insurance"`
	CreatedAt       string `json:"created_at"`
	UpdateAt        string `json:"update_at"`
	DeleteAt        string `json:"delete_at"`
}
