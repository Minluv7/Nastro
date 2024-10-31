/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Saturn(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials} = useGLTF('/saturn.glb')
    const groupRef = useRef<THREE.Group>(null);
    const orbitGroupRef = useRef<THREE.Group>(null);

    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01; // Adjust self-rotation speed
      }
  
      // Orbiting around a central point
      if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y +=  0.0001; // Adjust orbit speed here
      }
    });

  return (
    <group ref={orbitGroupRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene" position={[300, 0, 0]}>
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.14}>
          <group name="56fb5d81d5a845599d5e60534f293915fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Saturn_Rings" rotation={[-Math.PI / 2, 0, 0]} scale={100} >
                  <mesh
                    name="Saturn_Rings_Material_#63_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Saturn_Rings_Material_#63_0'].geometry}
                    material={materials.Material_63}
                  />
                </group>
                <group name="Saturn" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <mesh
                    name="Saturn_Material_#50_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Saturn_Material_#50_0'].geometry}
                    material={materials.Material_50}
                  />
                </group>
                <group name="Saturn_Clouds" rotation={[-Math.PI / 2, 0, -0.019]} scale={101}>
                  <mesh
                    name="Saturn_Clouds_Material_#62_0"
                    castShadow
                    receiveShadow
                    // @ts-expect-error
                    geometry={nodes['Saturn_Clouds_Material_#62_0'].geometry}
                    material={materials.Material_62}
                  />
                </group>
                <group
                  name="Sphere_Mimas"
                  position={[-988.316, 0, -1127.884]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Sphere_Mimas_Material_#64_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Sphere_Mimas_Material_#64_0'].geometry}
                    material={materials.Material_64}
                  />
                </group>
                <group
                  name="Sphere_Enceladus"
                  position={[1784.732, 0, 239.893]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Sphere_Enceladus_Material_#64_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Sphere_Enceladus_Material_#64_0'].geometry}
                    material={materials.Material_64}
                  />
                </group>
                <group
                  name="Sphere_Dione"
                  position={[-3011.732, 0, -1085.334]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Sphere_Dione_Material_#64_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Sphere_Dione_Material_#64_0'].geometry}
                    material={materials.Material_64}
                  />
                </group>
                <group
                  name="Sphere_Rhea"
                  position={[-2969.675, 0, -3375.375]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Sphere_Rhea_Material_#64_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Sphere_Rhea_Material_#64_0'].geometry}
                    material={materials.Material_64}
                  />
                </group>
                <group
                  name="Sphere_Tethys"
                  position={[396.367, 0, 2165.972]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Sphere_Tethys_Material_#64_0"
                    castShadow
                    receiveShadow
                     // @ts-expect-error
                    geometry={nodes['Sphere_Tethys_Material_#64_0'].geometry}
                    material={materials.Material_64}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/saturn.glb')