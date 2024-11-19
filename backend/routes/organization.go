package routes

import (
	"errors"
	"healthify/backend/models"
	"healthify/backend/storage"
	"healthify/backend/utils"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/kataras/iris/v12"
)

// Register registers a new organization
func Register(ctx iris.Context) {
	var orgInput OrganizationInput
	err := ctx.ReadJSON(&orgInput)
	if err != nil {
		utils.HandleValidationError(err, ctx)
		return
	}

	var newOrg models.Organization
	orgExists, orgExistsErr := getAndHandleOrganizationExistsError(&newOrg, orgInput.Email)
	if orgExistsErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	if orgExists {
		utils.CreateError(iris.StatusConflict, "Organization already exists", "An organization with this email already exists", ctx)
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(orgInput.Password)
	if hashErr != nil {
		utils.CreateInternalError(ctx)
		return
	}

	newOrg = models.Organization{
		Name:     orgInput.Name,
		Type:     orgInput.Type,
		Email:    strings.ToLower(orgInput.Email),
		Password: hashedPassword,
	}

	storage.DB.Create(&newOrg)

	ctx.StopWithJSON(iris.StatusCreated, iris.Map{
		"message": "Organization created",
		"organization": iris.Map{
			"name":  newOrg.Name,
			"email": newOrg.Email,
			"type":  newOrg.Type,
		},
	})
}

// getAndHandleOrganizationExistsError checks if an organization with the given email exists
func getAndHandleOrganizationExistsError(org *models.Organization, email string) (exists bool, err error) {
	orgExistsQuery := storage.DB.Where("email = ?", strings.ToLower(email)).First(org)
	if orgExistsQuery.Error != nil {
		if errors.Is(orgExistsQuery.Error, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, orgExistsQuery.Error
	}

	orgExists := orgExistsQuery.RowsAffected > 0
	if orgExists {
		return true, nil
	}

	return false, nil
}

// hashAndSaltPassword hashes and salts the password
func hashAndSaltPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

// OrganizationInput is the input for registering an organization
type OrganizationInput struct {
	Name     string `json:"name" validate:"required,max=512"`
	Type     string `json:"type" validate:"required,max=256"`
	Email    string `json:"email" validate:"required,max=256"`
	Password string `json:"password" validate:"required,min=8,max=256"`
}
