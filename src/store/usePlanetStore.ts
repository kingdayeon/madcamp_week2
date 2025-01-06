// // import { create } from 'zustand';
// // import { v4 as uuidv4 } from 'uuid';
// // import * as THREE from 'three';

// // import { createBucketList } from '../api/bucketList'; // API 함수 추가

// // export interface Planet {
// //   id: string;
// //   content: string;
// //   modelPath: string;
// //   isCompleted?: boolean;
// // }

// // export interface PlanetStore {
// //   planets: Planet[];
// //   completedPlanets: Planet[];
// //   availablePlanets: number[];
// //   selectedPlanet: Planet | null;
// //   planetPositionsAndScales: { [key: string]: { position: THREE.Vector3; scale: number } };
// //   addPlanet: (content: string) => void;
// //   setSelectedPlanet: (planet: Planet | null) => void;
// //   completePlanet: (id: string) => Promise<void>;
// //   setPlanetPositionAndScale: (id: string, position: THREE.Vector3, scale: number) => void;
// // }

// // export const usePlanetStore = create<PlanetStore>((set) => ({
// //   planets: [],
// //   completedPlanets: [],
// //   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
// //   selectedPlanet: null,
// //   planetPositionsAndScales: {},


// // addPlanet: async (content) => {
// //   set((state) => {
// //     if (state.availablePlanets.length === 0) {
// //       alert('모든 행성이 이미 생성되었습니다!');
// //       return state;
// //     }

// //     const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
// //     const planetNumber = state.availablePlanets[randomIndex];

// //     const newPlanet: Planet = {
// //       id: uuidv4(),
// //       content,
// //       modelPath: `/models/planet${planetNumber}.glb`,
// //     };

// //     // ✅ 백엔드에 데이터 저장
// //     createBucketList({
// //       content: newPlanet.content,
// //       modelPath: newPlanet.modelPath,
// //       position: {
// //         x: Math.random() * 20 - 10,
// //         y: Math.random() * 20 - 10,
// //         z: Math.random() * 20 - 10,
// //       },
// //     }).catch((error) => {
// //       console.error('버킷리스트 생성 실패:', error);
// //     });

// //     return {
// //       ...state,
// //       planets: [...state.planets, newPlanet],
// //       availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
// //     };
// //   });
// // },

// //   setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
// //   completePlanet: async (id) => {
// //     return new Promise<void>((resolve) => {
// //       set((state) => {
// //         const planetIndex = state.planets.findIndex((p) => p.id === id);
// //         if (planetIndex === -1) return state;
  
// //         const updatedPlanets = [...state.planets];
// //         const completedPlanet = { ...updatedPlanets[planetIndex], isCompleted: true };
// //         updatedPlanets.splice(planetIndex, 1);
  
// //         resolve();
  
// //         return {
// //           planets: updatedPlanets,
// //           completedPlanets: [...state.completedPlanets, completedPlanet],
// //           selectedPlanet: null,
// //         };
// //       });
// //     });
// //   },
  
  
// //   setPlanetPositionAndScale: (id, position, scale) =>
// //     set((state) => ({
// //       planetPositionsAndScales: {
// //         ...state.planetPositionsAndScales,
// //         [id]: state.planetPositionsAndScales[id] || { position, scale },
// //       },
// //     })),
// // }));
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
// import * as THREE from 'three';

// import { createBucketList, getBucketLists } from '../api/bucketList'; // ✅ API 함수 추가

// // 행성 타입 정의
// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean;
// }

// interface BucketList {
//   _id: string;
//   content: string;
//   modelPath: string;
//   position: {
//     x: number;
//     y: number;
//     z: number;
//   };
//   isCompleted?: boolean;
//   completedAt?: Date;
// }


// // Zustand 스토어 타입 정의
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
//   fetchPlanets: () => Promise<void>; // ✅ 새 함수 추가
// }

// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   completedPlanets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   selectedPlanet: null,
//   planetPositionsAndScales: {},

//   // ✅ 랜덤 행성 추가 함수 (백엔드 저장 포함)
//   addPlanet: (content) =>
//     set((state) => {
//       if (state.availablePlanets.length === 0) {
//         alert('모든 행성이 이미 생성되었습니다!');
//         return state;
//       }

//       const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
//       const planetNumber = state.availablePlanets[randomIndex];

//       const newPlanet: Planet = {
//         id: uuidv4(),
//         content,
//         modelPath: `/models/planet${planetNumber}.glb`,
//       };

//       // ✅ 백엔드에 버킷리스트 저장
//       createBucketList({
//         content: newPlanet.content,
        
