package main

import (
	"healthify/backend/storage"

	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
)

func main() {
	godotenv.Load()
	storage.InitDB()

	app := iris.New()

	

	app.Listen(":8020")
}
