/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Stars(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/extracted_minecraft_java_editions_stars.glb')
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Adjust self-rotation speed
    }
});

  return (
    <group ref={groupRef} {...props} dispose={null} scale={6}>
      <mesh
        castShadow
        receiveShadow
        // @ts-expect-error
        geometry={nodes.Object_2.geometry}
        material={materials.star}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/extracted_minecraft_java_editions_stars.glb')