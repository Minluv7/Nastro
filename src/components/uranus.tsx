/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Uranus(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/uranus.glb')
  const groupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust self-rotation speed
    }

    // Orbiting around a central point
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y +=  0.000035; // Adjust orbit speed here
    }
  });

  return (
    <group ref={orbitGroupRef} {...props} dispose={null} scale={0.7}>
      <group rotation={[Math.PI / 2, 0, Math.PI]} position={[300, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Sphere_Material002_0.geometry}
            material={materials['Material.002']}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={60}
          />
          {/* <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={120}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle001_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={90}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle002_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={100}
          /> */}
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/uranus.glb')
