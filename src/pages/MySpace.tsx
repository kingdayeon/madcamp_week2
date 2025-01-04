import { useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import AddButton from '../components/bucketList/AddButton';
import { useBucketListStore } from '../store/bucketListStore';
import BucketPlanet from '../components/planet/BucketPlanet';
import type { BucketList } from '../types/bucketList';

export default function MySpace() {
  const { bucketLists } = useBucketListStore();
  const [selectedPlanet, setSelectedPlanet] = useState<BucketList | null>(null);
  const { camera } = useThree();

  const handlePlanetClick = (bucket: BucketList) => {
    setSelectedPlanet(bucket);
    
    const targetPosition = new Vector3(
      bucket.position.x,
      bucket.position.y,
      bucket.position.z + 6
    );

    gsap.to(camera.position, {
      duration: 2,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.lookAt(
          bucket.position.x,
          bucket.position.y,
          bucket.position.z
        );
      }
    });
  };

  const handleCloseDetail = () => {
    setSelectedPlanet(null);
    
    gsap.to(camera.position, {
      duration: 2,
      x: 0,
      y: 0,
      z: 15,
      ease: "power3.inOut",
      onComplete: () => {
        camera.lookAt(0, 0, 0);
      }
    });
  };

  const handleComplete = async (id: string) => {
    await useBucketListStore.getState().completeBucketList(id);
    handleCloseDetail();
  };

  return (
    <>
      {/* Bucket Planets */}
      {bucketLists.map((bucket) => (
        <BucketPlanet
          key={bucket._id}
          planet={bucket.planet}
          position={bucket.position}
          onClick={() => handlePlanetClick(bucket)}
        />
      ))}

      {/* UI Elements */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <AddButton />
        {selectedPlanet && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-auto">
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={handleCloseDetail}
            />
            <div className="relative bg-black/70 p-8 rounded-lg max-w-xl w-full mx-4 backdrop-blur-sm">
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                onClick={handleCloseDetail}
              >
                Close
              </button>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedPlanet.planet.name}
                </h2>
                <p className="text-white/60 text-sm mb-6">
                  {selectedPlanet.planet.description}
                </p>
                
                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-medium text-white mb-2">
                    My Bucket List
                  </h3>
                  <p className="text-white/90">
                    {selectedPlanet.content}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Target Date: {new Date(selectedPlanet.targetDate).toLocaleDateString()}
                  </p>
                </div>

                {!selectedPlanet.isCompleted && (
                  <button
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
                    onClick={() => handleComplete(selectedPlanet._id)}
                  >
                    달성하기
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}