"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useTheme } from "next-themes"
import { ErrorBoundary } from "./error-boundary"

// Tech skill with position and color
interface TechSkill {
  name: string
  position: [number, number, number]
  color: string
  scale?: number
}

// Create animated text component
const AnimatedText = animated(Text)

// Skill Node Component
function SkillNode({
  skill,
  onClick,
  isActive,
}: {
  skill: TechSkill
  onClick: () => void
  isActive: boolean
}) {
  const { name, position, color, scale = 1 } = skill
  const ref = useRef<any>()
  const [hovered, setHovered] = useState(false)

  // Animation config for hover and selection
  const { scaleValue, opacity } = useSpring({
    scaleValue: hovered || isActive ? 1.2 : 1,
    opacity: hovered || isActive ? 1 : 0.7,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  // Subtle floating animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.0005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <AnimatedText
        ref={ref}
        position={position}
        color={color}
        fontSize={0.2 * scale}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
        scale-x={scaleValue}
        scale-y={scaleValue}
        scale-z={scaleValue}
        opacity={opacity}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {name}
      </AnimatedText>
    </Float>
  )
}

// Main tech sphere component
function TechSphereContent() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Skills array with positions around a sphere
  const skills: TechSkill[] = [
    // Programming Languages
    { name: "JavaScript", position: [1.5, 0.8, 0], color: "#f7df1e", scale: 1.2 },
    { name: "Python", position: [-1.6, 0.9, 0.1], color: "#306998", scale: 1.2 },
    { name: "TypeScript", position: [0, 1.8, 0], color: "#007acc", scale: 1.1 },
    { name: "Java", position: [0.8, -1.4, 0.5], color: "#f89820" },
    { name: "C++", position: [-0.9, -1.2, 0.4], color: "#659ad2" },

    // Frontend
    { name: "React", position: [0, 0, 2], color: "#61dafb", scale: 1.3 },
    { name: "HTML5", position: [1.2, 0, 1.2], color: "#e34f26" },
    { name: "CSS3", position: [-1.2, 0, 1.2], color: "#264de4" },
    { name: "TailwindCSS", position: [0, -1.4, 1.2], color: "#38bdf8" },
    { name: "Vue.js", position: [1.5, -0.5, 0.7], color: "#42b883" },

    // Backend
    { name: "Node.js", position: [0, 0, -2], color: "#339933", scale: 1.3 },
    { name: "Express", position: [1.2, 0, -1.2], color: "#ffffff" },
    { name: "MongoDB", position: [-1.2, 0, -1.2], color: "#4db33d" },
    { name: "SQL", position: [0, 1.4, -1.2], color: "#f29111" },
    { name: "Firebase", position: [1.1, 0.8, -1.1], color: "#ffca28" },

    // AI/ML
    { name: "TensorFlow", position: [0, -2, 0], color: "#ff6f00", scale: 1.1 },
    { name: "PyTorch", position: [1.1, -1.1, -1], color: "#ee4c2c" },
    { name: "AI", position: [-1.3, -0.7, -1], color: "#8c43ff", scale: 1.2 },

    // Other
    { name: "Git", position: [1.7, -0.2, -0.3], color: "#f05032" },
    { name: "Docker", position: [-1.7, -0.2, -0.3], color: "#2496ed" },
    { name: "GraphQL", position: [-0.5, 1.5, 0.8], color: "#e535ab" },
    { name: "AWS", position: [0.5, 1.2, -1], color: "#ff9900" },
    { name: "Blockchain", position: [-0.8, 1.2, -0.8], color: "#627eea" },
  ]

  const sphereRef = useRef<any>()

  // Slowly rotate the sphere
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.0008
      sphereRef.current.rotation.x += 0.0003
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <group ref={sphereRef}>
        {skills.map((skill) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
            isActive={skill.name === selectedSkill}
          />
        ))}
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={!selectedSkill}
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function TechSphere() {
  return (
    <ErrorBoundary>
      <div className="w-full h-[600px] rounded-xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <TechSphereContent />
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}

