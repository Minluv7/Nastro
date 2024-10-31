/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export function Mercury(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/mercury.glb')
  const groupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
 // Mars self-rotation
 useFrame(() => {
  if (groupRef.current) {
    groupRef.current.rotation.y += 0.01; // Adjust self-rotation speed
  }

  // Orbiting around a central point
  if (orbitGroupRef.current) {
    orbitGroupRef.current.rotation.y += 0.0125; // Adjust orbit speed here
  }
});

  return (
    <group ref={orbitGroupRef} {...props} >
      <group dispose={null} scale={0.1} position={[300, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        // @ts-expect-error
        geometry={nodes.Earth_Planet_0.geometry}
        material={materials.Planet}
      />
      </group>
    </group>
  )
}

useGLTF.preload('/mercury.glb')
