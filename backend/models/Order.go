package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	OrderNumber        string `json:"order_number"`
	SupplierHospitalID string `json:"supplier_hospital_id"`
	Priority           string `json:"priority"`
	RequiredBy         string `json:"required_by"`
	Notes              string `json:"notes"`
	Status             string `json:"status"`
	Rating             uint   `json:"rating"`
	CreatedAt          string `json:"created_at"`
	UpdatedAt          string `json:"updated_at"`
}

/*
	Order input structure
	{
		"supplier_id": "1",
		"hospital_id": "2",
		"priority": 1,
		"required_by": "10/11/2024",
		"notes": "Nothing to say",
		"products": [
			{
				"product_id": 1,
				"qty": 2,
				"unit": "boxes"
			},
			{
				"product_id": 2,
				"qty": 5,
				"unit": "pieces"
			}
		]
	}
*/

type OrderInput struct {
	SupplierID string `json:"supplier_id" validate:"required,max=16"`
	HospitalID string `json:"hospital_id" validate:"required,max=16"`
	Priority   string `json:"priority" validate:"required,max=16"`
	RequiredBy string `json:"required_by" validate:"required"`
	Notes      string `json:"notes" validate:"required"`
	Products   []struct {
		ProductID uint `json:"product_id" validate:"required"`
		Qty       int    `json:"qty" validate:"required,min=1"`
		Unit      string `json:"unit" validate:"required"`
	} `json:"products" validate:"required"`
}

/*
	Order Response structure
	const activeOrders = [
    {
        id: "ORD-2024-001",
        items: [
            { name: "Surgical Masks", quantity: 5000, unit: "pieces" },
            { name: "Surgical Gloves", quantity: 2000, unit: "pieces" },
        ],
        supplier: "MedTech Supplies Inc.",
        orderDate: "2024-03-15",
        expectedDelivery: "2024-03-18",
        status: "processing",
        priority: "high",
    },
    {
        id: "ORD-2024-002",
        items: [
            { name: "Syringes", quantity: 10000, unit: "pieces" },
            { name: "Bandages", quantity: 5000, unit: "pieces" },
        ],
        supplier: "Global Healthcare Solutions",
        orderDate: "2024-03-14",
        expectedDelivery: "2024-03-17",
        status: "confirmed",
        priority: "normal",
    },
];
*/

type OrderResponse struct {
	ID              string       `json:"id"`
	Items           []OrderItem  `json:"items"`
	Supplier        string       `json:"supplier"`
	Hospital        string       `json:"hospital"`
	OrderDate       string       `json:"order_date"`
	ExpectedDelivery string       `json:"expected_delivery"`
	Status          string       `json:"status"`
	Priority        string       `json:"priority"`
	Total           float64      `json:"total"`
}

type OrderItem struct {
	Name     string `json:"name"`
	Quantity int    `json:"quantity"`
	Unit     string `json:"unit"`
}
