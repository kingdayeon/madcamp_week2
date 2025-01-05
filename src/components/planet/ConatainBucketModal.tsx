
// import { usePlanetStore } from '../../store/usePlanetStore';

// const ContainBucketModal = () => {
//   // Zustand 스토어에서 상태 가져오기
//   const { selectedPlanet, setSelectedPlanet } = usePlanetStore();

//   // 모달 닫기 함수
//   const handleClose = () => {
//     setSelectedPlanet(null); // 선택된 행성 초기화 (모달 닫기)
//   };

//   // 선택된 행성이 없으면 모달을 렌더링하지 않음
//   if (!selectedPlanet) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
//       <div
//         className="bg-white bg-opacity-30 p-6 rounded-xl w-full max-w-[400px] mx-auto shadow-lg backdrop-blur-md"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex flex-col gap-4 text-center">
//           {/* 버킷리스트 내용 표시 */}
//           <p className="text-white text-xl font-bold">{selectedPlanet.content}</p>

//           {/* '달성' 버튼 */}
//           <button
//             className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-40 transition-opacity"
//           >
//             달성!
//           </button>

//           {/* X 버튼 */}
//           <button
//             onClick={handleClose}
//             className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-40 transition-opacity"
//           >
//             ✖
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContainBucketModal;
import { usePlanetStore } from '../../store/usePlanetStore';

const ContainBucketModal = () => {
  // Zustand 스토어에서 상태 가져오기
  const { selectedPlanet, setSelectedPlanet } = usePlanetStore();

  // 모달 닫기 함수
  const handleClose = () => {
    setSelectedPlanet(null); // 선택된 행성 초기화 (모달 닫기)
  };

  // 선택된 행성이 없으면 모달을 렌더링하지 않음
  if (!selectedPlanet) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div
        className="bg-white bg-opacity-30 p-6 rounded-xl w-full max-w-[400px] mx-auto shadow-lg backdrop-blur-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 우측 상단 'X' 닫기 버튼 */}
        <span
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-sm font-bold cursor-pointer hover:text-opacity-70 transition"
        >
          X
        </span>

        {/* 버킷리스트 내용 표시 */}
        <div className="flex flex-col gap-4 text-center">
          <p className="text-white text-xl font-bold">{selectedPlanet.content}</p>

          {/* '달성' 버튼 */}
          <button
            className="bg-white bg-opacity-20 text-white font-bold px-4 py-2 rounded-lg hover:bg-opacity-40 transition-opacity"
          >
            달성! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainBucketModal;
