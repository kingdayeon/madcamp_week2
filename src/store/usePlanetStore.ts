// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
// import * as THREE from 'three';

// import { createBucketList } from '../api/bucketList'; // API 함수 추가

// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean;
// }

// export interface PlanetStore {
//   planets: Planet[];
//   completedPlanets: Planet[];
//   availablePlanets: number[];
//   selectedPlanet: Planet | null;
//   planetPositionsAndScales: { [key: string]: { position: THREE.Vector3; scale: number } };
//   addPlanet: (content: string) => void;
//   setSelectedPlanet: (planet: Planet | null) => void;
//   completePlanet: (id: string) => Promise<void>;
//   setPlanetPositionAndScale: (id: string, position: THREE.Vector3, scale: number) => void;
// }

// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   completedPlanets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   selectedPlanet: null,
//   planetPositionsAndScales: {},


// addPlanet: async (content) => {
//   set((state) => {
//     if (state.availablePlanets.length === 0) {
//       alert('모든 행성이 이미 생성되었습니다!');
//       return state;
//     }

//     const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
//     const planetNumber = state.availablePlanets[randomIndex];

//     const newPlanet: Planet = {
//       id: uuidv4(),
//       content,
//       modelPath: `/models/planet${planetNumber}.glb`,
//     };

//     // ✅ 백엔드에 데이터 저장
//     createBucketList({
//       content: newPlanet.content,
//       modelPath: newPlanet.modelPath,
//       position: {
//         x: Math.random() * 20 - 10,
//         y: Math.random() * 20 - 10,
//         z: Math.random() * 20 - 10,
//       },
//     }).catch((error) => {
//       console.error('버킷리스트 생성 실패:', error);
//     });

//     return {
//       ...state,
//       planets: [...state.planets, newPlanet],
//       availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//     };
//   });
// },

//   setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
//   completePlanet: async (id) => {
//     return new Promise<void>((resolve) => {
//       set((state) => {
//         const planetIndex = state.planets.findIndex((p) => p.id === id);
//         if (planetIndex === -1) return state;
  
//         const updatedPlanets = [...state.planets];
//         const completedPlanet = { ...updatedPlanets[planetIndex], isCompleted: true };
//         updatedPlanets.splice(planetIndex, 1);
  
//         resolve();
  
//         return {
//           planets: updatedPlanets,
//           completedPlanets: [...state.completedPlanets, completedPlanet],
//           selectedPlanet: null,
//         };
//       });
//     });
//   },
  
  
//   setPlanetPositionAndScale: (id, position, scale) =>
//     set((state) => ({
//       planetPositionsAndScales: {
//         ...state.planetPositionsAndScales,
//         [id]: state.planetPositionsAndScales[id] || { position, scale },
//       },
//     })),
// }));
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';

import { createBucketList, getBucketLists } from '../api/bucketList'; // ✅ API 함수 추가

// 행성 타입 정의
export interface Planet {
  id: string;
  content: string;
  modelPath: string;
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


// Zustand 스토어 타입 정의
export interface PlanetStore {
  planets: Planet[];
  completedPlanets: Planet[];
  availablePlanets: number[];
  selectedPlanet: Planet | null;
  planetPositionsAndScales: { [key: string]: { position: THREE.Vector3; scale: number } };
  addPlanet: (content: string) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  completePlanet: (id: string) => Promise<void>;
  setPlanetPositionAndScale: (id: string, position: THREE.Vector3, scale: number) => void;
  fetchPlanets: () => Promise<void>; // ✅ 새 함수 추가
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  completedPlanets: [],
  availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
  selectedPlanet: null,
  planetPositionsAndScales: {},

  // ✅ 랜덤 행성 추가 함수 (백엔드 저장 포함)
  addPlanet: (content) =>
    set((state) => {
      if (state.availablePlanets.length === 0) {
        alert('모든 행성이 이미 생성되었습니다!');
        return state;
      }

      const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
      const planetNumber = state.availablePlanets[randomIndex];

      const newPlanet: Planet = {
        id: uuidv4(),
        content,
        modelPath: `/models/planet${planetNumber}.glb`,
      };

      // ✅ 백엔드에 버킷리스트 저장
      createBucketList({
        content: newPlanet.content,
        
          modelPath: newPlanet.modelPath,
      
        position: {
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          z: Math.random() * 20 - 10,
        },
      }).catch((error) => {
        console.error('버킷리스트 생성 실패:', error);
      });

      return {
        ...state,
        planets: [...state.planets, newPlanet],
        availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
      };
    }),

  // ✅ 선택된 행성 설정 함수
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

  // ✅ 버킷리스트 완료 처리 함수
  completePlanet: async (id) => {
    return new Promise<void>((resolve) => {
      set((state) => {
        const planetIndex = state.planets.findIndex((p) => p.id === id);
        if (planetIndex === -1) return state;

        const updatedPlanets = [...state.planets];
        const completedPlanet = { ...updatedPlanets[planetIndex], isCompleted: true };
        updatedPlanets.splice(planetIndex, 1);

        resolve();

        return {
          planets: updatedPlanets,
          completedPlanets: [...state.completedPlanets, completedPlanet],
          selectedPlanet: null,
        };
      });
    });
  },

  // ✅ 행성 위치 및 크기 설정 함수
  setPlanetPositionAndScale: (id, position, scale) =>
    set((state) => ({
      planetPositionsAndScales: {
        ...state.planetPositionsAndScales,
        [id]: state.planetPositionsAndScales[id] || { position, scale },
      },
    })),

  // ✅ 백엔드에서 버킷리스트 가져오기 함수
  fetchPlanets: async () => {
    try {
      // ✅ API에서 버킷리스트 가져오기
      const bucketLists: BucketList[] = await getBucketLists();
  
      // ✅ 가져온 데이터를 Zustand 상태로 변환
      const planets = bucketLists.map((bucket) => ({
        id: bucket._id,
        content: bucket.content,
        modelPath: bucket.modelPath,
        position: bucket.position,
        isCompleted: bucket.isCompleted,
        completedAt: bucket.completedAt,
      }));
  
      // ✅ Zustand 상태 업데이트
      set({ planets });
    } catch (error) {
      console.error('Failed to fetch planets:', error);
    }
  },
}));
