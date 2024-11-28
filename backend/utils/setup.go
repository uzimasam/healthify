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