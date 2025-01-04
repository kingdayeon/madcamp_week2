// src/components/planet/BucketPlanet.tsx
import { useGLTF, Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Planet, Position } from '../../types/bucketList';
import { ThreeEvent } from '@react-three/fiber';

interface BucketPlanetProps {
  planet: Planet;
  position: Position;
  onClick: () => void;
}

export default function BucketPlanet({ planet, position, onClick }: BucketPlanetProps) {
  const [hovered, setHovered] = useState(false);
  const modelPath = `/models/planet${Math.floor(Math.random() * 12) + 1}.glb`;
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (planetRef.current) {
      const box = new THREE.Box3().setFromObject(planetRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 4 / maxDimension;
      planetRef.current.scale.set(scale, scale, scale);
      planetRef.current.position.set(position.x, position.y, position.z);
      planetRef.current.userData.planetName = planet.name;
      planetRef.current.userData.planetDescription = planet.description;
    }
  }, [scene, position, planet]);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive 
        ref={planetRef} 
        object={scene} 
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick();
        }}
      />
      <Html
        position={[position.x, position.y + 3, position.z]}
        center
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px 12px',
          borderRadius: '4px',
          color: 'white',
          fontSize: '14px',
          pointerEvents: 'none',
        }}
      >
        <div>
          <div className="font-bold">{planet.name}</div>
          <div className="text-sm text-gray-300">{planet.description}</div>
        </div>
      </Html>
    </group>
  );
}