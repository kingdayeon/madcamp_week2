// import { useGLTF } from '@react-three/drei';
// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { ThreeEvent } from '@react-three/fiber';

// interface RandomPlanetProps {
//   content: string;
//   modelPath: string;
// }

// export default function RandomPlanet({ content, modelPath }: RandomPlanetProps) {
//   const { scene } = useGLTF(modelPath);
//   const planetRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (planetRef.current) {
//       // 랜덤 위치 설정
//       planetRef.current.position.set(
//         (Math.random() - 0.5) * 30,
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20
//       );

//       // 크기 측정 및 스케일링
//       const box = new THREE.Box3().setFromObject(planetRef.current);
//       const size = new THREE.Vector3();
//       box.getSize(size);

//       const maxDimension = Math.max(size.x, size.y, size.z);
//       const scale = 4 / maxDimension; // 최대 크기를 4로 맞춤
//       planetRef.current.scale.set(scale, scale, scale);
//     }
//   }, [scene]);

//   useFrame(() => {
//     if (planetRef.current) {
//       planetRef.current.rotation.y += 0.002;
//     }
//   });

//   const handleClick = (event: ThreeEvent<MouseEvent>) => {
//     event.stopPropagation();
//     console.log('버킷리스트 내용:', content);
//   };

//   return (
//     <primitive
//       ref={planetRef}
//       object={scene}
//       onClick={handleClick}
//       onPointerOver={() => (document.body.style.cursor = 'pointer')}
//       onPointerOut={() => (document.body.style.cursor = 'default')}
//     />
//   );
// }
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { usePlanetStore } from '../../store/usePlanetStore';

interface RandomPlanetProps {
  id: string;
  content: string;
  modelPath: string;
}

export default function RandomPlanet({ id, content, modelPath }: RandomPlanetProps) {
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);

  // Zustand 스토어 함수 가져오기
  const { setSelectedPlanet } = usePlanetStore();

  useEffect(() => {
    if (planetRef.current) {
      planetRef.current.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      const box = new THREE.Box3().setFromObject(planetRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 4 / maxDimension;
      planetRef.current.scale.set(scale, scale, scale);
    }
  }, [scene]);

  

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
  });

  // 행성을 클릭하면 Planet 객체 전체를 Zustand에 저장
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedPlanet({ id, content, modelPath }); // 객체 전체 전달
  };

  return (
    <primitive
      ref={planetRef}
      object={scene}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    />
  );
}
