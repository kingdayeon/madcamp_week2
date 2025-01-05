// // // // import { useGLTF } from '@react-three/drei';
// // // // import { useEffect, useRef } from 'react';
// // // // import { useFrame } from '@react-three/fiber';
// // // // import * as THREE from 'three';
// // // // import { ThreeEvent } from '@react-three/fiber';

// // // // interface RandomPlanetProps {
// // // //   content: string;
// // // //   modelPath: string;
// // // // }

// // // // export default function RandomPlanet({ content, modelPath }: RandomPlanetProps) {
// // // //   const { scene } = useGLTF(modelPath);
// // // //   const planetRef = useRef<THREE.Group>(null);

// // // //   useEffect(() => {
// // // //     if (planetRef.current) {
// // // //       // 랜덤 위치 설정
// // // //       planetRef.current.position.set(
// // // //         (Math.random() - 0.5) * 30,
// // // //         (Math.random() - 0.5) * 20,
// // // //         (Math.random() - 0.5) * 20
// // // //       );

// // // //       // 크기 측정 및 스케일링
// // // //       const box = new THREE.Box3().setFromObject(planetRef.current);
// // // //       const size = new THREE.Vector3();
// // // //       box.getSize(size);

// // // //       const maxDimension = Math.max(size.x, size.y, size.z);
// // // //       const scale = 4 / maxDimension; // 최대 크기를 4로 맞춤
// // // //       planetRef.current.scale.set(scale, scale, scale);
// // // //     }
// // // //   }, [scene]);

// // // //   useFrame(() => {
// // // //     if (planetRef.current) {
// // // //       planetRef.current.rotation.y += 0.002;
// // // //     }
// // // //   });

// // // //   const handleClick = (event: ThreeEvent<MouseEvent>) => {
// // // //     event.stopPropagation();
// // // //     console.log('버킷리스트 내용:', content);
// // // //   };

// // // //   return (
// // // //     <primitive
// // // //       ref={planetRef}
// // // //       object={scene}
// // // //       onClick={handleClick}
// // // //       onPointerOver={() => (document.body.style.cursor = 'pointer')}
// // // //       onPointerOut={() => (document.body.style.cursor = 'default')}
// // // //     />
// // // //   );
// // // // }
// // // import { useGLTF } from '@react-three/drei';
// // // import { useEffect, useRef } from 'react';
// // // import { useFrame } from '@react-three/fiber';
// // // import * as THREE from 'three';
// // // import { ThreeEvent } from '@react-three/fiber';
// // // import { usePlanetStore } from '../../store/usePlanetStore';

// // // interface RandomPlanetProps {
// // //   id: string;
// // //   content: string;
// // //   modelPath: string;
// // // }

// // // export default function RandomPlanet({ id, content, modelPath }: RandomPlanetProps) {
// // //   const { scene } = useGLTF(modelPath);
// // //   const planetRef = useRef<THREE.Group>(null);

// // //   // Zustand 스토어 함수 가져오기
// // //   const { setSelectedPlanet } = usePlanetStore();

// // //   useEffect(() => {
// // //     if (planetRef.current) {
// // //       planetRef.current.position.set(
// // //         (Math.random() - 0.5) * 30,
// // //         (Math.random() - 0.5) * 20,
// // //         (Math.random() - 0.5) * 20
// // //       );

// // //       const box = new THREE.Box3().setFromObject(planetRef.current);
// // //       const size = new THREE.Vector3();
// // //       box.getSize(size);

// // //       const maxDimension = Math.max(size.x, size.y, size.z);
// // //       const scale = 4 / maxDimension;
// // //       planetRef.current.scale.set(scale, scale, scale);
// // //     }
// // //   }, [scene]);

  

// // //   useFrame(() => {
// // //     if (planetRef.current) {
// // //       planetRef.current.rotation.y += 0.002;
// // //     }
// // //   });

// // //   // 행성을 클릭하면 Planet 객체 전체를 Zustand에 저장
// // //   const handleClick = (event: ThreeEvent<MouseEvent>) => {
// // //     event.stopPropagation();
// // //     setSelectedPlanet({ id, content, modelPath }); // 객체 전체 전달
// // //   };

