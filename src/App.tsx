// import { useEffect, useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import Navigation from './components/Navigation';
// import { Stars } from './components/three/Stars';
// import Landing from './pages/Landing';
// import MySpace from './pages/MySpace';
// import Gallery from './pages/Gallery';
// import Horoscope from './pages/Horoscope/index';
// import MyPage from './pages/Mypage';
// import HoroscopeDetail from './pages/Horoscope/detail';
// import RandomPlanet from './components/planet/RandomPlanet';

// export default function App() {
//   const location = useLocation();
//   const isMySpace = location.pathname === '/home';

//   // 행성 목록 상태 배열
//   const [planets, setPlanets] = useState<{ content: string; modelPath: string }[]>([]);

//   // 행성 추가 함수
//   const addPlanet = (content: string) => {
//     const randomIndex = Math.floor(Math.random() * 12);
//     const modelPath = `/models/planet${randomIndex + 1}.glb`;

//     setPlanets((prev) => [...prev, { content, modelPath }]);
//   };

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
//                 {planets.map((planet, index) => (
//                   <RandomPlanet key={index} content={planet.content} modelPath={planet.modelPath} />
//                 ))}
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
//             </div>
//           </div>
//         }
//       />
//     </Routes>
//   );
// }
import { useEffect, useState } from 'react';
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

  // 행성 목록 상태 배열
  const [planets, setPlanets] = useState<{ content: string; modelPath: string }[]>([]);
  // 아직 선택되지 않은 행성 목록
  const [availablePlanets, setAvailablePlanets] = useState<number[]>(Array.from({ length: 16 }, (_, i) => i + 1));

  // 행성 추가 함수
  const addPlanet = (content: string) => {
    if (availablePlanets.length === 0) {
      alert('모든 행성이 이미 생성되었습니다!');
      return;
    }

    // 랜덤 인덱스 선택
    const randomIndex = Math.floor(Math.random() * availablePlanets.length);
    const planetNumber = availablePlanets[randomIndex];

    // 선택된 행성 제거
    setAvailablePlanets((prev) => prev.filter((num) => num !== planetNumber));

    const modelPath = `/models/planet${planetNumber}.glb`;
    setPlanets((prev) => [...prev, { content, modelPath }]);
  };

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
                {isMySpace && <OrbitControls makeDefault />}
                {planets.map((planet, index) => (
                  <RandomPlanet key={index} content={planet.content} modelPath={planet.modelPath} />
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
            </div>
          </div>
        }
      />
    </Routes>
  );
}
