// src/components/bucketList/AddButton.tsx
import { useState } from 'react';
import AddBucketModal from './AddBucketModal';

export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full flex items-center justify-center transition-colors z-50"
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src="/src/assets/icons/mainButtonWhite.png" 
          alt="Add"
          className="w-16 h-16"
        />
      </button>
      <AddBucketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}