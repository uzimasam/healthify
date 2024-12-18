package storage

import (
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectDB connects to the database via .env DATABASE_URL
func ConnectDB() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	dbURL := os.Getenv("DATABASE_URL")
	db, dbError := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if dbError != nil {
		panic("Failed to connect to database")
	}

	DB = db
	return db
}

// InitDB initializes the database
func InitDB() *gorm.DB {
	db := ConnectDB()
	return db
}
