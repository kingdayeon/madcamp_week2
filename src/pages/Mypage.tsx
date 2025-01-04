import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}


export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        console.log("start /api/users/me");
        const response = await fetch("/api/users/me", {
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

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading user info...</div>;
  }

  return (
    <div className="w-full h-full bg-black/70">
      <div className="p-8">
        <h1 className="text-white text-2xl font-medium">{user.name}의 마이페이지</h1>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}