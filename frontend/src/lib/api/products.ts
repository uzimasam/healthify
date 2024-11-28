// API utilities for products
export interface Product {
    ID: number;
    code: string;
    name: string;
    category_id: number;
    price: number;
    description: string;
    image_url: string;
    sku: string;
    unit: string;
    stock: number;
    min_stock: number;
    supplier_id: number;
    created_at: string;
    updated_at: string;
  }
  
  export async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:8020/api/supplier/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.products as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }