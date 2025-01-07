import { useGLTF } from '@react-three/drei';
import { useEffect, useRef,  } from 'react';
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
  // const [ setIsInitialized] = useState(false);
  
  // RandomPlanet.tsx 수정
  useEffect(() => {
    if (planetRef.current && !planetPositionsAndScales[id]) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30,  // 더 넓은 범위로
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      // 모델의 실제 크기를 고려한 스케일 계산
      //const box = new THREE.Box3().setFromObject(planetRef.current);
      //const size = new THREE.Vector3();
      //box.getSize(size);
      
      let maxDimension = 1.0

      //console.log(modelPath+" "+Math.max(size.x,size.y,size.z))
      switch (modelPath) {
        case "/models/planet1.glb":
          maxDimension = 5.162075066733811;
          break;
        case "/models/planet2.glb":
          maxDimension = 2.003995937491723;
          break;
        case "/models/planet3.glb":
          maxDimension = 2.068285665802876;
          break;
        case "/models/planet4.glb":
          maxDimension = 18.64741790433749;
          break;
        case "/models/planet5.glb":
          maxDimension = 555.1829357002869;
          break;
        case "/models/planet6.glb":
          maxDimension = 2.459632131912585;
          break;
        case "/models/planet7.glb":
          maxDimension = 47.976548450897035;
          break;
        case "/models/planet8.glb":
          maxDimension = 27.830789706460514;
          break;
        case "/models/planet9.glb":
          maxDimension = 3.1097603327519856;
          break;
        case "/models/planet10.glb":
          maxDimension = 229.96562576293945;
          break;
        case "/models/planet11.glb":
          maxDimension = 328.8452072428718;
          break;
        case "/models/planet12.glb":
          maxDimension = 12.39915707081638;
          break;
        case "/models/planet13.glb":
          maxDimension = 2.0494765820914247;
          break;
        case "/models/planet14.glb":
          maxDimension = 2.003998052547473;
          break;
        case "/models/planet15.glb":
          maxDimension = 396.18216839936946;
          break;
        case "/models/planet16.glb":
          maxDimension = 57.41700152805447;
          break;
        case "/models/planet17.glb":
          maxDimension = 151.12920389586276;
          break;
        default:
          maxDimension = 1; // 기본값 설정 (필요한 경우)
          break;
      }

      const scale = 4 / maxDimension;  // 4 대신 1.5 사용

      setPlanetPositionAndScale(id, position, scale);
      // setIsInitialized(true);
    }
  }, [scene, id, planetPositionsAndScales, setPlanetPositionAndScale, modelPath]);

  useEffect(() => {
    const storedData = planetPositionsAndScales[id];
    if (storedData && planetRef.current) {
      planetRef.current.position.copy(storedData.position);
      planetRef.current.scale.set(storedData.scale, storedData.scale, storedData.scale);
    }
  }, [planetPositionsAndScales, id]);

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
