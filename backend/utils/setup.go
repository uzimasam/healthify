package utils

import (
	"fmt"
	"math/rand"
	"time"
)

func GetFormattedTime() string {
	return time.Now().Format(time.RFC3339)
}

func GenerateRandomNumber() string {
	rand.Seed(time.Now().UnixNano())
	number := rand.Intn(9000) + 1000
	return fmt.Sprintf("%04d", number)
}

func Contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func Join(slice []string, sep string) string {
	return fmt.Sprintf("%s", slice)
}

// func ToJSON converts an array to a JSON string
func ToJSON(data interface{}) string {
	return fmt.Sprintf("%v", data)
}