import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Stars } from './components/three/Stars'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function App() {
  return (
    <div className="app">
      <Canvas
        camera={{ 
          position: [0, 0, 15],  // 카메라 위치
          fov: 75                // 시야각
        }}
        style={{
          background: '#070614'  // 진한 남색 배경
        }}
      >
        {/* 후처리 효과 */}
        <EffectComposer>
          <Bloom
            intensity={1}              // 빛나는 강도
            luminanceThreshold={0}     // 빛나기 시작하는 밝기 기준
            luminanceSmoothing={0.9}   // 발광 효과의 부드러움
            kernelSize={4}             // 발광 효과의 크기
          />
        </EffectComposer>
        
        <ambientLight intensity={0.5} />  // 전체적인 조명
        <Stars />                         // 별들 렌더링
        <OrbitControls />                 // 마우스로 화면 조작 가능하게 함
      </Canvas>
      
    </div>
  )
}