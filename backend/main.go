package main

import (
	"healthify/backend/routes"
	"healthify/backend/storage"

	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
)

func main() {
	godotenv.Load()
	storage.InitDB()

	app := iris.New()

	organizationRoutes := app.Party("/api/organizations")
	{
		organizationRoutes.Post("/register", routes.Register) 
	}

	app.Listen(":8020")
}
