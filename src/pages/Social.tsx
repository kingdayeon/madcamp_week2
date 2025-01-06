import { useEffect, useState } from "react";
import {
  fetchFriends,
  fetchFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  refuseFriendRequest,
} from "../api/social";

interface Friend {
  friend_name: string;
  friend_email: string;
}

interface FriendRequest {
  request_name: string;
  request_email: string;
}

export default function Social() {
  const [isVisible, setIsVisible] = useState(false); // 창 가시성 상태
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [targetEmail, setTargetEmail] = useState("");

  useEffect(() => {
    if (!isVisible) return; // 창이 열렸을 때만 데이터를 가져옴

    const fetchData = async () => {
      try {
        const [friendsData, requestsData] = await Promise.all([
          fetchFriends(),
          fetchFriendRequests(),
        ]);
        setFriends(friendsData);
        setFriendRequests(requestsData);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };

    fetchData();
  }, [isVisible]);

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(targetEmail);
      alert("친구 요청이 성공적으로 전송되었습니다!");
      setTargetEmail(""); // 입력 필드 초기화
    } catch (error) {
      alert("친구 요청 전송에 실패했습니다.");
    }
  };

  const handleAcceptRequest = async (requesterEmail: string) => {
    try {
      await acceptFriendRequest(requesterEmail);
      alert("친구 요청을 수락했습니다!");

      // 친구 목록과 요청 목록 업데이트
      setFriendRequests((prev) =>
        prev.filter((req) => req.request_email !== requesterEmail)
      );
      setFriends((prev) => [
        ...prev,
        { friend_name: "친구 이름", friend_email: requesterEmail },
      ]);
    } catch (error) {
      alert("친구 요청 수락에 실패했습니다.");
    }
  };

  const handleRefuseRequest = async (requesterEmail: string) => {
    try {
      await refuseFriendRequest(requesterEmail);
      alert("친구 요청을 거절했습니다!");

      // 친구 목록과 요청 목록 업데이트
      setFriendRequests((prev) =>
        prev.filter((req) => req.request_email !== requesterEmail)
      );
    } catch (error) {
      alert("친구 요청 거절에 실패했습니다.");
    }
  };

  return (
    <>
      {/* 열고 닫는 버튼 */}
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded z-50 shadow-md"
      >
        {isVisible ? "닫기" : "친구 관리"}
      </button>

      {/* 친구 관리 창 */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/70 z-40 overflow-y-auto">
          <div className="p-8">
            <h1 className="text-white text-2xl font-medium">친구 관리</h1>
          </div>

          {/* 친구 목록 */}
          <div className="p-8">
            <h2 className="text-white text-xl font-bold">친구 목록</h2>
            {friends.length === 0 ? (
              <p className="text-white">현재 친구가 없습니다.</p>
            ) : (
              <ul className="text-white">
                {friends.map((friend) => (
                  <li
                    key={friend.friend_email}
                    className="p-2 bg-white bg-opacity-20 rounded-lg my-2"
                  >
                    {friend.friend_name} ({friend.friend_email})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 친구 요청 목록 */}
          <div className="p-8">
            <h2 className="text-white text-xl font-bold">받은 친구 요청</h2>
            {friendRequests.length === 0 ? (
              <p className="text-white">받은 친구 요청이 없습니다.</p>
            ) : (
              <ul className="text-white">
                {friendRequests.map((request) => (
                  <li
                    key={request.request_email}
                    className="p-2 bg-white bg-opacity-20 rounded-lg my-2"
                  >
                    {request.request_name} ({request.request_email}){" "}
                    <button
                      onClick={() => handleAcceptRequest(request.request_email)}
                      className="bg-blue-500 text-white px-2 py-1 rounded ml-4"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => handleRefuseRequest(request.request_email)}
                      className="bg-blue-500 text-white px-2 py-1 rounded ml-4"
                    >
                      거절
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 친구 요청 보내기 */}
          <div className="p-8">
            <h2 className="text-white text-xl font-bold">친구 요청 보내기</h2>
            <div className="flex gap-4 items-center">
              <input
                type="email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                placeholder="친구 이메일 입력"
                className="p-2 rounded bg-transparent border border-white text-white placeholder-white w-full"
              />
              <button
                onClick={handleSendRequest}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                요청 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}