// src/components/bucketList/AddBucketModal.tsx
import React, { useState } from 'react';
import { useBucketListStore } from '../../store/bucketListStore';
import { fetchRandomExoplanet, calculateTimeToReach } from '../../api/nasa';
import type { Position } from '../../types/bucketList';

interface AddBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBucketModal({ isOpen, onClose }: AddBucketModalProps) {
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const { addBucketList, loading } = useBucketListStore();

  // 랜덤 위치 생성 함수
  const generateRandomPosition = (): Position => {
    return {
      x: (Math.random() - 0.5) * 20, // -10 to 10
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !targetDate) return;

    try {
      // 목표 날짜까지의 개월 수 계산
      const months = Math.ceil(
        (new Date(targetDate).getTime() - new Date().getTime()) / 
        (1000 * 60 * 60 * 24 * 30)
      );

      // NASA API로 행성 데이터 가져오기
      const exoplanet = await fetchRandomExoplanet(months);
      
      // 행성 데이터 가공
      const planet = {
        name: exoplanet.pl_name,
        description: `발견 년도: ${exoplanet.pl_disc}, 거리: ${exoplanet.pl_distancely} 광년`,
        distanceInLightMonths: calculateTimeToReach(exoplanet.pl_distancely),
        imageUrl: '/models/planet1.glb', // 임시로 기본 모델 사용
      };

      // 랜덤 위치 생성
      const position = generateRandomPosition();

      // 버킷리스트 추가
      await addBucketList(content, new Date(targetDate), planet, position);
      
      onClose();
      setContent('');
      setTargetDate('');
    } catch (error) {
      console.error('Failed to create bucket list:', error);
      // 에러 처리 필요
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white/30 backdrop-blur-sm rounded-lg p-6 w-[500px]">
        <h2 className="text-white text-xl font-medium mb-6">내 버킷리스트 추가</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">달성 기한</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">내용 작성</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white outline-none h-32 resize-none"
                placeholder="버킷리스트를 작성해주세요"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              {loading ? 'Loading...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}