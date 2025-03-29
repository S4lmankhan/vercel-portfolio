"use client"

import { useEffect, useRef } from "react"

export function PersistentCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create cursor elements directly in the DOM
    const createCursorElements = () => {
      // Remove any existing cursor elements first
      const existingDot = document.getElementById("cursor-dot")
      const existingRing = document.getElementById("cursor-ring")

      if (existingDot) existingDot.remove()
      if (existingRing) existingRing.remove()

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
      dot.style.zIndex = "99999"
      dot.style.transform = "translate(-100px, -100px)"
      dot.style.boxShadow = "0 0 10px 2px rgba(139, 92, 246, 0.5)"
      document.body.appendChild(dot)
      cursorDotRef.current = dot

      // Create ring cursor
      const ring = document.createElement("div")
      ring.id = "cursor-ring"
      ring.style.position = "fixed"
      ring.style.top = "0"
      ring.style.left = "0"
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderRadius = "50%"
      ring.style.pointerEvents = "none"
      ring.style.zIndex = "99998"
      ring.style.transform = "translate(-100px, -100px)"
      ring.style.border = "2px solid #8b5cf6"
      ring.style.transition = "width 0.2s, height 0.2s, transform 0.1s"
      document.body.appendChild(ring)
      cursorRingRef.current = ring
    }

    // Create cursor elements
    createCursorElements()

    // Hide default cursor
    document.documentElement.style.cursor = "none"
    document.body.style.cursor = "none"

    // Add style to hide cursor on all elements
    const style = document.createElement("style")
    style.textContent = `
      * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    // Track mouse position
    const updateCursorPosition = (e: MouseEvent) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      }
    }

    // Handle interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        if (cursorRingRef.current) {
          cursorRingRef.current.style.width = "48px"
          cursorRingRef.current.style.height = "48px"
          cursorRingRef.current.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`
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
        if (cursorRingRef.current) {
          cursorRingRef.current.style.width = "32px"
          cursorRingRef.current.style.height = "32px"
        }
      }
    }

    // Handle mouse down/up
    const handleMouseDown = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${Number.parseInt(cursorRingRef.current.style.transform.split("(")[1]) + 2}px, ${Number.parseInt(cursorRingRef.current.style.transform.split(",")[1]) + 2}px) scale(0.9)`
      }
    }

    const handleMouseUp = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = cursorRingRef.current.style.transform.replace(" scale(0.9)", "")
      }
    }

    // Ensure cursor is visible when mouse moves
    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Ensure cursor is visible when page loads
    window.addEventListener("load", () => {
      createCursorElements()
    })

    // Ensure cursor is visible when mouse enters window
    window.addEventListener("mouseenter", updateCursorPosition)

    // Periodically check if cursor elements exist and recreate if needed
    const cursorCheckInterval = setInterval(() => {
      if (!document.getElementById("cursor-dot") || !document.getElementById("cursor-ring")) {
        createCursorElements()
      }
    }, 1000)

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", updateCursorPosition)
      window.removeEventListener("load", createCursorElements)

      clearInterval(cursorCheckInterval)

      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }

      if (cursorDotRef.current && cursorDotRef.current.parentNode) {
        cursorDotRef.current.parentNode.removeChild(cursorDotRef.current)
      }

      if (cursorRingRef.current && cursorRingRef.current.parentNode) {
        cursorRingRef.current.parentNode.removeChild(cursorRingRef.current)
      }
    }
  }, [])

  return null
}

