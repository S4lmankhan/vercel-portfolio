"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { ErrorBoundary } from "./error-boundary"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLight = theme === "light"

  return (
    <ErrorBoundary>
      <div className="fixed top-4 right-4 z-50">
        <div
          className={`rounded-full p-1 flex items-center border shadow-md ${
            isLight
              ? "bg-white/90 backdrop-blur-md border-purple-200"
              : "bg-gray-800/80 backdrop-blur-md border-gray-700"
          }`}
        >
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full transition-colors ${
              theme === "light" ? "bg-purple-100 text-purple-700" : "text-gray-400 hover:text-yellow-400"
            }`}
            aria-label="Light mode"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Sun className="h-4 w-4" />
            </motion.div>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-full transition-colors ${
              theme === "dark" ? "bg-gray-700 text-blue-400" : "text-gray-400 hover:text-blue-400"
            }`}
            aria-label="Dark mode"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Moon className="h-4 w-4" />
            </motion.div>
          </button>

          <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-full transition-colors ${
              theme === "system"
                ? isLight
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-700 text-purple-400"
                : "text-gray-400 hover:text-purple-400"
            }`}
            aria-label="System preference"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Monitor className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

