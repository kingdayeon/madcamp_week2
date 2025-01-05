import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';

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
  planetPositionsAndScales: { [key: string]: { position: THREE.Vector3; scale: number } };
  addPlanet: (content: string) => void;
  setSelectedPlanet: (planet: Planet | null) => void;
  completePlanet: (id: string) => Promise<void>;
  setPlanetPositionAndScale: (id: string, position: THREE.Vector3, scale: number) => void;
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  completedPlanets: [],
  availablePlanets: Array.from({ length: 16 }, (_, i) => i + 1),
  selectedPlanet: null,
  planetPositionsAndScales: {},

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
  
  
  setPlanetPositionAndScale: (id, position, scale) =>
    set((state) => ({
      planetPositionsAndScales: {
        ...state.planetPositionsAndScales,
        [id]: state.planetPositionsAndScales[id] || { position, scale },
      },
    })),
}));
