// API utilities for suppliers
export async function fetchSuppliers() {
    try {
      const response = await fetch('http://localhost:8020/api/agency/suppliers');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      return data.suppliers;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw error;
    }
  }