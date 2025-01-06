
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
import { usePlanetStore } from './store/usePlanetStore';
import ContainBucketModal from './components/planet/ConatainBucketModal';

// export default function App() {
//   const location = useLocation();
//   const isMySpace = location.pathname === '/home';

//   // Zustand 스토어에서 상태 가져오기
//   const { planets, addPlanet } = usePlanetStore();

//   useEffect(() => {
//     const handleWheel = (event: WheelEvent) => {
//       if (location.pathname === '/home' && !event.ctrlKey) {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('wheel', handleWheel, { passive: false });
//     return () => window.removeEventListener('wheel', handleWheel);
//   }, [location]);

//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route
//         path="/*"
//         element={
//           <div className="app">
//             <Navigation />
//             <div className="w-full h-screen">
//               <Canvas
//                 camera={{
//                   position: [0, 0, 20],
//                   fov: 60,
//                 }}
//                 style={{
//                   background: '#070614',
//                   position: 'fixed',
//                   zIndex: 0,
//                 }}
//               >
//                 <EffectComposer>
//                   <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.9} kernelSize={4} />
//                 </EffectComposer>
//                 <ambientLight intensity={0.5} />
//                 <Stars />
//                 {isMySpace && <OrbitControls makeDefault />}
//                 {planets.map((planet) => (
//   <RandomPlanet key={planet.id} id={planet.id} content={planet.content} modelPath={planet.modelPath} />
// ))}
// {/* key추가하니까 문제 해결 */}
//               </Canvas>
//               <div className="relative w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
//                 <div style={{ pointerEvents: 'auto' }}>
//                   <Routes>
//                     <Route path="/home" element={<MySpace addPlanet={addPlanet} />} />
//                     <Route path="/gallery" element={<Gallery />} />
//                     <Route path="/horoscope" element={<Horoscope />} />
//                     <Route path="/horoscope/:sign" element={<HoroscopeDetail />} />
//                     <Route path="/mypage" element={<MyPage />} />
//                   </Routes>
//                 </div>
//               </div>
//               {/* 모달 추가 */}
//               <ContainBucketModal /> 
//             </div>
//           </div>
//         }
//       />
//     </Routes>
//   );
// }

import { useState } from 'react';
import ShootingStars from './components/Shootingstars';

export default function App() {
  const location = useLocation();
  const isMySpace = location.pathname === '/home';

  // 별똥별 트리거 상태 추가
  const [showShootingStars, setShowShootingStars] = useState(false);

  // Zustand 스토어에서 상태 가져오기
  const { planets, addPlanet } = usePlanetStore();

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
                  position: [0, 0, 20],
                  fov: 60,
                }}
                style={{
                  background: '#070614',
                  position: 'fixed',
                  zIndex: 0,
                }}
              >
                <EffectComposer>
                  <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.9} kernelSize={4} />
                </EffectComposer>
                <ambientLight intensity={0.5} />
                <Stars />
                <ShootingStars
                  trigger={showShootingStars}
                  onComplete={() => setShowShootingStars(false)}
                />
                {isMySpace && <OrbitControls makeDefault />}
                // App.tsx 수정
{planets.map((planet) => (
  <RandomPlanet 
    key={`planet-${planet.id}`}  // 고유한 key 제공
    id={planet.id} 
    content={planet.content} 
    modelPath={planet.modelPath} 
  />
))}
              </Canvas>
              <div className="relative w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                  <Routes>
                    <Route path="/home" element={<MySpace addPlanet={addPlanet} />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/horoscope" element={<Horoscope />} />
                    <Route path="/horoscope/:sign" element={<HoroscopeDetail />} />
                    <Route path="/mypage" element={<MyPage />} />
                  </Routes>
                </div>
              </div>
              {/* 모달 추가 */}
              <ContainBucketModal
                onComplete={() => setShowShootingStars(true)}
              />
            </div>
          </div>
        }
      />
    </Routes>
  );
}
