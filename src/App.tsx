// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Navigation from './components/Navigation';
import { Stars } from './components/three/Stars';
import Landing from './pages/Landing';
import MySpace from './pages/MySpace';
import Gallery from './pages/Gallery';
// import Horoscope from './pages/Horoscope/Horoscope';
import Horoscope from './pages/Horoscope/index';
import MyPage from './pages/MyPage';
import HoroscopeDetail from './pages/Horoscope/detail'; // Detail 컴포넌트 추가


export default function App() {
  const location = useLocation();
  const isMySpace = location.pathname === '/';

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (location.pathname === '/' && !event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/*"
        element={
          <div className="app">
            <Navigation />
            <div className="w-full h-screen">
              <Canvas
                camera={{
                  position: [0, 0, 15],
                  fov: 75,
                }}
                style={{
                  background: '#070614',
                }}
              >
                <EffectComposer>
                  <Bloom
                    intensity={1}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                    kernelSize={4}
                  />
                </EffectComposer>
                <ambientLight intensity={0.5} />
                <Stars />
                {isMySpace && <OrbitControls />}
              </Canvas>
              <div className="absolute inset-0" style={{ pointerEvents: isMySpace ? 'none' : 'auto' }}>
                <Routes>
                  <Route path="/home" element={<MySpace />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/horoscope" element={<Horoscope />} />
                  <Route path="/horoscope/:sign" element={<HoroscopeDetail />} />
                  <Route path="/mypage" element={<MyPage />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}