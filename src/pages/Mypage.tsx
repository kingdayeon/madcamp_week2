import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanetStore, Planet } from "../store/usePlanetStore";
import starIcon from '../assets/images/star.png'; // star.png import

interface User {
  name: string;
  email: string;
}

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [completedBuckets, setCompletedBuckets] = useState<Planet[]>([]);
  const fetchCompletedPlanets = usePlanetStore((state) => state.fetchCompletedPlanets);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://projecthailmary.site:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchCompleted = async () => {
      await fetchCompletedPlanets();
      const completed = usePlanetStore.getState().completedPlanets;
      setCompletedBuckets(completed);
    };

    fetchUser();
    fetchCompleted();
  }, [fetchCompletedPlanets]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-y-auto pointer-events-auto">
      <div className="min-h-full pt-20 pb-10 bg-black/70">
        <div className="container mx-auto px-8 py-8">
          {/* 상단 텍스트 */}
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl mb-2">{user.name}님 안녕하세요!</h1>
            <p className="text-white text-lg">{user.name}님이 모으신 별이에요 :)</p>
          </div>

          {/* 완료된 버킷리스트 목록 */}
          <div className="space-y-4">
            {completedBuckets.length === 0 ? (
              <p className="text-white text-center">아직 달성한 버킷리스트가 없습니다.</p>
            ) : (
              completedBuckets.map((bucket) => (
                <div 
                  key={bucket.id} 
                  className="bg-white/10 rounded-lg p-4 flex items-center gap-4"
                >
                  {/* star 이미지 표시 */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img 
                      src={starIcon} 
                      alt="Star" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* 버킷리스트 내용 */}
                  <div className="flex-1">
                    <p className="text-white text-xl">"{bucket.content}" 달성으로 수집되었어요 :)</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 로그아웃 버튼 */}
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleLogout}
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}