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

interface BucketList {
  content: string;
  isCompleted: boolean;
}


export default function Social() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [targetEmail, setTargetEmail] = useState("");
  const [friendBuckets, setFriendBuckets] = useState<BucketList[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleFriendClick = (friend: Friend) => {
    // 친구 클릭 시 친구 추가 화면 닫기
    setShowAddFriend(false);
    
    if (selectedFriend?.friend_email === friend.friend_email) {
      setSelectedFriend(null);
      setFriendBuckets([]);
    } else {
      fetchFriendBuckets(friend);
    }
  };
  

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(targetEmail);
      alert("친구 요청이 성공적으로 전송되었습니다!");
      setTargetEmail("");
    } catch (error) {
      alert("친구 요청 전송에 실패했습니다.");
    }
  };

  const handleAcceptRequest = async (requesterEmail: string) => {
    try {
      await acceptFriendRequest(requesterEmail);
      alert("친구 요청을 수락했습니다!");
      
      const acceptedRequest = friendRequests.find(
        (req) => req.request_email === requesterEmail
      );

      if (!acceptedRequest) return;

      setFriendRequests((prev) =>
        prev.filter((req) => req.request_email !== requesterEmail)
      );
      setFriends((prev) => [
        ...prev,
        {
          friend_name: acceptedRequest.request_name,
          friend_email: acceptedRequest.request_email,
        },
      ]);
    } catch (error) {
      alert("친구 요청 수락에 실패했습니다.");
    }
  };

  const handleRefuseRequest = async (requesterEmail: string) => {
    try {
      await refuseFriendRequest(requesterEmail);
      alert("친구 요청을 거절했습니다!");
      setFriendRequests((prev) =>
        prev.filter((req) => req.request_email !== requesterEmail)
      );
    } catch (error) {
      alert("친구 요청 거절에 실패했습니다.");
    }
  };

  const fetchFriendBuckets = async (friend: Friend) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
      const response = await fetch(
        `http://projecthailmary.site:3000/api/buckets/friend?friendEmail=${friend.friend_email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const buckets = await response.json();
        setFriendBuckets(buckets);
        setSelectedFriend(friend);
      } else {
        alert("친구의 버킷리스트를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching friend's bucket list:", error);
      alert("친구의 버킷리스트를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70">
      <div className="min-h-full pt-20 pb-10 px-8">
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          {/* 왼쪽 패널: 친구 목록 */}
          <div className="w-1/3 bg-white bg-opacity-20 rounded-[20px] flex flex-col mx-4">
            <h2 className="text-white text-xl p-6 inline-flex items-center">
              친구 목록
            </h2>
            
            {/* 친구 목록 (스크롤 가능) */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
              {friends.map((friend) => (
                <div
                  key={friend.friend_email}
                  onClick={() => handleFriendClick(friend)}
                  className={`mb-4 p-4 bg-white ${
                    selectedFriend?.friend_email === friend.friend_email
                      ? "bg-opacity-50 text-black text-lg"
                      : "bg-opacity-20 text-white text-lg"
                  } rounded-[20px] cursor-pointer transition-all`}
                >
                  {friend.friend_name} 👽
                </div>
              ))}
            </div>
  
            {/* 친구 추가 버튼 */}
            <div className="p-4 flex justify-center">
              <button
                onClick={() => {
                  setShowAddFriend(true);
                  setSelectedFriend(null);
                  setFriendBuckets([]);
                }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                친구 추가
              </button>
            </div>
          </div>
  
          {/* 오른쪽 패널: 버킷리스트 또는 친구 추가 */}
          <div className="flex-1 mx-4 h-full">
            {showAddFriend ? (
              <div className="h-full overflow-y-auto scrollbar-hide">
                {/* 친구 추가 섹션 */}
                <div className=" p-6 mb-6">
                  <h2 className="text-white text-xl mb-4">친구 추가</h2>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      value={targetEmail}
                      onChange={(e) => setTargetEmail(e.target.value)}
                      placeholder="이메일을 입력하세요"
                      className="flex-1 bg-transparent border border-white rounded-[12px] p-3 text-white placeholder-white"
                    />
                    <button
                      onClick={handleSendRequest}
                      className="bg-white bg-opacity-50 text-black px-6 py-2 rounded-[12px]"
                    >
                      Send
                    </button>
                  </div>
                </div>
  
                {/* 받은 요청 섹션 */}
                <div className=" p-6">
                  <h2 className="text-white text-xl mb-4">받은 요청</h2>
                  <div className="space-y-4">
                    {friendRequests.map((request) => (
                      <div
                        key={request.request_email}
                        className="bg-white bg-opacity-20 rounded-[20px] p-4 flex justify-between items-center"
                      >
                        <span className="text-white text-lg">
                          {request.request_name} 👽
                        </span>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleAcceptRequest(request.request_email)}
                            className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-[12px]"
                          >
                            수락
                          </button>
                          <button
                            onClick={() => handleRefuseRequest(request.request_email)}
                            className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-[12px]"
                          >
                            거절
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedFriend && (
              <div className="h-full flex flex-col">
                <h2 className="text-white text-xl mb-4 inline-flex items-center">
                  {selectedFriend.friend_name}님의 버킷리스트
                </h2>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <div className="space-y-4">
                    {friendBuckets.map((bucket, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-20 rounded-[20px] p-4 flex justify-between items-center"
                      >
                        <span className="text-white">{bucket.content}</span>
                        <span className="text-white">
                          {bucket.isCompleted ? "달성 ✨" : "진행중"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}