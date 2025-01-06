import { create } from 'zustand';
import * as THREE from 'three';

import {
  createBucketList,
  getBucketLists,
  completeBucket,
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
    const scale = 1.5; // 기본 스케일을 4에서 1.5로 축소
  
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
  
  

  // ✅ 행성 위치 및 크기 설정 함수
  setPlanetPositionAndScale: (id, position, scale) =>
    set((state) => ({
      planetPositionsAndScales: {
        ...state.planetPositionsAndScales,
        [id]: { position, scale },
      },
    })),

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
