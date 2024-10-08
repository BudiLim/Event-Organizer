import { getToken } from "./server";

const base_url = process.env.BASE_URL_API || 'http://localhost:8000/api';

export const getOrganizerDashboardData = async (organizerId: string) => {
  const token = await getToken();

  const res = await fetch(`${base_url}/dashboard/${organizerId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  const result = await res.json();

  return { result, ok: res.ok };
};
