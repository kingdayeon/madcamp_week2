// src/pages/Horoscope/Detail.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHoroscopeStore } from '../../store/horoscopeStore';
import { zodiacSigns } from '../../constants/zodiacSigns';


export default function HoroscopeDetail() {
  const { sign } = useParams<{ sign: string }>();
  const { dailyFortune, loading, error, fetchHoroscope } = useHoroscopeStore();
  const zodiacSign = zodiacSigns.find(s => s.name === sign);

  useEffect(() => {
    if (sign) fetchHoroscope(sign);
  }, [sign, fetchHoroscope]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !zodiacSign) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-white text-lg">Error loading horoscope</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto pointer-events-auto">
      <div className="min-h-full pt-20 pb-10 bg-black/80">
        <div className="container mx-auto px-8 py-8">
          <div className="flex flex-col items-center space-y-8">
            <img
              src={zodiacSign.image}
              alt={zodiacSign.name}
              className="w-48 h-48 object-contain"
            />
            <div className="text-center">
              <h1 className="text-white text-3xl font-bold mb-2">{zodiacSign.name}</h1>
              <p className="text-white/60 text-lg mb-8">{zodiacSign.period}</p>
              <div className="bg-white/10 p-6 rounded-lg max-w-2xl">
                <h2 className="text-white text-xl font-medium mb-4">오늘의 운세</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  {dailyFortune?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}