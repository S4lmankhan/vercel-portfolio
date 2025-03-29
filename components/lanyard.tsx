"use client"
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Lightformer, Text, Float, PerspectiveCamera } from "@react-three/drei"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import * as THREE from "three"

interface LanyardProps {
  position?: [number, number, number]
  fov?: number
  transparent?: boolean
  onDrag?: () => void
}

export default function Lanyard({ position = [0, 0, 5], fov = 50, transparent = true, onDrag }: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center">
      <Canvas
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <PerspectiveCamera makeDefault position={position} fov={fov} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Physics gravity={[0, -2, 0]}>
          <SimplifiedLanyard onDrag={onDrag} />
        </Physics>
        <Environment preset="city">
          <Lightformer intensity={2} color="white" position={[0, 5, -9]} scale={[10, 10, 1]} />
        </Environment>
      </Canvas>
      <div className="absolute bottom-10 left-0 right-0 text-center z-20 animate-bounce">
        <p className="text-gray-300 text-sm">Drag the card down to explore</p>
      </div>
    </div>
  )
}

function SimplifiedLanyard({ onDrag }: { onDrag?: () => void }) {
  const card = useRef<THREE.Group>(null)
  const cardBody = useRef<any>(null)
  const [dragging, setDragging] = useState(false)
  const [startDragY, setStartDragY] = useState(0)
  const [isDraggable, setIsDraggable] = useState(true)

  // Create a texture for the card
  const cardTexture = useRef<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    // Create the card texture
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 768
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Background
      ctx.fillStyle = "#1e1e2e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Border
      ctx.strokeStyle = "#a855f7"
      ctx.lineWidth = 10
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

      // Profile picture placeholder (circle)
      ctx.fillStyle = "#a855f7"
      ctx.beginPath()
      ctx.arc(canvas.width / 2, 200, 100, 0, Math.PI * 2)
      ctx.fill()

      // Name
      ctx.fillStyle = "white"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Salman Khan", canvas.width / 2, 350)

      // Title
      ctx.fillStyle = "#d8b4fe"
      ctx.font = "32px Arial"
      ctx.fillText("Full Stack Developer", canvas.width / 2, 400)

      // Short intro
      ctx.fillStyle = "white"
      ctx.font = "24px Arial"
      ctx.fillText("Cryptography, Blockchain", canvas.width / 2, 460)
      ctx.fillText("& AI-ML Enthusiast", canvas.width / 2, 490)

      // Instruction
      ctx.fillStyle = "#d8b4fe"
      ctx.font = "italic 20px Arial"
      ctx.fillText("Drag down to explore", canvas.width / 2, 600)

      cardTexture.current = new THREE.CanvasTexture(canvas)
    }
  }, [])

  // Handle pointer events for dragging
  const handlePointerDown = (e: any) => {
    if (!isDraggable) return
    e.stopPropagation()
    setDragging(true)
    setStartDragY(e.point.y)
  }

  const handlePointerUp = (e: any) => {
    if (!dragging) return
    e.stopPropagation()
    setDragging(false)

    // If dragged down significantly, trigger the scroll
    if (startDragY - e.point.y > 1 && onDrag) {
      onDrag()
      setIsDraggable(false)
      setTimeout(() => setIsDraggable(true), 1000) // Re-enable dragging after animation
    }
  }

  const handlePointerMove = (e: any) => {
    if (!dragging || !cardBody.current) return

    // Limit the drag to downward motion only
    const newY = Math.min(startDragY, e.point.y)
    const dragDistance = startDragY - newY

    // If dragged down significantly, trigger the scroll
    if (dragDistance > 1 && onDrag) {
      onDrag()
      setDragging(false)
      setIsDraggable(false)
      setTimeout(() => setIsDraggable(true), 1000) // Re-enable dragging after animation
    }
  }

  // Create a simple lanyard line
  const lanyardPoints = [
    new THREE.Vector3(0, 3, 0), // Top anchor point
    new THREE.Vector3(0, 1.5, 0), // Middle point
    new THREE.Vector3(0, 0, 0), // Card attachment point
  ]

  const lanyardCurve = new THREE.CatmullRomCurve3(lanyardPoints)
  const lanyardGeometry = new THREE.TubeGeometry(lanyardCurve, 20, 0.05, 8, false)

  useFrame(() => {
    if (card.current && cardBody.current) {
      // Update the card position based on the physics body
      const position = cardBody.current.translation()
      card.current.position.set(position.x, position.y, position.z)

      // Update the card rotation based on the physics body
      const rotation = cardBody.current.rotation()
      card.current.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)

      // Update the lanyard points based on the card position
      lanyardPoints[2].set(position.x, position.y + 1.2, position.z)
      lanyardCurve.points = lanyardPoints

      // Update the lanyard geometry
      if (lanyardRef.current) {
        lanyardRef.current.geometry.dispose()
        lanyardRef.current.geometry = new THREE.TubeGeometry(lanyardCurve, 20, 0.05, 8, false)
      }
    }
  })

  const lanyardRef = useRef<THREE.Mesh>(null)

  return (
    <>
      {/* Lanyard string */}
      <mesh ref={lanyardRef} position={[0, 0, 0]}>
        <tubeGeometry args={[lanyardCurve, 20, 0.05, 8, false]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>

      {/* Top anchor point (fixed) */}
      <RigidBody type="fixed" position={[0, 3, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a855f7" />
        </mesh>
      </RigidBody>

      {/* Card with physics */}
      <RigidBody ref={cardBody} position={[0, 0, 0]} colliders={false} linearDamping={4} angularDamping={4}>
        <CuboidCollider args={[0.7, 1, 0.05]} />
        <group
          ref={card}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
        >
          {/* Card body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 2, 0.1]} />
            <meshPhysicalMaterial
              color="#6b21a8"
              map={cardTexture.current}
              clearcoat={1}
              clearcoatRoughness={0.15}
              roughness={0.9}
              metalness={0.8}
            />
          </mesh>

          {/* Card clip */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.15]} />
            <meshStandardMaterial color="#c4b5fd" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Floating text for better visibility */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
              lineHeight={1.2}
              font="/fonts/Inter-Bold.ttf"
            >
              Salman Khan
              {"\n"}
              Full Stack Developer
            </Text>
          </Float>
        </group>
      </RigidBody>
    </>
  )
}

