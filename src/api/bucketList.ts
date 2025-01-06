const API_URL = import.meta.env.VITE_API_URL; // 환경 변수로 API URL 설정

// 버킷리스트 생성 API
export const createBucketList = async (bucketData: {
  content: string;
  modelPath: string;
  position: { x: number; y: number; z: number };
}) => {
  const token = localStorage.getItem('token'); // 인증 토큰 가져오기
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/api/buckets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bucketData),
  });

  if (!response.ok) throw new Error('Failed to create bucket list');

  return response.json(); // 생성된 버킷리스트 객체 반환
};
