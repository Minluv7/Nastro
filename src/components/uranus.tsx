/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Uranus(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/uranus.glb')
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0, 0.003, 0]}  rotation={[Math.PI / 2, 0, Math.PI]}>
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
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={130}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle001_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.Circle002_ring_0.geometry}
            material={materials.ring}
            rotation={[-Math.PI / 2, 1.367, 0]}
            scale={120}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/uranus.glb')
