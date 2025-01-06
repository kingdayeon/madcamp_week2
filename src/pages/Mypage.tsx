// // import { useEffect, useState } from "react";

// // interface User {
// //   name: string;
// //   email: string;
// // }


// // export default function MyPage() {
// //   const [user, setUser] = useState<User | null>(null);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) return;

// //       try {
// //         console.log("start /api/users/me");
// //         const response = await fetch("http://projecthailmary.site:3000/api/users/me", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (response.ok) {
// //           const userData = await response.json();
// //           setUser(userData);
// //         } else {
// //           console.error("Failed to fetch user data");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user:", error);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   if (!user) {
// //     return <div>Loading user info...</div>;
// //   }

// //   return (
// //     <div className="w-full h-full bg-black/70">
// //       <div className="p-8">
// //         <h1 className="text-white text-2xl font-medium">{user.name}의 마이페이지</h1>
// //         <p className="text-white text-2xl font-medium">Email: {user.email}</p>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { usePlanetStore, Planet } from "../store/usePlanetStore"; // ✅ Zustand 스토어 import

// interface User {
//   name: string;
//   email: string;
// }

// export default function MyPage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [completedBuckets, setCompletedBuckets] = useState<Planet[]>([]); // ✅ 타입 지정

//   // ✅ Zustand의 fetchCompletedPlanets 함수 호출
//   const fetchCompletedPlanets = usePlanetStore((state) => state.fetchCompletedPlanets);

//   // ✅ 마이페이지 로드 시 사용자 정보와 완료된 버킷리스트 가져오기
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         console.log("start /api/users/me");
//         const response = await fetch("http://projecthailmary.site:3000/api/users/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         } else {
//           console.error("Failed to fetch user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     // ✅ 완료된 버킷리스트 가져오기
//     const fetchCompleted = async () => {
//       await fetchCompletedPlanets();
//       const completed = usePlanetStore.getState().completedPlanets;
//       setCompletedBuckets(completed); // ✅ 타입 일치
//     };

//     fetchUser();
//     fetchCompleted();
//   }, [fetchCompletedPlanets]);

//   if (!user) {
//     return <div>Loading user info...</div>;
//   }

//   return (
//     <div className="w-full h-full bg-black/70">
//       <div className="p-8">
//         <h1 className="text-white text-2xl font-medium">{user.name}의 마이페이지</h1>
//         <p className="text-white text-2xl font-medium">Email: {user.email}</p>
//       </div>

//       {/* ✅ 완료된 버킷리스트 목록 */}
//       <div className="p-8">
//         <h2 className="text-white text-xl font-bold">완료된 버킷리스트 🎉</h2>
//         {completedBuckets.length === 0 ? (
//           <p className="text-white">완료된 버킷리스트가 없습니다.</p>
//         ) : (
//           <ul className="text-white">
//             {completedBuckets.map((bucket) => (
//               <li key={bucket.id} className="p-2 bg-white bg-opacity-20 rounded-lg my-2">
//                 {bucket.content}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { usePlanetStore,Planet } from "../store/usePlanetStore"; // ✅ Zustand 스토어 import

interface User {
  name: string;
  email: string;
}

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [completedBuckets, setCompletedBuckets] = useState<Planet[]>([]); // ✅ 타입 지정

  // ✅ Zustand의 fetchCompletedPlanets 함수 호출
  const fetchCompletedPlanets = usePlanetStore((state) => state.fetchCompletedPlanets);

  // ✅ 마이페이지 로드 시 사용자 정보와 완료된 버킷리스트 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log("start /api/users/me");
        const response = await fetch("http://projecthailmary.site:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // ✅ 완료된 버킷리스트 가져오기
    const fetchCompleted = async () => {
      await fetchCompletedPlanets();
      const completed = usePlanetStore.getState().completedPlanets;
      setCompletedBuckets(completed); // ✅ 타입 일치
    };

    fetchUser();
    fetchCompleted();
  }, [fetchCompletedPlanets]);

  if (!user) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="w-full h-full bg-black/70">
      <div className="p-8">
        <h1 className="text-white text-2xl font-medium">{user.name}의 마이페이지</h1>
        <p className="text-white text-2xl font-medium">Email: {user.email}</p>
      </div>

      {/* ✅ 완료된 버킷리스트 목록 */}
      <div className="p-8">
        <h2 className="text-white text-xl font-bold">완료된 버킷리스트 🎉</h2>
        {completedBuckets.length === 0 ? (
          <p className="text-white">완료된 버킷리스트가 없습니다.</p>
        ) : (
          <ul className="text-white">
            {completedBuckets.map((bucket) => (
              <li key={bucket.id} className="p-2 bg-white bg-opacity-20 rounded-lg my-2">
                {bucket.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
