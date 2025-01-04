// import {create} from 'zustand';

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
//   availablePlanets: Array.from({ length: 12 }, (_, i) => i + 1),
//   addPlanet: (content) =>
//     set((state) => {
//       if (state.availablePlanets.length === 0) {
//         alert('모든 행성이 이미 생성되었습니다!');
//         return state;
//       }

//       const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
//       const planetNumber = state.availablePlanets[randomIndex];
//       const newPlanet = {
//         id: Date.now().toString(),
//         content,
//         modelPath: `/models/planet${planetNumber}.glb`,
//       };

//       return {
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     }),
// }));
import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성 라이브러리

interface Planet {
  id: string;
  content: string;
  modelPath: string;
}

interface PlanetStore {
  planets: Planet[];
  availablePlanets: number[];
  addPlanet: (content: string) => void;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
  addPlanet: (content) =>
    set((state) => {
      if (state.availablePlanets.length === 0) {
        alert('모든 행성이 이미 생성되었습니다!');
        return state;
      }

      const randomIndex = Math.floor(Math.random() * state.availablePlanets.length);
      const planetNumber = state.availablePlanets[randomIndex];
      const newPlanet = {
        id: uuidv4(), // 고유 ID 추가
        content,
        modelPath: `/models/planet${planetNumber}.glb`,
      };

      return {
        planets: [...state.planets, newPlanet],
        availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
      };
    }),
}));
