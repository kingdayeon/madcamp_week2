
// // import { usePlanetStore } from '../../store/usePlanetStore';

// // const ContainBucketModal = () => {
// //   // Zustand 스토어에서 상태 가져오기
// //   const { selectedPlanet, setSelectedPlanet } = usePlanetStore();

// //   // 모달 닫기 함수
// //   const handleClose = () => {
// //     setSelectedPlanet(null); // 선택된 행성 초기화 (모달 닫기)
// //   };

// //   // 선택된 행성이 없으면 모달을 렌더링하지 않음
// //   if (!selectedPlanet) return null;

// //   return (
// //     <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
// //       <div
// //         className="bg-white bg-opacity-30 p-6 rounded-xl w-full max-w-[400px] mx-auto shadow-lg backdrop-blur-md relative"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* 우측 상단 'X' 닫기 버튼 */}
// //         <span
// //           onClick={handleClose}
// //           className="absolute top-4 right-4 text-white text-sm font-bold cursor-pointer hover:text-opacity-70 transition"
// //         >
// //           X
// //         </span>

// //         {/* 버킷리스트 내용 표시 */}
// //         <div className="flex flex-col gap-4 text-center">
// //           <p className="text-white text-xl font-bold">{selectedPlanet.content}</p>

// //           {/* '달성' 버튼 */}
// //           <button
// //             className="bg-white bg-opacity-20 text-white font-bold px-4 py-2 rounded-lg hover:bg-opacity-40 transition-opacity"
// //           >
// //             달성! 🎉
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContainBucketModal;
// import { usePlanetStore } from '../../store/usePlanetStore';
// import { useState } from 'react';

// const ContainBucketModal = () => {
//   const { selectedPlanet, setSelectedPlanet, completePlanet } = usePlanetStore();
//   // completingPlanetId를 추가하여 어떤 행성이 완료 중인지 추적
//   const [completingPlanetId, setCompletingPlanetId] = useState<string | null>(null);

//   // 모달 닫기 함수
//   const handleClose = () => {
//     setSelectedPlanet(null);
//   };

//   // 달성 처리 함수
//   const handleComplete = () => {
//     if (!selectedPlanet) return;
    
//     // 현재 선택된 행성의 ID만 완료 상태로 설정
//     setCompletingPlanetId(selectedPlanet.id);
    
//     setTimeout(() => {
//       completePlanet(selectedPlanet.id);
//       setCompletingPlanetId(null); // 완료 후 상태 초기화
//     }, 500);
//   };

//   // 선택된 행성이 없으면 모달을 렌더링하지 않음
//   if (!selectedPlanet) return null;

//   // 현재 선택된 행성이 완료 중인지 확인
//   const isCompleting = completingPlanetId === selectedPlanet.id;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
//       <div
//         className={`bg-white bg-opacity-30 p-6 rounded-xl w-full max-w-[400px] mx-auto shadow-lg backdrop-blur-md relative
//           ${isCompleting ? 'animate-fadeOut' : 'animate-fadeIn'}`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <span
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-white text-sm font-bold cursor-pointer hover:text-opacity-70 transition"
//         >
//           X
//         </span>

//         <div className="flex flex-col gap-4 text-center">
//           <p className="text-white text-xl font-bold">{selectedPlanet.content}</p>

//           <button
//             onClick={handleComplete}
//             className={`bg-white bg-opacity-20 text-white font-bold px-4 py-2 rounded-lg 
//               hover:bg-opacity-40 transition-all duration-300
//               ${isCompleting ? 'scale-110 bg-green-500 bg-opacity-50' : ''}`}
//             disabled={isCompleting}
//           >
//             {isCompleting ? '달성 완료! 🎉' : '달성! 🚀'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContainBucketModal;

import { usePlanetStore } from '../../store/usePlanetStore';

const ContainBucketModal = () => {
  const { selectedPlanet, setSelectedPlanet, completePlanet, completedPlanets } = usePlanetStore();

  // 모달 닫기 함수
  const handleClose = () => {
    setSelectedPlanet(null);
  };

  // // 달성 처리 함수
  // const handleComplete = () => {
  //   if (!selectedPlanet) return;
  //   completePlanet(selectedPlanet.id);
  //   setSelectedPlanet(null); // 달성 후 모달 닫기
  // };

  const handleComplete = async () => {
    if (!selectedPlanet) return;
  
    // 상태 업데이트 후 모달 닫기
    await completePlanet(selectedPlanet.id);
    setSelectedPlanet(null);
  };
  

  // 선택된 행성이 없으면 모달을 렌더링하지 않음
  if (!selectedPlanet) return null;

  // 현재 선택된 행성이 완료 상태인지 확인
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
            disabled={isCompleted}
          >
            {isCompleted ? '달성 완료! 🎉' : '달성! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainBucketModal;
