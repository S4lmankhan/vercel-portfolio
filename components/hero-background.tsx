"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Vector3 } from "three"
import { ErrorBoundary } from "./error-boundary"
import type * as THREE from "three"

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Gentle floating animation
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2

      // Follow mouse with slight delay
      const target = new Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
      sphereRef.current.position.x = sphereRef.current.position.x + (target.x - sphereRef.current.position.x) * 0.05
      sphereRef.current.rotation.x += 0.01
      sphereRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial color="#8B5CF6" attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
    </Sphere>
  )
}

export function HeroBackground() {
  return (
    <ErrorBoundary>
      <div className="absolute inset-0 -z-10 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

