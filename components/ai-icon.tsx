"use client"

import { motion } from "framer-motion"
import { ErrorBoundary } from "./error-boundary"
import Image from "next/image"

interface AIIconProps {
  size?: number
  animated?: boolean
  className?: string
}

export function AIIcon({ size = 24, animated = true, className = "" }: AIIconProps) {
  return (
    <ErrorBoundary>
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        {/* Robot AI icon */}
        <Image src="/ai-robot.png" alt="AI Assistant" width={size} height={size} className="absolute inset-0" />

        {/* Animated pulse effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500 opacity-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

