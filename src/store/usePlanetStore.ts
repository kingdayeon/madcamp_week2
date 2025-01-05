
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';

// export interface Planet {
//   id: string;
//   content: string;
//   modelPath: string;
//   isCompleted?: boolean;
// }

// export interface PlanetStore {
//   planets: Planet[];
//   availablePlanets: number[];
//   selectedPlanet: Planet | null;
//   addPlanet: (content: string) => void;
//   setSelectedPlanet: (planet: Planet | null) => void;
//   toggleComplete: (id: string) => void;
// }



// export const usePlanetStore = create<PlanetStore>((set) => ({
//   planets: [],
//   availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
//   selectedPlanet: null,

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

//       return {
//         planets: [...state.planets, newPlanet],
//         availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
//       };
//     }),

//   setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

//   toggleComplete: (id) =>
//     set((state) => ({
//       planets: state.planets.map((planet) =>
//         planet.id === id ? { ...planet, isCompleted: !planet.isCompleted } : planet
//       ),
//     })),
// }));
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
  completedPlanets: Planet[];
  availablePlanets: number[];
  selectedPlanet: Planet | null;
  addPlanet: (content: string) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  completePlanet: (id: string) => void;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  completedPlanets: [], 
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
        ...state,
        planets: [...state.planets, newPlanet],
        availablePlanets: state.availablePlanets.filter((num) => num !== planetNumber),
      };
    }),

  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

  completePlanet: (id) =>
    set((state) => {
      const planetToComplete = state.planets.find(p => p.id === id);
      if (!planetToComplete) return state;

      return {
        ...state,
        planets: state.planets.filter(p => p.id !== id),
        completedPlanets: [...state.completedPlanets, { ...planetToComplete, isCompleted: true }],
        selectedPlanet: null
      };
    }),
}));