import { useState } from 'react';
import { usePlanetStore } from '../../store/usePlanetStore';

interface ContainBucketModalProps {
  onComplete: () => void;
}

const ContainBucketModal = ({ onComplete }: ContainBucketModalProps) => {
  const { selectedPlanet, setSelectedPlanet, completePlanet, deletePlanet, completedPlanets } = usePlanetStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setSelectedPlanet(null);
  };

  const handleComplete = async () => {
    if (!selectedPlanet || isProcessing) return;
  
    try {
      setIsProcessing(true);
      await completePlanet(selectedPlanet.id);
      onComplete();  // 별똥별 효과 트리거
    } catch (error) {
      console.error('Failed to complete planet:', error);
      // 에러 처리
    } finally {
      setIsProcessing(false);
      setSelectedPlanet(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedPlanet || isProcessing) return;

    try {
      setIsProcessing(true);
      await deletePlanet(selectedPlanet.id);
    } catch (err) {
      console.error('Failed to delete planet:', err);
    } finally {
      setIsProcessing(false);
      setSelectedPlanet(null);
    }
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
          <button
            onClick={handleDelete}
            className={`bg-white bg-opacity-20 text-white font-bold px-4 py-2 rounded-lg 
              hover:bg-opacity-40 transition-all duration-300
              ${isCompleted ? 'bg-green-500 bg-opacity-50' : ''}`}
            disabled={isProcessing || isCompleted}
          >
            { '삭제하기' }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainBucketModal;
