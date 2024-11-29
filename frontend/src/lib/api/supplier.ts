export interface Organization {
    ID: number;
    name: string;
    type: string;
    email: string;
    phone: string;
    niche: string;
    city: string;
    code: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    code: string;
    name: string;
    category_id: number;
    price: number;
    description: string;
    image_url: string;
    unit: string;
    stock: number;
    min_stock: number;
    supplier_id: number;
    created_at: string;
    updated_at: string;
}

export interface Hospital {
    ID: number;
    org_id: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    order_code: string;
    order_status: string;
    order_date: string;
    order_required_by: string;
}

export interface Supplier {
    id: number;
    org_id: number;
    compliance: boolean;
    business_license: boolean;
    insurance: boolean;
    created_at: string;
    updated_at: string;
    organization: Organization;
    products: Product[];
    hospitals: Hospital[];
    orders: Order[];
}

export async function fetchSupplierDetails(id: string) {
    try {
        const response = await fetch(`http://localhost:8020/api/supplier/data/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch supplier details');
        }
        const data = await response.json();
        return data.supplier as Supplier;
    } catch (error) {
        console.error('Error fetching supplier details:', error);
        throw error;
    }
}