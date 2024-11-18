export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  manufacturer: string;
  expiryDate?: string;
  image: string;
}

export interface Order {
  id: string;
  products: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  orderDate: string;
  deliveryDate?: string;
  customerInfo: {
    name: string;
    facility: string;
    address: string;
    contact: string;
  };
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  lowStockItems: number;
  revenue: number;
}