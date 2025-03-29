"use client"

import { useRef, useEffect } from "react"
import { ErrorBoundary } from "./error-boundary"

export function CustomCursor() {
  const dotCursorRef = useRef<HTMLDivElement>(null)
  const ringCursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)

  useEffect(() => {
    // Apply cursor:none to document level for maximum coverage
    document.documentElement.style.cursor = "none"
    document.body.style.cursor = "none"

    // Create a style element to ensure cursor:none applies everywhere
    const styleElement = document.createElement("style")
    styleElement.textContent = `
    * {
      cursor: none !important;
    }
    a, button, [role="button"], input, select, textarea, 
    label, [tabindex]:not([tabindex="-1"]), div, span, p,
    h1, h2, h3, h4, h5, h6, ul, ol, li, section, article,
    aside, nav, header, footer, main, form, table, tr, td, th,
    img, svg, path, *::before, *::after {
      cursor: none !important;
    }
  `
    document.head.appendChild(styleElement)

    // Create trail elements
    const trailContainer = document.createElement("div")
    trailContainer.className = "fixed top-0 left-0 pointer-events-none z-[9998]"
    document.body.appendChild(trailContainer)

    // Create 5 trail elements
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement("div")
      trail.className = "fixed rounded-full pointer-events-none opacity-0 bg-purple-500"
      trail.style.width = "5px"
      trail.style.height = "5px"
      trail.style.transition = "opacity 0.2s ease"
      trailContainer.appendChild(trail)
      trailsRef.current.push(trail)
    }

    // Optimized mouse tracking with RAF
    let rafId: number
    let prevTimestamp = 0
    const FRAME_RATE_LIMIT = 1000 / 120 // 120fps max

    const updateCursors = (timestamp: number) => {
      // Throttle updates for performance
      if (timestamp - prevTimestamp < FRAME_RATE_LIMIT) {
        rafId = requestAnimationFrame(updateCursors)
        return
      }

      prevTimestamp = timestamp
      const { x, y } = mousePositionRef.current

      // Update dot cursor (follows instantly)
      if (dotCursorRef.current) {
        dotCursorRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`
      }

      // Update ring cursor with slight delay
      if (ringCursorRef.current) {
        const targetX = x - (isHoveringRef.current ? 24 : 16)
        const targetY = y - (isHoveringRef.current ? 24 : 16)

        ringCursorRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`
        ringCursorRef.current.style.width = isHoveringRef.current ? "48px" : "32px"
        ringCursorRef.current.style.height = isHoveringRef.current ? "48px" : "32px"

        // Don't change opacity on click to prevent "splitting" effect
        ringCursorRef.current.style.opacity = "0.6"

        // Use a more subtle scale change on click
        ringCursorRef.current.style.scale = isClickingRef.current ? "0.95" : "1"
      }

      // Update trails with staggered delay
      for (let i = 0; i < trailsRef.current.length; i++) {
        const trail = trailsRef.current[i]

        // Only show trails when mouse is moving fast
        const trailOpacity = isHoveringRef.current ? "0" : "0.4"
        trail.style.opacity = trailOpacity

        // Position with increasing delay for each trail
        setTimeout(() => {
          trail.style.transform = `translate(${x - 2.5}px, ${y - 2.5}px)`
        }, i * 40) // Staggered delay
      }

      rafId = requestAnimationFrame(updateCursors)
    }

    // Start animation frame immediately
    rafId = requestAnimationFrame(updateCursors)

    // Track mouse position without state updates
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = () => {
      isClickingRef.current = true

      // Use a more subtle effect on click - no pulse animation
      if (ringCursorRef.current) {
        // Don't add the pulse class to prevent splitting
        // ringCursorRef.current.classList.add('cursor-pulse');
      }
    }

    const handleMouseUp = () => {
      isClickingRef.current = false
    }

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        isHoveringRef.current = true

        // Add magnetic effect
        if (ringCursorRef.current) {
          ringCursorRef.current.classList.add("cursor-magnetic")
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        isHoveringRef.current = false

        // Remove magnetic effect
        if (ringCursorRef.current) {
          ringCursorRef.current.classList.remove("cursor-magnetic")
        }
      }
    }

    // Use passive: true for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseout", handleMouseOut, { passive: true })

    // Make cursor visible immediately
    if (dotCursorRef.current) {
      dotCursorRef.current.style.display = "block"
      dotCursorRef.current.style.opacity = "1"
    }
    if (ringCursorRef.current) {
      ringCursorRef.current.style.display = "block"
      ringCursorRef.current.style.opacity = "0.6"
    }

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)

      // Remove the style element
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }

      // Reset cursor style
      document.documentElement.style.cursor = ""
      document.body.style.cursor = ""

      // Clean up trail elements
      if (trailContainer.parentNode) {
        trailContainer.parentNode.removeChild(trailContainer)
      }
    }
  }, [])

  return (
    <ErrorBoundary>
      {/* Main cursor dot */}
      <div
        ref={dotCursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-purple-500 rounded-full pointer-events-none z-[9999] block"
        style={{
          transform: "translate(-100px, -100px)",
          boxShadow: "0 0 10px 2px rgba(139, 92, 246, 0.5)",
        }}
      />

      {/* Ring cursor with gradient border */}
      <div
        ref={ringCursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] block"
        style={{
          transform: "translate(-100px, -100px)",
          width: "32px",
          height: "32px",
          opacity: 0.6,
          transition: "width 0.2s, height 0.2s, opacity 0.2s, scale 0.2s",
          background: "transparent",
          border: "2px solid transparent",
          backgroundImage: "linear-gradient(to right, #8b5cf6, #6d28d9)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
        }}
      />
    </ErrorBoundary>
  )
}

