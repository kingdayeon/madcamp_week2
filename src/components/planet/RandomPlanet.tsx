
// // import { useGLTF } from '@react-three/drei';
// // import { useEffect, useRef } from 'react';
// // import { useFrame } from '@react-three/fiber';
// // import * as THREE from 'three';
// // import { ThreeEvent } from '@react-three/fiber';

// // const planetModels = [
// //   '/models/planet1.glb',
// //   '/models/planet2.glb',
// //   '/models/planet3.glb',
// //   '/models/planet4.glb',
// //   '/models/planet5.glb',
// //   '/models/planet6.glb',
// //   '/models/planet7.glb',
// //   '/models/planet8.glb',
// //   '/models/planet9.glb',
// //   '/models/planet10.glb',
// //   '/models/planet11.glb',
// //   '/models/planet12.glb',
// // ];

// // export default function RandomPlanet() {
// //   const randomIndex = Math.floor(Math.random() * planetModels.length);
// //   const modelPath = planetModels[randomIndex];

// //   const { scene } = useGLTF(modelPath);
// //   const planetRef = useRef<THREE.Group>(null);

// //   useFrame(() => {
// //     if (planetRef.current) {
// //       planetRef.current.rotation.y += 0.002;
// //     }
// //   });

// //   useEffect(() => {
// //     if (planetRef.current) {
// //       const box = new THREE.Box3().setFromObject(planetRef.current);
// //       const size = new THREE.Vector3();
// //       box.getSize(size);

// //       const maxDimension = Math.max(size.x, size.y, size.z);
// //       const scale = 4 / maxDimension;
// //       planetRef.current.scale.set(scale, scale, scale);

// //       planetRef.current.traverse((object) => {
// //         if (object instanceof THREE.Mesh) {
// //           object.userData = { isClickable: true };
// //         }
// //       });
// //     }
// //   }, [scene]);

// //   const handleClick = (event: ThreeEvent<MouseEvent>) => {
// //     event.stopPropagation();
// //     console.log('Planet clicked!');
// //     console.log('Model path:', modelPath);
// //     console.log('Click position:', event.point);
// //     if (planetRef.current) {
// //       console.log('Planet position:', planetRef.current.position);
// //       console.log('Planet rotation:', planetRef.current.rotation);
// //       console.log('Planet scale:', planetRef.current.scale);
// //     }
// //   };

// //   return (
// //     <primitive 
// //       ref={planetRef} 
// //       object={scene} 
// //       onClick={handleClick}
// //       onPointerOver={() => document.body.style.cursor = 'pointer'}
// //       onPointerOut={() => document.body.style.cursor = 'default'}
// //     />
// //   );
// // }
// import { useGLTF } from '@react-three/drei';
// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { ThreeEvent } from '@react-three/fiber';

// interface RandomPlanetProps {
//   content: string;
// }

// export default function RandomPlanet({ content }: RandomPlanetProps) {
//   const randomIndex = Math.floor(Math.random() * 12);
//   const modelPath = `/models/planet${randomIndex + 1}.glb`;
//   const { scene } = useGLTF(modelPath);

//   const planetRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (planetRef.current) {
//       planetRef.current.position.set(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10
//       );
//     }
//   }, []);

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

interface RandomPlanetProps {
  content: string;
}

export default function RandomPlanet({ content }: RandomPlanetProps) {
  const randomIndex = Math.floor(Math.random() * 12);
  const modelPath = `/models/planet${randomIndex + 1}.glb`;
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (planetRef.current) {
      // 랜덤 위치 설정
      planetRef.current.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );

      // 크기 측정 및 스케일링
      const box = new THREE.Box3().setFromObject(planetRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 4 / maxDimension; // 최대 크기를 4로 맞춤
      planetRef.current.scale.set(scale, scale, scale);
    }
  }, [scene]);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    console.log('버킷리스트 내용:', content);
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
