/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Earth(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/earth_globe.glb')
  const groupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.1; // Adjust self-rotation speed
    }

    // Orbiting around a central point
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y +=  0.003; // Adjust orbit speed here
    }
  });
  return (
    <group ref={orbitGroupRef} {...props} dispose={null}>
      <group position={[300, 0, 0]} rotation={[Math.PI / 2, -0.462, Math.PI]} scale={2}>
        <group rotation={[-Math.PI, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.meshNode_Material_u1_v1_0.geometry}
            material={materials.Material_u1_v1}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.meshNode_Material_u2_v1_0.geometry}
            material={materials.Material_u2_v1}
          />
          <mesh
            castShadow
            receiveShadow
            // @ts-expect-error
            geometry={nodes.meshNode_Material_u1_v2_0.geometry}
            material={materials.Material_u1_v2}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/earth_globe.glb')
