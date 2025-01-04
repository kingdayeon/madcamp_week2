
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
import Horoscope from './pages/Horoscope/index';
import MyPage from './pages/Mypage';
import HoroscopeDetail from './pages/Horoscope/detail';
import RandomPlanet from './components/planet/RandomPlanet';

export default function App() {
  const location = useLocation();
  const isMySpace = location.pathname === '/home';

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (location.pathname === '/home' && !event.ctrlKey) {
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
                  position: 'fixed',  // Canvas를 fixed로 설정
                  zIndex: 0,         // 낮은 z-index
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
                {isMySpace && <OrbitControls makeDefault />}
                <RandomPlanet /> 
              </Canvas>
              {/* UI 레이어 */}
              <div className="relative w-full h-full" style={{ 
                zIndex: 1,  // Canvas보다 높은 z-index
                pointerEvents: 'none' // 기본적으로 포인터 이벤트 무시
              }}>
                <div style={{ pointerEvents: 'auto' }}> {/* 필요한 UI 요소만 포인터 이벤트 활성화 */}
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
          </div>
        }
      />
    </Routes>
  );
}