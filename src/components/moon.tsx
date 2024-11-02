/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  onLoad?: () => void; // Voeg onLoad prop toe
}

export function Moon({onLoad, ...props}: MoonProps) {
    const { nodes, materials } = useGLTF('/moon.glb', true);
    React.useEffect(() => {
        if (onLoad) onLoad();
    }, [onLoad]);
    const groupRef = useRef<THREE.Group>(null);
    
    
    useFrame(() => {
        if (groupRef.current) {
          groupRef.current.rotation.y += 0.01; // Adjust self-rotation speed
        }
    });

  return (
    <group ref={groupRef} {...props} dispose={null}  scale={1.8}>
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

useGLTF.preload('/moon.glb')
