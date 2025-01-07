// src/pages/Gallery.tsx
import { useState, useEffect } from 'react';

interface APODImage {
  date: string;
  explanation: string;
  title: string;
  url: string;
  media_type: string;
}

export default function Gallery() {
  const [images, setImages] = useState<APODImage[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&count=9`
  //       );
  //       const data = await response.json();
  //       const imageOnly = data.filter((item: APODImage) => item.media_type === 'image');
  //       setImages(imageOnly);
  //     } catch (error) {
  //       console.error('Error fetching APOD:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // 로딩 시작
      try {
        const collectedImages: APODImage[] = [];
        while (collectedImages.length < 9) {
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&count=9`
          );
          const data: APODImage[] = await response.json();
  
          // 중복되지 않는 새로운 이미지만 추가
          const newImages = data.filter(
            (item: APODImage) =>
              item.media_type === "image" &&
              !collectedImages.some((img) => img.date === item.date)
          );
          collectedImages.push(...newImages.slice(0, 9 - collectedImages.length));
        }
  
        // 모든 이미지가 수집된 후에 상태 업데이트
        setImages(collectedImages);
      } catch (error) {
        console.error("Error fetching APOD:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };
  
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center pointer-events-auto">
        <div className="text-white text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto pointer-events-auto">
      <div className="min-h-full pt-20 pb-10 bg-black/80">
        <div className="container mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div
                key={image.date}
                className="relative aspect-square group cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center rounded-lg">
                  <h3 className="text-white text-lg font-medium mb-4">{image.title}</h3>
                  <p className="text-white/90 text-sm overflow-y-auto max-h-40 font-light">
                    {image.explanation}
                  </p>
                  <span className="text-white/60 text-xs mt-4 font-light">{image.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}