import React, { useRef } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HorseHead(props) {
  const { nodes, materials } = useGLTF('/horsehead.glb')
  const groupRef = useRef()
  const scroll = useScroll()

  useFrame((state) => {
    const offset = scroll.offset
    const isDesktop = window.innerWidth > 1024

    if (groupRef.current) {
      // 1. POSICIONAMIENTO DINÁMICO
      // Inicio: Centro | Mitad: Derecha (para dejar texto a izq) | Final: Centro + Zoom
      let xTarget = 0
      let zTarget = 0
      let yTarget = -0.95

      if (isDesktop) {
        if (offset < 0.45) {
          // Se desplaza a la derecha mientras el texto está a la izquierda
          xTarget = THREE.MathUtils.lerp(0, 3, offset * 2.2)
        } else if (offset < 0.85) {
          // Se mueve a la izquierda mientras el texto está a la derecha
          xTarget = THREE.MathUtils.lerp(3, -3, (offset - 0.45) * 2.5)
        } else {
          // Regresa al centro para el gran final
          xTarget = THREE.MathUtils.lerp(-3, 0, (offset - 0.85) * 6)
          zTarget = 2 // Zoom in
        }
      } else {
        // Lógica móvil: se mantiene más estático para no tapar
        xTarget = offset > 0.2 && offset < 0.7 ? -0.5 : 0
      }

      // Aplicar movimientos con suavizado (Lerp)
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, xTarget, 0.04)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, zTarget, 0.04)
      
      // 2. ROTACIÓN DRAMÁTICA
      groupRef.current.rotation.y = offset * Math.PI * 4 // 2 vueltas completas
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 // Cabeceo sutil de vida

      // 3. BALANCEO
      groupRef.current.position.y = yTarget + (Math.sin(state.clock.elapsedTime * 0.5) * 0.1)
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh 
          geometry={nodes.horse_head_horse_head_0.geometry} 
          material={materials['horse_head.002']} 
          rotation={[-Math.PI / 2, 0, 0]} 
          scale={230} 
        >
          <meshStandardMaterial 
            color="#e2b464" 
            roughness={0.4} 
            metalness={0.6} // Más metálico para que los reflejos en desktop se vean "premium"
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </group>
  )
}