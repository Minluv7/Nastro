/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export function Mercury(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/mercury.glb')
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        // @ts-expect-error
        geometry={nodes.Earth_Planet_0.geometry}
        material={materials.Planet}
      />
    </group>
  )
}

useGLTF.preload('/mercury.glb')
