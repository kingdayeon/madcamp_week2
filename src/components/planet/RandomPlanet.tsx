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

  const { selectedPlanet, setSelectedPlanet, setPlanetPositionAndScale, planetPositionsAndScales } = usePlanetStore();

  useEffect(() => {
    if (planetRef.current && !planetPositionsAndScales[id]) {
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

      setPlanetPositionAndScale(id, position, scale);
    }
  }, [scene, id, planetPositionsAndScales, setPlanetPositionAndScale]);

  const storedData = planetPositionsAndScales[id];

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

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // 중복 클릭 방지
    if (selectedPlanet?.id === id) return;

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
