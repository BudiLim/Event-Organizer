import { getToken } from './server';

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const getMyVoucherDetails = async (userId: string) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const res = await fetch(`${base_url}/voucher/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to fetch voucher details');
    }

    return { result, ok: true };
  } catch (error) {
    console.error('Error fetching voucher details:', error);
    return { result: null, ok: false, message: error };
  }
};

export const getMyPoints = async (userId: string) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No access token available');
      }
  
      const res = await fetch(`${base_url}/points/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch voucher details');
      }
  
      return { result, ok: true };
    } catch (error) {
      console.error('Error fetching voucher details:', error);
      return { result: null, ok: false, message: error };
    }
  };