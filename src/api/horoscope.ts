// src/api/horoscope.ts
const API_URL = import.meta.env.VITE_API_URL;

export const getHoroscope = async (sign: string) => {
  const response = await fetch(`${API_URL}/api/horoscopes/${sign}`);
  if (!response.ok) throw new Error('Failed to fetch horoscope');
  return response.json();
};