// API utilities for orders
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