"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { motion } from "framer-motion"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

const thumbnails = [
  {
    id: 1,
    title: "Babar Resigns: Good Decision?",
    image: "/thumbnails/babar-resigns.jpeg",
    category: "Cricket Analysis",
  },
  {
    id: 2,
    title: "Solo Domination in Europe Tournament",
    image: "/thumbnails/solo-domination.jpeg",
    category: "Gaming",
  },
  {
    id: 3,
    title: "PMGC 2024 Watch Party - Group Green",
    image: "/thumbnails/watch-party-green.jpeg",
    category: "Gaming Event",
  },
  {
    id: 4,
    title: "PMGC 2024 Watch Party - Group Yellow",
    image: "/thumbnails/watch-party-yellow.jpeg",
    category: "Gaming Event",
  },
  {
    id: 5,
    title: "PMGC 2024 Watch Party - Group Red",
    image: "/thumbnails/watch-party-red.jpeg",
    category: "Gaming Event",
  },
  {
    id: 6,
    title: "Is This The Fault In Babar's Technique?",
    image: "/thumbnails/babar-technique.jpeg",
    category: "Cricket Analysis",
  },
  {
    id: 7,
    title: "Ashwin Saved India!! Babar's Century",
    image: "/thumbnails/ashwin-saved.jpeg",
    category: "Cricket Highlights",
  },
  {
    id: 8,
    title: "Don't Rush - PUBG Mobile Tactics",
    image: "/thumbnails/dont-rush.jpeg",
    category: "Gaming Tips",
  },
]

export default function Thumbnails() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            YouTube Thumbnails
          </motion.h1>

          <motion.p
            className="text-center text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Eye-catching YouTube thumbnails designed to maximize click-through rates while maintaining brand
            consistency. Standard YouTube dimensions (1280×720 pixels) with high visibility text and engaging visuals.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnails.map((thumbnail, index) => (
              <motion.div
                key={thumbnail.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={thumbnail.image || "/placeholder.svg"}
                    alt={thumbnail.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1">{thumbnail.title}</h3>
                  <p className="text-sm text-gray-400">{thumbnail.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Navigation />
      </div>
    </ErrorBoundary>
  )
}

