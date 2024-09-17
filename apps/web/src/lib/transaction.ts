
// SUDAH TIDAK TERPAKAI

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const createTransaction = async (transactionData: {
  userId: number;
  eventId: number;
  amount: number;
}) => {
  try {
    const response = await fetch(`${base_url}/transaction/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { ok: false, message: errorText };
    }

    const result = await response.json();
    return { ok: true, result };
  } catch (error) {
    console.error('Error creating transaction:', error);
    return { ok: false, message: 'An unexpected error occurred' };
  }
};
