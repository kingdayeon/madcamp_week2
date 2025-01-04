// src/types/bucketList.ts
export interface Planet {
  name: string;
  description: string;
  distanceInLightMonths: number;
  imageUrl: string;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface BucketList {
  _id: string;
  userId: string;
  content: string;
  targetDate: Date;
  planet: Planet;
  position: Position;
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
}