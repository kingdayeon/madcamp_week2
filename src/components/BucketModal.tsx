// // components/BucketModal.tsx
// import { usePlanetStore } from '../store/usePlanetStore';

// export default function BucketModal() {
//   const selectedPlanetId = usePlanetStore(state => state.selectedPlanetId);
//   const planets = usePlanetStore(state => state.planets);
//   const togglePlanetComplete = usePlanetStore(state => state.togglePlanetComplete);
//   const setSelectedPlanet = usePlanetStore(state => state.setSelectedPlanet);

//   const selectedPlanet = planets.find(p => p.id === selectedPlanetId);

//   if (!selectedPlanet) return null;

//   return (
//     <div 
//       className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 z-50"
//       onClick={e => e.stopPropagation()}
//     >
//       <div className="bg-white bg-opacity-30 p-6 rounded-lg w-96 backdrop-blur-sm">
//         <div className="flex items-center justify-between gap-4">
//           <div className="text-white text-lg flex-grow">{selectedPlanet.content}</div>
//           <button
//             onClick={() => togglePlanetComplete(selectedPlanet.id)}
//             className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-colors
//               ${selectedPlanet.isCompleted ? 'bg-white' : 'bg-transparent'}`}
//           >
//             {selectedPlanet.isCompleted && (
//               <span className="text-black">✓</span>
//             )}
//           </button>
//           <button
//             onClick={() => setSelectedPlanet(null)}
//             className="ml-4 text-white opacity-70 hover:opacity-100"
//           >
//             ✕
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/BucketModal.tsx
import { usePlanetStore } from '../store/usePlanetStore';

export default function BucketModal() {
  const selectedPlanet = usePlanetStore(state => state.selectedPlanet);
  // const planets = usePlanetStore(state => state.planets);
  const completePlanet = usePlanetStore(state => state.completePlanet);
  const setSelectedPlanet = usePlanetStore(state => state.setSelectedPlanet);

  if (!selectedPlanet) return null;

  return (
    <div 
      className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 z-50"
      onClick={e => e.stopPropagation()}
    >
      <div className="bg-white bg-opacity-30 p-6 rounded-lg w-96 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="text-white text-lg flex-grow">{selectedPlanet.content}</div>
          <button
            onClick={() => completePlanet(selectedPlanet.id)}
            className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-colors bg-transparent hover:bg-white hover:bg-opacity-20"
          >
            ✓
          </button>
          <button
            onClick={() => setSelectedPlanet(null)}
            className="ml-4 text-white opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}