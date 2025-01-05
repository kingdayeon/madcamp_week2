
// import {create} from 'zustand';
// import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성 라이브러리

// interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
// }

// interface PlanetStore {
//   planets: Planet[];
//   availablePlanets: number[];
//   addPlanet: (content: string) => void;
// }

// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   addPlanet: (content) =>
//     set((state) => {
//       if (state.availablePlanets.length === 0) {
//         alert('모든 행성이 이미 생성되었습니다!');
//         return state;
//       }

//       const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
//       const planetNumber = state.availablePlanets[randomIndex];
//       const newPlanet = {
//         id: uuidv4(), // 고유 ID 추가
//         content,
//         modelPath: `/models/planet${planetNumber}.glb`,
//       };

//       return {
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     }),
// }));
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';

// // ✅ Planet 인터페이스 정의
// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean; // 선택 속성: 완료 여부
// }

// // ✅ Zustand 상태 인터페이스 정의
// export interface PlanetStore {
//   planets: Planet[];
//   availablePlanets: number[];
//   modalData: Planet | null;
//   addPlanet: (content: string) => void;
//   openModal: (planet: Planet) => void;
//   closeModal: () => void;
//   toggleComplete: (id: string) => void;
// }

// // ✅ Zustand 상태 관리 설정
// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   modalData: null,

//   // ✅ 행성 추가 함수
//   addPlanet: (content: string) => {
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

//       return {
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     });
//   },

//   // ✅ 모달 열기 함수
//   openModal: (planet: Planet) => set({ modalData: planet }),

//   // ✅ 모달 닫기 함수
//   closeModal: () => set({ modalData: null }),

//   // ✅ 완료 상태 토글 함수
//   toggleComplete: (id: string) =>
//     set((state) => ({
//       planets: state.planets.map((planet) =>
//         planet.id === id ? { ...planet, isCompleted: !planet.isCompleted } : planet
//       ),
//       modalData: state.modalData
//         ? { ...state.modalData, isCompleted: !state.modalData.isCompleted }
//         : null,
//     })),
// }));
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';

// // ✅ Planet 인터페이스 정의
// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean;
// }

// // ✅ Zustand 상태 인터페이스 정의
// export interface PlanetStore {
//   planets: Planet[];
//   availablePlanets: number[];
//   modalData: Planet | null;
//   selectedPlanetId: string | null; // ✅ 선택된 행성 ID 상태 추가
//   addPlanet: (content: string) => void;
//   openModal: (planet: Planet) => void;
//   closeModal: () => void;
//   setSelectedPlanet: (id: string | null) => void; // ✅ 선택된 행성 설정 함수 추가
//   togglePlanetComplete: (id: string) => void; // ✅ 완료 상태 토글 함수 추가
// }

// // ✅ Zustand 상태 관리 설정
// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   modalData: null,
//   selectedPlanetId: null, // ✅ 초기값 null

//   // ✅ 행성 추가 함수
//   addPlanet: (content: string) => {
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

//       return {
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     });
//   },

//   // ✅ 모달 열기 함수
//   openModal: (planet: Planet) => set({ modalData: planet }),

//   // ✅ 모달 닫기 함수
//   closeModal: () => set({ modalData: null }),

//   // ✅ 선택된 행성 설정 함수
//   setSelectedPlanet: (id: string | null) => set({ selectedPlanetId: id }),

//   // ✅ 완료 상태 토글 함수
//   togglePlanetComplete: (id: string) =>
//     set((state) => ({
//       planets: state.planets.map((planet) =>
//         planet.id === id ? { ...planet, isCompleted: !planet.isCompleted } : planet
//       ),
//     })),
// }));

// store/usePlanetStore.ts

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
export interface Planet {
  id: string;
  content: string;
  modelPath: string;
  isCompleted?: boolean;
}

export interface PlanetStore {
  planets: Planet[];
  availablePlanets: number[];
  selectedPlanet: Planet | null;
  addPlanet: (content: string) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  toggleComplete: (id: string) => void;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
  selectedPlanet: null,
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

      return {
        planets: [...state.planets, newPlanet],
        availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
      };
    }),
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  toggleComplete: (id) => 
    set((state) => ({
      planets: state.planets.map(planet => 
        planet.id === id 
          ? { ...planet, isCompleted: !planet.isCompleted }
          : planet
      )
    })),
}));