// Stars.tsx 

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export function Stars() {
  // Three.js의 Group 객체를 참조하기 위한 ref 생성
  const ref = useRef<THREE.Group>(null)
  const count = 5000  // 생성할 별의 총 개수

  // 별의 모양을 만드는 텍스처 생성
  const starTexture = useMemo(() => {
    // HTML Canvas 요소 생성
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')!
    
    // 중심에서 바깥으로 퍼지는 원형 그라데이션 생성
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')    // 중심: 불투명한 흰색
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)') // 중간: 반투명
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')    // 가장자리: 완전 투명

    // 그라데이션을 적용한 원 그리기
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(16, 16, 16, 0, Math.PI * 2)
    ctx.fill()
    
    // Canvas를 Three.js 텍스처로 변환
    return new THREE.CanvasTexture(canvas)
  }, [])

  // 3D 공간에서 별들의 위치 계산 (구면 좌표계 사용)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)  // x,y,z 좌표를 위해 *3
    for(let i = 0; i < count; i++) {
      const radius = Math.random() * 100     // 중심으로부터의 거리
      const theta = 2 * Math.PI * Math.random()  // 수평 각도
      const phi = Math.acos(2 * Math.random() - 1)  // 수직 각도
      
      const i3 = i * 3
      // 구면 좌표계를 직교 좌표계로 변환
      arr[i3] = radius * Math.sin(phi) * Math.cos(theta)     // x좌표
      arr[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) // y좌표
      arr[i3 + 2] = radius * Math.cos(phi)                   // z좌표
    }
    return arr
  }, [])

  // 각 별의 크기를 랜덤하게 설정
  const sizes = useMemo(() => {
    const arr = new Float32Array(count)
    for(let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.01 + 0.1  // 0.1 ~ 0.11 사이의 랜덤 크기
    }
    return arr
  }, [])

  // 매 프레임마다 별들을 천천히 회전
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.0001  // x축 회전
      ref.current.rotation.y += delta * 0.0005  // y축 회전
    }
  })

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          {/* 별들의 위치 정보 */}
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          {/* 별들의 크기 정보 */}
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        {/* 별의 material 설정 */}
        <pointsMaterial
          size={0.05}                    // 기본 크기
          sizeAttenuation               // 거리에 따른 크기 변화 활성화
          transparent                   // 투명도 활성화
          alphaMap={starTexture}        // 별 모양 텍스처
          alphaTest={0.001}             // 투명도 임계값
          opacity={0.8}                 // 전체 투명도
          color="#ffffff"               // 별 색상
          blending={THREE.AdditiveBlending}  // 별이 겹칠 때 더 밝아지도록
          depthWrite={false}            // 깊이 버퍼 비활성화
        />
      </points>
    </group>
  )
}