"use client"

import { useEffect, useRef } from "react"

export function OptimizedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    // Simplified particle system with fewer particles
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 40)) // Reduce count on smaller screens

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1 // Smaller particles
        this.speedX = Math.random() * 1 - 0.5 // Slower movement
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(123, 31, 162, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation variables
    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Limit to 30fps for better performance
    const fpsInterval = 1000 / fps

    // Animation loop with frame limiting
    function animate(timestamp: number) {
      animationFrameId = requestAnimationFrame(animate)

      // Calculate elapsed time
      const elapsed = timestamp - lastTime

      // Only render if enough time has passed
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)

        // Clear canvas with solid background for better performance
        ctx.fillStyle = "#0f172a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (const particle of particles) {
          particle.update()
          particle.draw()
        }

        // Connect particles (only connect nearby particles to improve performance)
        for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x
            const dy = particles[a].y - particles[b].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              // Reduced connection distance
              const opacity = 1 - distance / 80
              ctx.strokeStyle = `rgba(123, 31, 162, ${opacity * 0.3})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[a].x, particles[a].y)
              ctx.lineTo(particles[b].x, particles[b].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

