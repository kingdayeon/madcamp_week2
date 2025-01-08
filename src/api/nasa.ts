// src/api/nasa.ts

export interface APODImage {
  date: string;
  explanation: string;
  title: string;
  url: string;
  media_type: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const getRandomImages = async (): Promise<APODImage[]> => {
  const response = await fetch(`${API_URL}/api/apod/random`);
  if (!response.ok) throw new Error('Failed to fetch NASA images');
  return response.json();
};