// // //   return (
// // //     <primitive
// // //       ref={planetRef}
// // //       object={scene}
// // //       onClick={handleClick}
// // //       onPointerOver={() => (document.body.style.cursor = 'pointer')}
// // //       onPointerOut={() => (document.body.style.cursor = 'default')}
// // //     />
// // //   );
// // // }
// // import { useGLTF } from '@react-three/drei';
// // import { useEffect, useRef } from 'react';
// // import { useFrame } from '@react-three/fiber';
// // import * as THREE from 'three';
// // import { ThreeEvent } from '@react-three/fiber';
// // import { usePlanetStore } from '../../store/usePlanetStore';

// // interface RandomPlanetProps {
// //   id: string;
// //   content: string;
// //   modelPath: string;
// // }

// // export default function RandomPlanet({ id, content, modelPath }: RandomPlanetProps) {
// //   const { scene } = useGLTF(modelPath);
// //   const planetRef = useRef<THREE.Group>(null);

// //   // Zustand 스토어 함수 가져오기
// //   const { setSelectedPlanet, setPlanetPositionAndScale, planetPositionsAndScales } = usePlanetStore();

// //   useEffect(() => {
// //     if (planetRef.current && !planetPositionsAndScales[id]) {
// //       // 랜덤 위치와 크기 계산
// //       const position = new THREE.Vector3(
// //         (Math.random() - 0.5) * 30,
// //         (Math.random() - 0.5) * 20,
// //         (Math.random() - 0.5) * 20
// //       );

// //       const box = new THREE.Box3().setFromObject(planetRef.current);
// //       const size = new THREE.Vector3();
// //       box.getSize(size);

// //       const maxDimension = Math.max(size.x, size.y, size.z);
// //       const scale = 4 / maxDimension;

// //       // 위치와 크기를 Zustand에 저장
// //       setPlanetPositionAndScale(id, position, scale);
// //     }
// //   }, [scene, id, planetPositionsAndScales, setPlanetPositionAndScale]);

// //   // 행성의 위치와 크기를 Zustand에서 가져오기
// //   const { position, scale } = planetPositionsAndScales[id] || {};

// //   if (position && scale && planetRef.current) {
// //     planetRef.current.position.copy(position);
// //     planetRef.current.scale.set(scale, scale, scale);
// //   }

// //   useFrame(() => {
// //     if (planetRef.current) {
// //       planetRef.current.rotation.y += 0.002;
// //     }
// //   });

// //   // 행성을 클릭하면 Planet 객체 전체를 Zustand에 저장
// //   const handleClick = (event: ThreeEvent<MouseEvent>) => {
// //     event.stopPropagation();
// //     setSelectedPlanet({ id, content, modelPath });
// //   };

// //   return (
// //     <primitive
// //       ref={planetRef}
// //       object={scene}
// //       onClick={handleClick}
// //       onPointerOver={() => (document.body.style.cursor = 'pointer')}
// //       onPointerOut={() => (document.body.style.cursor = 'default')}
// //     />
// //   );
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
  const { setSelectedPlanet, setPlanetPositionAndScale, planetPositionsAndScales } = usePlanetStore();

  useEffect(() => {
    if (planetRef.current && !planetPositionsAndScales[id]) {
      // 랜덤 위치와 크기 계산
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      const box = new THREE.Box3().setFromObject(planetRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 4 / maxDimension;

      // 위치와 크기를 Zustand에 저장
      setPlanetPositionAndScale(id, position, scale);
    }
  }, [scene, id, planetPositionsAndScales, setPlanetPositionAndScale]);

  // 행성의 위치와 크기를 Zustand에서 가져오기
  const storedData = planetPositionsAndScales[id];

  // 위치와 크기를 적용할 때 한 번만 설정
  useEffect(() => {
    if (storedData && planetRef.current) {
      planetRef.current.position.copy(storedData.position);
      planetRef.current.scale.set(storedData.scale, storedData.scale, storedData.scale);
    }
  }, [storedData]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
  });

  // 행성을 클릭하면 Planet 객체 전체를 Zustand에 저장
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedPlanet({ id, content, modelPath });
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