//           modelPath: newPlanet.modelPath,
      
//         position: {
//           x: Math.random() * 20 - 10,
//           y: Math.random() * 20 - 10,
//           z: Math.random() * 20 - 10,
//         },
//       }).catch((error) => {
//         console.error('버킷리스트 생성 실패:', error);
//       });

//       return {
//         ...state,
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     }),

//   // ✅ 선택된 행성 설정 함수
//   setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

//   // ✅ 버킷리스트 완료 처리 함수
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

//   // ✅ 행성 위치 및 크기 설정 함수
//   setPlanetPositionAndScale: (id, position, scale) =>
//     set((state) => ({
//       planetPositionsAndScales: {
//         ...state.planetPositionsAndScales,
//         [id]: state.planetPositionsAndScales[id] || { position, scale },
//       },
//     })),

//   // ✅ 백엔드에서 버킷리스트 가져오기 함수
//   fetchPlanets: async () => {
//     try {
//       // ✅ API에서 버킷리스트 가져오기
//       const bucketLists: BucketList[] = await getBucketLists();
  
//       // ✅ 가져온 데이터를 Zustand 상태로 변환
//       const planets = bucketLists.map((bucket) => ({
//         id: bucket._id,
//         content: bucket.content,
//         modelPath: bucket.modelPath,
//         position: bucket.position,
//         isCompleted: bucket.isCompleted,
//         completedAt: bucket.completedAt,
//       }));
  
//       // ✅ Zustand 상태 업데이트
//       set({ planets });
//     } catch (error) {
//       console.error('Failed to fetch planets:', error);
//     }
//   },

  
// }));
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';

// // import * as THREE from 'three';

// import {
//   createBucketList,
//   getBucketLists,
//   completeBucket,
//   getCompletedBuckets,
// } from '../api/bucketList';

// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean;
// }

// interface BucketList {
//   _id: string;
//   content: string;
//   modelPath: string;
//   position: {
//     x: number;
//     y: number;
//     z: number;
//   };
//   isCompleted?: boolean;
//   completedAt?: Date;
// }

// export interface PlanetStore {
//   planets: Planet[];
//   completedPlanets: Planet[];
//   addPlanet: (content: string) => void;
//   completePlanet: (id: string) => Promise<void>;
//   fetchPlanets: () => Promise<void>;
//   fetchCompletedPlanets: () => Promise<void>;
// }

// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   completedPlanets: [],

//   // ✅ 랜덤 행성 추가 함수
//   addPlanet: async (content) => {
//     const newPlanet = {
//       id: uuidv4(),
//       content,
//       modelPath: `/models/planet${Math.floor(Math.random() * 16) + 1}.glb`,
//     };

//     await createBucketList({
//       content: newPlanet.content,
//       modelPath: newPlanet.modelPath,
//       position: {
//         x: Math.random() * 20 - 10,
//         y: Math.random() * 20 - 10,
//         z: Math.random() * 20 - 10,
//       },
//     });

//     set((state) => ({
//       planets: [...state.planets, newPlanet],
//     }));
//   },

//   // ✅ 버킷리스트 완료 상태 변경
//   completePlanet: async (id) => {
//     try {
//       // ✅ 백엔드 API 호출 (분리된 함수 사용)
//       await completeBucket(id);
  
//       // ✅ 완료된 행성 상태 업데이트
//       set((state) => {
//         const planetToComplete = state.planets.find((planet) => planet.id === id);
  
//         if (!planetToComplete) return state; // planet이 undefined인 경우 종료
  
//         return {
//           planets: state.planets.filter((planet) => planet.id !== id),
//           completedPlanets: [...state.completedPlanets, planetToComplete],
//         };
//       });
//     } catch (error) {
//       console.error('버킷리스트 완료 실패:', error);
//     }
//   },
  

//   // ✅ 모든 버킷리스트 가져오기
//   fetchPlanets: async () => {
//     try {
//       const bucketLists: BucketList[] = await getBucketLists(); // ✅ API에서 데이터 가져오기
  
//       set({
//         planets: bucketLists.map((bucket) => ({
//           id: bucket._id,
//           content: bucket.content,
//           modelPath: bucket.modelPath,
//           position: bucket.position,
//           isCompleted: bucket.isCompleted,
//         })),
//       });
//     } catch (error) {
//       console.error('Failed to fetch planets:', error);
//     }
//   },

//   // ✅ 완료된 버킷리스트 가져오기
//   fetchCompletedPlanets: async () => {
//     const completedBuckets = await getCompletedBuckets();

//     set({
//       completedPlanets: completedBuckets,
//     });
//   },

  
// }));
import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
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
