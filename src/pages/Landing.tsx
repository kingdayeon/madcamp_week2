import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface APODResponse {
  url: string;
  title: string;
  explanation: string;
}

export default function Landing() {
  const [apodData, setApodData] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error('Failed to fetch APOD:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading || !apodData) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading today's cosmic view...</div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-screen flex flex-col items-center justify-center bg-black cursor-pointer relative"
      onClick={() => navigate('/home')}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={apodData.url}
          alt={apodData.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-white text-2xl font-bold mb-2">{apodData.title}</h1>
        
      </div>
      <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-white text-xl font-medium">Click to Enter</p>
      </div>
    </div>
  );
}