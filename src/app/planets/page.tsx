"use client";
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
  return (
    <div className="h-[50vh] w-[100vw]">
      <Canvas>
        <Environment preset="sunset" />
        <OrbitControls
          minDistance={150} // Zoom distances suitable for desktop
          maxDistance={500}
          enablePan={true}
          rotateSpeed={1}
        />
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
