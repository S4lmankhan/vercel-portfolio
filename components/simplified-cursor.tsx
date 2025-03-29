"use client"

import { useEffect } from "react"

export function SimplifiedCursor() {
  useEffect(() => {
    // Create cursor elements
    const createCursor = () => {
      // Remove existing cursor elements if they exist
      const existingDot = document.getElementById("cursor-dot")
      if (existingDot) existingDot.remove()

      // Create dot cursor
      const dot = document.createElement("div")
      dot.id = "cursor-dot"
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
      dot.style.transition = "transform 0.1s ease-out"
      document.body.appendChild(dot)

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

    // Track mouse position with optimized event handler
    let mouseX = -100
    let mouseY = -100
    let rafId: number

    const updateCursorPosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Use requestAnimationFrame for smooth performance
    const renderCursor = () => {
      const dot = document.getElementById("cursor-dot")

      if (dot) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      } else {
        // Recreate if missing
        createCursor()
      }

      rafId = requestAnimationFrame(renderCursor)
    }

    // Start animation loop
    rafId = requestAnimationFrame(renderCursor)

    // Add event listener with passive flag for better performance
    document.addEventListener("mousemove", updateCursorPosition, { passive: true })

    // Set interval to ensure cursor elements always exist
    const cursorInterval = setInterval(() => {
      if (!document.getElementById("cursor-dot")) {
        createCursor()
      }
    }, 2000)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("mousemove", updateCursorPosition)
      clearInterval(cursorInterval)

      const style = document.getElementById("cursor-style")
      if (style) style.remove()

      const dot = document.getElementById("cursor-dot")
      if (dot) dot.remove()
    }
  }, [])

  return null
}

