import { getToken } from "./server";

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const getMyTicketDetails = async (userId: string) => {
  const token = await getToken();
  
  const res = await fetch(`${base_url}/ticket/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, 
    },
    cache: 'no-cache',
  });

  const result = await res.json();
  
  return { result, ok: res.ok };
};

export const getTicketId = async (userId: string, id: number) => {
  try {
    const url = `${base_url}/ticket/${userId}/${id}`;
    const token = await getToken();
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ticket. Status: ${res.statusText}`);
    }
    const result = await res.json();

    return { result, ok: true };
  } catch (error) {
    return { result: null, ok: false, error: error };
  }
};

// New function for creating a ticket
export const createTicket = async (
  eventId: number,
  price: number, 
  quantity: number,
  discountCode?: string
) => {
  try {
    const token = await getToken();
    
    const res = await fetch(`${base_url}/ticket`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        quantity,
        price,
        discountCode,
      }),
    });

    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(`Failed to create ticket: ${result.message || res.statusText}`);
    }

    return { result, ok: true };
  } catch (error) {
    return { result: null, ok: false, error: error };
  }
};