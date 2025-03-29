"use client"

import { motion } from "framer-motion"
import { ErrorBoundary } from "./error-boundary"

interface ProfessionalAIIconProps {
  size?: number
  animated?: boolean
  className?: string
}

export function ProfessionalAIIcon({ size = 24, animated = true, className = "" }: ProfessionalAIIconProps) {
  return (
    <ErrorBoundary>
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        {/* Professional AI icon with neural network design */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Base circle */}
          <circle cx="12" cy="12" r="10" stroke="#8B5CF6" strokeWidth="1.5" />

          {/* Neural network pattern */}
          <path
            d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Connection lines */}
          <line x1="12" y1="6" x2="12" y2="4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="12" x2="20" y2="12" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="20" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="12" x2="4" y2="12" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />

          {/* Neural nodes */}
          <circle cx="12" cy="12" r="1.5" fill="#8B5CF6" />
          <circle cx="8" cy="8" r="1" fill="#8B5CF6" />
          <circle cx="16" cy="8" r="1" fill="#8B5CF6" />
          <circle cx="16" cy="16" r="1" fill="#8B5CF6" />
          <circle cx="8" cy="16" r="1" fill="#8B5CF6" />
        </svg>

        {/* Animated pulse effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500 opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

