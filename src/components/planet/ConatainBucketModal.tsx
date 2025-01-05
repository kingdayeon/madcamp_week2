// components/planet/ConatainBucketModal.tsx
import { useState } from 'react';

const ConatainBucketModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleClose}
        >
          <div
            className="bg-white bg-opacity-30 p-6 rounded-xl w-[400px] max-w-full shadow-lg backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 text-center">
              <p className="text-white text-xl font-bold">버킷리스트입니다.</p>
              <button
                onClick={handleClose}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-40 transition-opacity"
              >
                달성!
              </button>
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white text-xl font-bold"
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConatainBucketModal;
