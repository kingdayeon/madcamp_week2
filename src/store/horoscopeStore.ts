// src/store/horoscopeStore.ts
import { create } from 'zustand';
import { getHoroscope } from '../api/horoscope';

interface HoroscopeState {
  dailyFortune: {
    content: string;
    date: string;
  } | null;
  loading: boolean;
  error: string | null;
  fetchHoroscope: (sign: string) => Promise<void>;
}

export const useHoroscopeStore = create<HoroscopeState>((set) => ({
  dailyFortune: null,
  loading: false,
  error: null,
  fetchHoroscope: async (sign: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getHoroscope(sign);
      set({ dailyFortune: data.dailyFortune });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));