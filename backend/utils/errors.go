package utils

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/kataras/iris/v12"
)

func CreateError(statusCode int, title string, details string, ctx iris.Context) {
	ctx.StopWithJSON(statusCode, iris.Map{"error": title, "details": details})
}

func CreateInternalError(ctx iris.Context) {
	CreateError(iris.StatusInternalServerError, "Internal server error", "An internal server error occurred", ctx)
}

func HandleValidationError(err error, ctx iris.Context) {
	if errs, ok := err.(validator.ValidationErrors); ok {
		validationErrors := wrapValidationErrors(errs)

		fmt.Println("validationErrors", validationErrors)
		ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
			Title("Validation error").
			Detail("One or more fields failed validation").
			Key("errors", validationErrors),
		)

		return
	}
	CreateInternalError(ctx)
}

func wrapValidationErrors(errs validator.ValidationErrors) []validationError {
	var validationErrors []validationError

	for _, err := range errs {
		validationError := validationError{
			ActualTag: err.ActualTag(),
			Namespace: err.Namespace(),
			Kind:      err.Kind().String(),
			Type:      err.Type().String(),
			Value:     err.Value().(string),
			Param:     err.Param(),
		}

		validationErrors = append(validationErrors, validationError)
	}

	return validationErrors
}

type validationError struct {
	ActualTag string `json:"tag"`
	Namespace string `json:"namespace"`
	Kind      string `json:"kind"`
	Type      string `json:"type"`
	Value     string `json:"value"`
	Param     string `json:"param"`
}
