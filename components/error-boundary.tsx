"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught error:", error)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-6"
        >
          <div className="bg-purple-900/30 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-10 w-10 text-purple-400" />
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold mb-4 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Something went wrong
        </motion.h3>

        <motion.p
          className="text-gray-300 mb-8 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          We're sorry, but this content is currently unavailable. We're working on it and will have it back soon.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-purple-400 group"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Try Again
          </Button>

          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white group">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}

