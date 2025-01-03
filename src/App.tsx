// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Navigation from './components/Navigation';
import { Stars } from './components/three/Stars';
import MySpace from './pages/MySpace';
import Gallery from './pages/Gallery';
import Horoscope from './pages/Horoscope';
import MyPage from './pages/MyPage';

export default function App() {
  const location = useLocation();
  const isMySpace = location.pathname === '/';

  return (
    <div className="app">
      <Navigation />
      <div className="w-full h-screen">
        <Canvas
          camera={{ 
            position: [0, 0, 15],
            fov: 75
          }}
          style={{
            background: '#070614'
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
        <div className="absolute inset-0 z-10 pointer-events-none">  {/* pointer-events-none 추가 */}
          <Routes>
            <Route path="/" element={<MySpace />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}