// API utilities for orders
export interface OrderProduct {
  product_id: number;
  qty: number;
  unit: string;
}

export interface OrderPayload {
  supplier_id: string;
  hospital_id: string;
  priority: string;
  required_by: string;
  notes: string;
  products: OrderProduct[];
}

export async function createOrder(payload: OrderPayload) {
  try {
    const response = await fetch('http://localhost:8020/api/hospital/add-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function fetchActiveOrders() {
    try {
      const response = await fetch('http://localhost:8020/api/hospital/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch active orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching active orders:', error);
      throw error;
    }
  }
  
  export async function fetchOrders(searchQuery: string = '') {
    try {
      const url = new URL('http://localhost:8020/api/hospital/orders');
      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }