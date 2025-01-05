import { useState } from 'react';
import { usePlanetStore } from '../../store/usePlanetStore';

const ContainBucketModal = () => {
  const { selectedPlanet, setSelectedPlanet, completePlanet, completedPlanets } = usePlanetStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setSelectedPlanet(null);
  };

  const handleComplete = async () => {
    if (!selectedPlanet || isProcessing) return;

    setIsProcessing(true);
    await completePlanet(selectedPlanet.id);
    setSelectedPlanet(null);
    setIsProcessing(false);
  };

  if (!selectedPlanet) return null;

  const isCompleted = completedPlanets.some((p) => p.id === selectedPlanet.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div
        className="bg-white bg-opacity-30 p-6 rounded-xl w-full max-w-[400px] mx-auto shadow-lg backdrop-blur-md relative"
      >
        <span
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-sm font-bold cursor-pointer hover:text-opacity-70 transition"
        >
          X
        </span>

        <div className="flex flex-col gap-4 text-center">
          <p className="text-white text-xl font-bold">{selectedPlanet.content}</p>

          <button
            onClick={handleComplete}
            className={`bg-white bg-opacity-20 text-white font-bold px-4 py-2 rounded-lg 
              hover:bg-opacity-40 transition-all duration-300
              ${isCompleted ? 'bg-green-500 bg-opacity-50' : ''}`}
            disabled={isProcessing || isCompleted}
          >
            {isCompleted ? '달성 완료! 🎉' : '달성! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainBucketModal;
