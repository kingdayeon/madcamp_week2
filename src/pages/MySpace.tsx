
import { useState, useEffect } from 'react';
import mainButtonWhite from '../assets/icons/mainButtonWhite.png';
import { usePlanetStore } from '../store/usePlanetStore';
interface MySpaceProps {
  addPlanet: (content: string) => void; // 행성 추가 콜백 함수
}

export default function MySpace({ addPlanet }: MySpaceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bucketContent, setBucketContent] = useState('');

  // Zustand 스토어에서 fetchPlanets 함수 가져오기
  const fetchPlanets = usePlanetStore((state) => state.fetchPlanets);

  useEffect(() => {
    fetchPlanets(); // 페이지 로드 시 사용자의 행성 데이터를 가져옴
  }, [fetchPlanets]);

  const handleAddToSpace = async () => {
    if (bucketContent.trim()) {
      try {
        await addPlanet(bucketContent); // ✅ 이제 비동기 함수로 변경
        setBucketContent('');
        setIsModalOpen(false);
      } catch (error) {
        console.error('버킷리스트 추가 실패:', error);
        alert('버킷리스트 추가에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };
  

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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <div className="text-white text-lg mb-2">내 버킷리스트 추가</div>
              <input
                type="text"
                placeholder="내용 작성"
                value={bucketContent}
                onChange={(e) => setBucketContent(e.target.value)}
                className="w-full p-2 rounded bg-transparent border border-white text-white placeholder-white"
              />
              <button
                onClick={handleAddToSpace}
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
