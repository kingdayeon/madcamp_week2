export interface ZodiacSign {
  name: string;
  image: string;
  period: string;
}

export interface DailyFortune {
  sign: string;
  content: string;
  date: string;
}

export interface HoroscopeState {
  dailyFortune: DailyFortune | null;
  loading: boolean;
  error: string | null;
}