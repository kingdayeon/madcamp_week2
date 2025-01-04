// src/api/nasa.ts
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_API_URL = 'https://api.nasa.gov';

export interface ExoplanetData {
  pl_name: string;
  pl_discmethod: string;
  pl_orbper: number;
  pl_radius: number;
  pl_masse: number;
  pl_facility: string;
  pl_disc: number;        // 발견 년도
  pl_distancely: number;  // 광년 단위 거리
}

// 광속 계산 상수
const LIGHT_SPEED = 299792458; // m/s
const SECONDS_IN_MONTH = 30 * 24 * 60 * 60; // 한 달의 초
const METERS_IN_LIGHT_YEAR = 9.461e15; // 1광년의 미터

export async function fetchRandomExoplanet(monthsToReach: number): Promise<ExoplanetData> {
  try {
    const response = await fetch(
      `${NASA_API_URL}/planetary/exoplanets?api_key=${NASA_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch exoplanet data');
    
    const data = await response.json();
    
    // 도달 가능한 최대 거리 계산 (광년 단위)
    const maxDistanceInLightYears = (LIGHT_SPEED * monthsToReach * SECONDS_IN_MONTH) / METERS_IN_LIGHT_YEAR;
    
    // 해당 거리 내의 행성들만 필터링
    const filteredPlanets = data.filter((planet: ExoplanetData) => {
      // 행성까지의 거리가 계산된 최대 거리보다 작거나 같은 경우만 선택
      return planet.pl_distancely && planet.pl_distancely <= maxDistanceInLightYears;
    });
    
    if (filteredPlanets.length === 0) {
      throw new Error('No planets found within the specified distance');
    }
    
    // 랜덤으로 하나 선택
    const randomIndex = Math.floor(Math.random() * filteredPlanets.length);
    return filteredPlanets[randomIndex];
  } catch (error) {
    console.error('Error fetching exoplanet:', error);
    throw error;
  }
}

// 행성까지 걸리는 시간 계산 함수 (개월 단위 반환)
export function calculateTimeToReach(distanceInLightYears: number): number {
  const distanceInMeters = distanceInLightYears * METERS_IN_LIGHT_YEAR;
  const timeInSeconds = distanceInMeters / LIGHT_SPEED;
  return timeInSeconds / SECONDS_IN_MONTH;
}