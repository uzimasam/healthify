package main

import (
	"healthify/backend/routes"
	"healthify/backend/storage"

	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
)

func main() {
	godotenv.Load()
	storage.InitDB()

	app := iris.Default()
	app.Validator = validator.New()

	organizationRoutes := app.Party("/api/organizations")
	{
		organizationRoutes.Post("/register", routes.Register)
		organizationRoutes.Post("/login", routes.Login)
	}

	agencyRoutes := app.Party("/api/agency")
	{
		agencyRoutes.Post("/add-hospital", routes.AddHospital)
		agencyRoutes.Post("/add-product_category", routes.AddProductCategory)
		agencyRoutes.Get("/dashboard", routes.GetAgencyDashboard)
		agencyRoutes.Get("/hospitals", routes.GetHospitals)
		agencyRoutes.Get("/product_categories", routes.GetProductCategories)
	}

	app.Listen(":8020")
}
