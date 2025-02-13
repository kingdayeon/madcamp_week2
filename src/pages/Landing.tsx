import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface APODResponse {
  url: string;
  title: string;
  explanation: string;
  media_type: string;
  date: string;
}

const fetchAPOD = async (
  setApodData: (data: APODResponse) => void,
  setLoading: (loading: boolean) => void
) => {
  const date = new Date();

  while (true) {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&date=${dateStr}`
      );
      const data = await response.json();

      if (data.media_type === 'image') {
        setApodData(data);
        break;
      }
    } catch (error) {
      console.error('Failed to fetch APOD:', error);
      break;
    }

    // 하루씩 과거로 이동
    date.setDate(date.getDate() - 1);
  }

  setLoading(false);
};

export default function Landing() {
  const [apodData, setApodData] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPOD(setApodData, setLoading);
  }, []);

  const handleGoogleLogin = () => {
    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }&response_type=code&scope=openid%20profile%20email&nonce=randomNonce123`;
    window.location.href = googleOAuthURL;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 토큰 저장 후 홈으로 이동
      localStorage.setItem("token", token);
      navigate("/home");
    }
  }, [navigate]);

  if (loading || !apodData) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading today's cosmic view...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black cursor-pointer relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={apodData.url}
          alt={apodData.title}
          className="w-full h-full object-cover"
          onClick={handleGoogleLogin}
        />
      </div>
      <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-white text-2xl font-bold mb-2">{apodData.title}</h1>
        <p className="text-white/80 text-sm">{apodData.date}</p>
      </div>
      <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
