/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Jupiter(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/jupiter.glb');
  const groupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust self-rotation speed
    }

    // Orbiting around a central point
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += 0.0025; // Adjust orbit speed here
    }
  });

  return (
    <group ref={orbitGroupRef} {...props}  >
      <group scale={2.25} dispose={null} position={[250, 0, 0]} >
      <mesh
        castShadow
        receiveShadow
        // @ts-expect-error
        geometry={nodes.Earth_Planet_0.geometry}
        material={materials.Planet}
      />
      </group>
    </group>
  );
}

useGLTF.preload('/jupiter.glb');
