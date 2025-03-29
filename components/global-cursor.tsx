"use client"

import { useEffect } from "react"

export function GlobalCursor() {
  useEffect(() => {
    // Function to create cursor elements
    const createCursor = () => {
      // Remove existing cursor elements if they exist
      const existingDot = document.getElementById("global-cursor-dot")
      const existingRing = document.getElementById("global-cursor-ring")

      if (existingDot) existingDot.remove()
      if (existingRing) existingRing.remove()

      // Create dot cursor
      const dot = document.createElement("div")
      dot.id = "global-cursor-dot"
      dot.style.position = "fixed"
      dot.style.top = "0"
      dot.style.left = "0"
      dot.style.width = "8px"
      dot.style.height = "8px"
      dot.style.backgroundColor = "#8b5cf6"
      dot.style.borderRadius = "50%"
      dot.style.pointerEvents = "none"
      dot.style.zIndex = "999999"
      dot.style.transform = "translate(-100px, -100px)"
      dot.style.boxShadow = "0 0 10px 2px rgba(139, 92, 246, 0.5)"
      document.body.appendChild(dot)

      // Create ring cursor
      const ring = document.createElement("div")
      ring.id = "global-cursor-ring"
      ring.style.position = "fixed"
      ring.style.top = "0"
      ring.style.left = "0"
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderRadius = "50%"
      ring.style.pointerEvents = "none"
      ring.style.zIndex = "999998"
      ring.style.transform = "translate(-100px, -100px)"
      ring.style.border = "2px solid #8b5cf6"
      ring.style.transition = "width 0.2s, height 0.2s, transform 0.1s"
      document.body.appendChild(ring)

      // Add global style to hide default cursor
      const style = document.createElement("style")
      style.id = "cursor-style"
      style.textContent = `
        * {
          cursor: none !important;
        }
      `
      document.head.appendChild(style)
    }

    // Create cursor elements immediately
    createCursor()

    // Track mouse position
    const updateCursorPosition = (e: MouseEvent) => {
      const dot = document.getElementById("global-cursor-dot")
      const ring = document.getElementById("global-cursor-ring")

      if (dot) {
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }

      if (ring) {
        ring.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      }

      // If elements don't exist, recreate them
      if (!dot || !ring) {
        createCursor()
      }
    }

    // Handle interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const ring = document.getElementById("global-cursor-ring")

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        if (ring) {
          ring.style.width = "48px"
          ring.style.height = "48px"
          ring.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const ring = document.getElementById("global-cursor-ring")

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        if (ring) {
          ring.style.width = "32px"
          ring.style.height = "32px"
        }
      }
    }

    // Handle mouse down/up
    const handleMouseDown = () => {
      const ring = document.getElementById("global-cursor-ring")
      if (ring) {
        ring.style.transform = `${ring.style.transform.split("translate")[1].split(")")[0]}) scale(0.9)`
      }
    }

    const handleMouseUp = () => {
      const ring = document.getElementById("global-cursor-ring")
      if (ring) {
        ring.style.transform = ring.style.transform.replace(" scale(0.9)", "")
      }
    }

    // Add event listeners
    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Set interval to ensure cursor elements always exist
    const cursorInterval = setInterval(() => {
      if (!document.getElementById("global-cursor-dot") || !document.getElementById("global-cursor-ring")) {
        createCursor()
      }
    }, 500)

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)

      clearInterval(cursorInterval)

      const style = document.getElementById("cursor-style")
      if (style) style.remove()

      const dot = document.getElementById("global-cursor-dot")
      if (dot) dot.remove()

      const ring = document.getElementById("global-cursor-ring")
      if (ring) ring.remove()
    }
  }, [])

  return null
}

