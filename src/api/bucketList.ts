// const API_URL = import.meta.env.VITE_API_URL; // 환경 변수로 API URL 설정

// // 버킷리스트 생성 API
// export const createBucketList = async (bucketData: {
//   content: string;
//   modelPath: string;
//   position: { x: number; y: number; z: number };
// }) => {
//   const token = localStorage.getItem('token'); // 인증 토큰 가져오기
//   if (!token) throw new Error('No token found');

//   const response = await fetch(`${API_URL}/api/buckets`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bucketData),
//   });

//   if (!response.ok) throw new Error('Failed to create bucket list');

//   return response.json(); // 생성된 버킷리스트 객체 반환
// };

// // 버킷리스트 가져오기
// export const getBucketLists = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) throw new Error('No token found');

//   const response = await fetch(`${API_URL}/api/buckets`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch bucket lists');
//   }

//   return response.json();
// };

const API_URL = import.meta.env.VITE_API_URL; // 환경 변수로 API URL 설정

// ✅ 버킷리스트 생성 API
export const createBucketList = async (bucketData: {
  content: string;
  modelPath: string;
  position: { x: number; y: number; z: number };
}) => {
  const token = localStorage.getItem('token');
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

  return response.json();
};


// ✅ 모든 버킷리스트 가져오기
export const getBucketLists = async (completed?: boolean) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  // ✅ 완료 상태에 따라 필터링
  const queryParam = completed !== undefined ? `?completed=${completed}` : '';
  const response = await fetch(`${API_URL}/api/buckets${queryParam}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch bucket lists');

  return response.json();
};


// ✅ 버킷리스트 완료 상태 변경 API
export const completeBucket = async (id: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/api/buckets/${id}/complete`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to complete bucket');

  return response.json();
};

// ✅ 완료된 버킷리스트 가져오기 API
export const getCompletedBuckets = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await fetch(`${API_URL}/api/buckets?completed=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch completed buckets');

  return response.json();
};
