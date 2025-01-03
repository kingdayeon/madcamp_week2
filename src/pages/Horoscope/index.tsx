// src/pages/Horoscope/index.tsx

import { useNavigate } from 'react-router-dom';
import { zodiacSigns } from '../../constants/zodiacSigns';


export default function Horoscope() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-y-auto pointer-events-auto">
      <div className="min-h-full pt-20 pb-10 bg-black/80">
        <div className="container mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zodiacSigns.map((sign) => (
              <div
                key={sign.name}
                className="relative aspect-square group cursor-pointer"
                onClick={() => navigate(`/horoscope/${sign.name}`)}
              >
                <img
                  src={sign.image}
                  alt={sign.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg">
                 <span className="text-white text-xl font-medium">{sign.name}</span>
                 <span className="text-white/60 text-sm mt-2">{sign.period}</span>
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}