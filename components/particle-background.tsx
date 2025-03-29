"use client"

import { useRef, useEffect } from "react"
import { ErrorBoundary } from "./error-boundary"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      // Determine color based on theme
      const isLight = theme === "light"
      const baseColor = isLight ? "rgba(109, 40, 217," : "rgba(139, 92, 246,"
      const opacityRange = isLight ? [0.15, 0.3] : [0.2, 0.5]

      for (let i = 0; i < particleCount; i++) {
        const opacity = Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0]
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `${baseColor} ${opacity})`,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width

        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        connectParticles(particle, index)

        // Mouse interaction
        const dx = particle.x - mousePosition.current.x
        const dy = particle.y - mousePosition.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 1000
          particle.speedX -= Math.cos(angle) * force
          particle.speedY -= Math.sin(angle) * force
        }
      })

      animationFrameId.current = requestAnimationFrame(drawParticles)
    }

    const connectParticles = (particle: Particle, index: number) => {
      const isLight = theme === "light"
      const maxDistance = 120

      for (let i = index + 1; i < particles.current.length; i++) {
        const otherParticle = particles.current[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // Adjust connection color based on theme
          const maxOpacity = isLight ? 0.15 : 0.2
          const connectionOpacity = maxOpacity - (distance / maxDistance) * maxOpacity
          const connectionColor = isLight ? "rgba(109, 40, 217," : "rgba(139, 92, 246,"

          ctx.beginPath()
          ctx.strokeStyle = `${connectionColor} ${connectionOpacity})`
          ctx.lineWidth = isLight ? 0.4 : 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [theme])

  return (
    <ErrorBoundary>
      <canvas ref={canvasRef} className="particles-bg" aria-hidden="true" />
    </ErrorBoundary>
  )
}

