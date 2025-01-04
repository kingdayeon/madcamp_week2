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

  const handleGoogleLogin = () => {
    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=id_token&scope=profile email`;
    window.location.href = googleOAuthURL;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const googleToken = params.get('id_token');

    if (googleToken) {
      const sendTokenToBackend = async () => {
        try {
          const response = await fetch('/api/users/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ googleToken }),
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate with backend');
          }

          const data = await response.json();
          console.log('User authenticated:', data);
          localStorage.setItem('token', data.token);
          navigate('/home'); // Redirect to home on success
        } catch (error) {
          console.error('Error during backend authentication:', error);
        }
      };

      sendTokenToBackend();
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
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
        <h1 className="text-white text-2xl font-bold mb-2">{apodData.title}</h1>
      </div>
      <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black px-6 py-3 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300">
          Login with Google
        </button>
      </div>
    </div>
  );
}