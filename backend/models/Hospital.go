package models

import "gorm.io/gorm"

type Hospital struct {
	gorm.Model
	OrgID     string `json:"org_id"`
	CreatedAt string `json:"created_at"`
	UpdateAt  string `json:"update_at"`
	DeleteAt  string `json:"delete_at"`
}
