"use client";
import { Earth } from '@/components/earth';
import {Jupiter} from '@/components/jupiter';
import { Mars } from '@/components/mars';
import { Mercury } from '@/components/mercury';
import { Neptune } from '@/components/neptune';
import { Saturn } from '@/components/saturn';
import { Uranus } from '@/components/uranus';
import { Venus } from '@/components/venus';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function PlanetPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value based on current window width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={isMobile ? "h-[100vh] w-full" : "h-[100vh] w-[100vw]"}>
      <Canvas>
        <Environment preset="sunset" />
        <OrbitControls
          minDistance={isMobile ? 50 : 150}
          maxDistance={isMobile ? 200 : 500}
          enablePan={!isMobile}
          rotateSpeed={isMobile ? 0.5 : 1}
        />
        <Mercury position={isMobile ? [-100, 0, 0] : [-470, 0, 0]} />
        <Venus position={isMobile ? [-70, 0, 0] : [-320, 0, 0]} />
        <Earth position={isMobile ? [-50, 0, 0] : [-160, 0, 0]} />
        <Mars position={isMobile ? [-30, 0, 0] : [-40, 0, 0]} />
        <Jupiter position={isMobile ? [0, 0, 0] : [80, 0, 0]} />
        <Saturn position={isMobile ? [50, 0, 0] : [280, 0, 0]} />
        <Uranus position={isMobile ? [80, 0, 0] : [470, 0, 0]} />
        <Neptune position={isMobile ? [100, 0, 0] : [590, 0, 0]} />
      </Canvas>
    </div>
  );
}
