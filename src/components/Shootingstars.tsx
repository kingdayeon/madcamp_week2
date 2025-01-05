import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

interface ShootingStarsProps {
  trigger: boolean;
  onComplete: () => void;
}

interface StarData {
  speed: number;
  rotationSpeed: number;
  scale: number;
  color: string;
  trail: number;
  timeOffset?: number;
}

interface StarGroupUserData {
  speed: number;
  rotationSpeed: number;
  initialY: number;
  timeOffset: number;
}

const ShootingStars = ({ trigger, onComplete }: ShootingStarsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const clock = useRef(new THREE.Clock());

  const starConfigs = useMemo<StarData[]>(() => [
    { speed: 11.0, rotationSpeed: 0.01, scale: 1.0, color: '#FFFFFF', trail: 6 },
    { speed: 10.8, rotationSpeed: 0.01, scale: 1.2, color: '#FFE7C7', trail: 7 },
    { speed: 11.2, rotationSpeed: 0.01, scale: 0.8, color: '#FFF4E0', trail: 5.5 },
    { speed: 10.9, rotationSpeed: 0.01, scale: 1.1, color: '#FFD700', trail: 6.5 },
    { speed: 11.1, rotationSpeed: 0.01, scale: 0.9, color: '#FFA500', trail: 6 },
    { speed: 11.0, rotationSpeed: 0.01, scale: 1.3, color: '#FFF4E0', trail: 7 },
    { speed: 11.3, rotationSpeed: 0.01, scale: 0.7, color: '#FFFFFF', trail: 5.5 }
  ].map((config, index) => ({
    ...config,
    timeOffset: (index * 0.1) % 0.3  // 0.1초 간격, 최대 0.3초까지의 시간차
  })), []);

  const createStar = (config: StarData): THREE.Group => {
    const starGroup = new THREE.Group();

    // 메인 라인
    const trailGeometry = new THREE.BoxGeometry(
      config.trail * 1.8,  // 길이
      0.02 * config.scale, // 두께
      0.02 * config.scale
    );
    const trailMaterial = new THREE.MeshBasicMaterial({ 
      color: config.color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    
    // 대각선 회전을 위한 그룹
    const rotationGroup = new THREE.Group();
    rotationGroup.rotation.z = -Math.PI / 4; // 정확히 45도
    rotationGroup.add(trail);
    starGroup.add(rotationGroup);

    // 작은 보조 라인들
    for (let i = 0; i < 5; i++) {
      const glowTrailGeometry = new THREE.BoxGeometry(
        config.trail * (1.5 - i * 0.15),
        0.015 * config.scale,
        0.015 * config.scale
      );
      const glowTrailMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.25 - (i * 0.03),
        blending: THREE.AdditiveBlending
      });
      const glowTrail = new THREE.Mesh(glowTrailGeometry, glowTrailMaterial);
      const glowRotationGroup = new THREE.Group();
      glowRotationGroup.rotation.z = -Math.PI / 4 + (Math.random() - 0.5) * 0.05;
      glowRotationGroup.add(glowTrail);
      starGroup.add(glowRotationGroup);
    }

    // 시작 위치를 왼쪽 상단으로 조정
    starGroup.position.set(
      -Math.random() * 20 - 10,  // 더 왼쪽에서 시작
      Math.random() * 15 + 15,   // 높은 위치
      Math.random() * 10 - 5     // 깊이
    );

    starGroup.userData = {
      speed: config.speed,
      rotationSpeed: config.rotationSpeed,
      initialY: starGroup.position.y,
      timeOffset: config.timeOffset || 0
    } as StarGroupUserData;

    return starGroup;
  };

  useEffect(() => {
    if (trigger && groupRef.current) {
      const group = groupRef.current;
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }
      starConfigs.forEach(config => {
        const star = createStar(config);
        group.add(star);
      });
      clock.current.start();
    }
  }, [trigger, starConfigs]);

  useFrame(() => {
    if (!groupRef.current || groupRef.current.children.length === 0) return;
    
    const time = clock.current.getElapsedTime();
    let allComplete = true;

    groupRef.current.children.forEach((starGroup) => {
      const userData = starGroup.userData as StarGroupUserData;
      
      // 시간 차이를 고려한 시작 시점 체크
      if (time < userData.timeOffset) {
        starGroup.visible = false;  // 시작 전에는 보이지 않게
        allComplete = false;
        return;
      }
      
      starGroup.visible = true;  // 시작 시점이 되면 보이게
      const activeTime = time - userData.timeOffset;
      
      // 정확한 대각선 방향으로 이동 (훨씬 더 빠른 속도)
      starGroup.position.x += userData.speed * 1.0;  // 최대 속도
      starGroup.position.y -= userData.speed * 1.0;  // 최대 속도
      starGroup.position.z += Math.sin(activeTime * 2) * 0.02;

      // 라인들의 투명도 조절
      const fallProgress = 1 - (starGroup.position.y + 10) / (userData.initialY + 10);
      starGroup.children.forEach((rotationGroup) => {
        rotationGroup.children.forEach((mesh) => {
          const material = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (material.opacity > 0.1) {
            material.opacity = Math.max(0.1, 1 - fallProgress);
          }
        });
      });

      if (starGroup.position.y > -10 && starGroup.position.x < 30) {
        allComplete = false;
      } else {
        groupRef.current?.remove(starGroup);
      }
    });

    if (allComplete && groupRef.current.children.length === 0) {
      onComplete();
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom 
          intensity={2.5}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.95}
          kernelSize={KernelSize.HUGE}
        />
      </EffectComposer>
      <group ref={groupRef} />
    </>
  );
};

export default ShootingStars;