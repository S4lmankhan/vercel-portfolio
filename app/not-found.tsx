"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function NotFound() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <div className="bg-purple-900/30 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <span className="text-6xl">404</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className="text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-500 text-white group">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
        <Navigation />
      </div>
    </ErrorBoundary>
  )
}

