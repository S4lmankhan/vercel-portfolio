"use client"

import { useEffect } from "react"
import Script from "next/script"

export function PerformanceScript() {
  useEffect(() => {
    // Check for navigation and cursor elements
    const checkElements = () => {
      // Check for navigation
      if (!document.getElementById("absolute-navigation")) {
        const event = new Event("recreate-navigation")
        document.dispatchEvent(event)
      }

      // Check for cursor
      if (!document.getElementById("cursor-dot")) {
        const event = new Event("recreate-cursor")
        document.dispatchEvent(event)
      }
    }

    // Run checks periodically
    const interval = setInterval(checkElements, 2000)

    // Run checks on various events
    const events = ["scroll", "click", "resize", "visibilitychange"]
    events.forEach((event) => {
      window.addEventListener(event, checkElements)
    })

    return () => {
      clearInterval(interval)
      events.forEach((event) => {
        window.removeEventListener(event, checkElements)
      })
    }
  }, [])

  return (
    <Script id="performance-monitor" strategy="afterInteractive">
      {`
        // Monitor for performance issues
        let lastFrameTime = performance.now()
        let frameCount = 0
        let lowFpsCount = 0
        
        function checkFrameRate() {
          const now = performance.now()
          const delta = now - lastFrameTime
          frameCount++
          
          if (delta >= 1000) {
            const fps = Math.round((frameCount * 1000) / delta)
            
            // If FPS is consistently low, reduce animations
            if (fps < 30) {
              lowFpsCount++
              
              if (lowFpsCount >= 3) {
                // Apply performance optimizations
                document.documentElement.classList.add('reduce-animations')
                
                // Reduce particle count if background exists
                const event = new CustomEvent('reduce-particles', { detail: { factor: 0.5 } })
                document.dispatchEvent(event)
              }
            } else {
              lowFpsCount = Math.max(0, lowFpsCount - 1)
            }
            
            frameCount = 0
            lastFrameTime = now
          }
          
          requestAnimationFrame(checkFrameRate)
        }
        
        // Start monitoring
        requestAnimationFrame(checkFrameRate)
      `}
    </Script>
  )
}

