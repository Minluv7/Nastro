/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Earth(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/earth_globe.glb')
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust rotation speed here
    }
  });
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[-5.177, -20.679, 0]} rotation={[Math.PI / 2, -0.462, Math.PI]} scale={4} >
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
