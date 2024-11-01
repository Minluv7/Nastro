"use client";
import { useState } from 'react';
import { Earth } from '@/components/earth';
import { Jupiter } from '@/components/jupiter';
import { Mars } from '@/components/mars';
import { Mercury } from '@/components/mercury';
import { Neptune } from '@/components/neptune';
import { Saturn } from '@/components/saturn';
import { Uranus } from '@/components/uranus';
import { Venus } from '@/components/venus';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function PlanetPage() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden relative">
      <h1 className="text-3xl uppercase font-bold mb-6">Planets</h1>
      <p>All planets has an owen route. each of them is creadit of </p>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <p className="text-white text-xl">Loading...</p>
        </div>
      )}
      <Canvas onCreated={handleLoaded}>
        <Environment preset="sunset" />
        <OrbitControls minDistance={150} maxDistance={500} />

        <Mercury position={[-1090, 0, 0]} />
        <Venus position={[-900, 0, 0]} />
        <Earth position={[-700, 0, 0]} />
        <Mars position={[-500, 0, 0]} />
        <Jupiter position={[-300, 0, 0]} />
        <Saturn position={[-100, 0, 0]} />
        <Uranus position={[200, 0, 0]} />
        <Neptune position={[400, 0, 0]} />
      </Canvas>
    </div>
  );
}
