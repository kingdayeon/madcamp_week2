import { useState } from 'react';
import mainButtonWhite from '../assets/icons/mainButtonWhite.png';

export default function MySpace() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ pointerEvents: 'auto' }}>
      {/* Add Button */}
      <div className="fixed bottom-8 left-8 z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-16 h-16 flex items-center justify-center"
        >
          <img src={mainButtonWhite} alt="Add" className="w-full h-full" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white bg-opacity-30 p-6 rounded-lg w-96"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="text-white text-lg mb-2">내 버킷리스트 추가</div>
              <input
                type="text"
                placeholder="내용 작성"
                className="w-full p-2 rounded bg-transparent border border-white text-white placeholder-white"
              />
              <button 
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-30 transition-opacity"
              >
                To Space 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}