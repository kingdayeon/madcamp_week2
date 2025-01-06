import { create } from 'zustand';
import * as THREE from 'three';

import {
  createBucketList,
  getBucketLists,
  completeBucket,
  deleteBucket,
  getCompletedBuckets,
} from '../api/bucketList';

// ✅ 행성 타입 정의
export interface Planet {
  id: string;
  content: string;
  modelPath: string;
  position?: THREE.Vector3;
  isCompleted?: boolean;
}

interface BucketList {
  _id: string;
  content: string;
  modelPath: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  isCompleted?: boolean;
  completedAt?: Date;
}

// ✅ Zustand 스토어 타입 정의
export interface PlanetStore {
  planets: Planet[];
  completedPlanets: Planet[];
  selectedPlanet: Planet | null; // 선택된 행성
  planetPositionsAndScales: { [key: string]: { position: THREE.Vector3; scale: number } };
  addPlanet: (content: string) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  completePlanet: (id: string) => Promise<void>;
  deletePlanet: (id: string) => Promise<void>;
  setPlanetPositionAndScale: (id: string, position: THREE.Vector3, scale: number) => void;
  fetchPlanets: () => Promise<void>;
  fetchCompletedPlanets: () => Promise<void>;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  completedPlanets: [],
  selectedPlanet: null, // 초기값 null
  planetPositionsAndScales: {},

  // ✅ 랜덤 행성 추가 함수 (백엔드 저장 포함)
  // usePlanetStore.ts 수정사항
  addPlanet: async (content) => {
    const position = {
      x: Math.random() * 30 - 15,  // -15 ~ 15 사이
      y: Math.random() * 20 - 10,  // -10 ~ 10 사이
      z: Math.random() * 20 - 10   // -10 ~ 10 사이
    };
  
    const modelPath = `/models/planet${Math.floor(Math.random() * 16) + 1}.glb`;
    
    // 백엔드에 먼저 저장
    const savedBucket = await createBucketList({
      content,
      modelPath,
      position,
    });

    // 스케일 계산 (더 작은 값으로 조정)
    let maxDimension = 1.0

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

    const scale = 3 / maxDimension

    const newPlanet: Planet = {
      id: savedBucket._id,
      content,
      modelPath,
      position: new THREE.Vector3(position.x, position.y, position.z),
    };
  
    set((state) => ({
      planets: [...state.planets, newPlanet],
      planetPositionsAndScales: {
        ...state.planetPositionsAndScales,
        [newPlanet.id]: {
          position: new THREE.Vector3(position.x, position.y, position.z),
          scale
        }
      }
    }));
  },
  // ✅ 선택된 행성 설정 함수
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

  // completePlanet 함수 수정
  completePlanet: async (id) => {
    try {
      await completeBucket(id);

      set((state) => {
        const completedPlanet = state.planets.find(p => p.id === id);
        return {
          planets: state.planets.filter(planet => planet.id !== id),
          completedPlanets: completedPlanet 
            ? [...state.completedPlanets, completedPlanet]
            : state.completedPlanets,
          selectedPlanet: null  // 모달 닫기
        };
      });
    } catch (error) {
      console.error('버킷리스트 완료 실패:', error);
      throw error;
    }
  },
  
  deletePlanet: async(id) => {
    try {
      await deleteBucket(id);

      set((state) => ({
        planets: state.planets.filter((planet) => planet.id !== id),
        selectedPlanet: null, // 모달 닫기
      }));
    } catch (error) {
      console.error('버킷리스트 삭제 실패:', error);
      throw error;
    }
  },

  // ✅ 행성 위치 및 크기 설정 함수
  setPlanetPositionAndScale: (id, position, scale) =>
    set((state) => ({
      planetPositionsAndScales: {
        ...state.planetPositionsAndScales,
        [id]: { position, scale },
      },
    }
  )),

  // ✅ 모든 버킷리스트 가져오기
  
fetchPlanets: async () => {
  try {
    const bucketLists = await getBucketLists(false) as BucketList[];

    set({
      planets: bucketLists.map((bucket: BucketList) => ({
        id: bucket._id,
        content: bucket.content,
        modelPath: bucket.modelPath,
        position: new THREE.Vector3(
          bucket.position.x,
          bucket.position.y,
          bucket.position.z
        ),
        isCompleted: bucket.isCompleted || false
      }))
    });
  } catch (error) {
    console.error('Failed to fetch planets:', error);
  }
},

fetchCompletedPlanets: async () => {
  try {
    const completedBuckets = await getCompletedBuckets() as BucketList[];

    set({
      completedPlanets: completedBuckets.map((bucket: BucketList) => ({
        id: bucket._id,
        content: bucket.content,
        modelPath: bucket.modelPath,
        isCompleted: true
      }))
    });
  } catch (error) {
    console.error('Failed to fetch completed planets:', error);
  }
}
}));
