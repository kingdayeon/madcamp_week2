import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const planetModels = [
  '/models/planet1.glb',
  '/models/planet2.glb',
  '/models/planet3.glb',
  '/models/planet4.glb',
  '/models/planet5.glb',
  '/models/planet6.glb',
  '/models/planet7.glb',
  '/models/planet8.glb',
  '/models/planet9.glb',
  '/models/planet10.glb',
  '/models/planet11.glb',
  '/models/planet12.glb',
];

export default function RandomPlanet() {
  // 랜덤으로 행성 모델 선택
  const randomIndex = Math.floor(Math.random() * planetModels.length);
  const modelPath = planetModels[randomIndex];

  // GLTF 모델 불러오기
  const { scene } = useGLTF(modelPath);

  // 행성 크기 조절을 위한 ref
  const planetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (planetRef.current) {
      // 1️⃣ Bounding Box 계산
      const box = new THREE.Box3().setFromObject(planetRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      // 2️⃣ 행성의 최대 크기 계산
      const maxDimension = Math.max(size.x, size.y, size.z);

      // 3️⃣ 크기 조절 (기준 크기를 4로 맞춤 - 모든 행성 동일하도록.)
      const scale = 4 / maxDimension;
      planetRef.current.scale.set(scale, scale, scale);
    }
  }, [scene]);

  return <primitive ref={planetRef} object={scene} />;
}