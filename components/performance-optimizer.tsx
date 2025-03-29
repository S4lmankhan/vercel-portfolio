"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Optimize scroll performance
    let scrollTimeout: NodeJS.Timeout
    let isScrolling = false

    const handleScroll = () => {
      // Set scrolling flag
      isScrolling = true

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Add a class to reduce animations during scroll
      document.body.classList.add("is-scrolling")

      // Set a timeout to remove the class after scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        document.body.classList.remove("is-scrolling")
      }, 100)
    }

    // Optimize animation frames
    const optimizeAnimations = () => {
      // Find all animated elements
      const animatedElements = document.querySelectorAll(".animate-bounce, .animate-spin, .animate-pulse")

      // Pause animations during scroll
      if (isScrolling) {
        animatedElements.forEach((el) => {
          el.classList.add("animation-paused")
        })
      } else {
        animatedElements.forEach((el) => {
          el.classList.remove("animation-paused")
        })
      }

      // Continue the optimization loop
      requestAnimationFrame(optimizeAnimations)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Start animation optimization
    const animationFrame = requestAnimationFrame(optimizeAnimations)

    // Add CSS for animation pausing
    const style = document.createElement("style")
    style.textContent = `
      .is-scrolling .motion-reduce {
        animation-play-state: paused !important;
        transition: none !important;
      }
      
      .animation-paused {
        animation-play-state: paused !important;
      }
      
      /* Optimize rendering */
      .optimize-gpu {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
    `
    document.head.appendChild(style)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
      cancelAnimationFrame(animationFrame)
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return null
}

