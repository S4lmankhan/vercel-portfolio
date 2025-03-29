"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { motion } from "framer-motion"
import { Folder } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const services = [
  { title: "Logos", href: "/graphic-design/logos" },
  { title: "YouTube Banners", href: "/graphic-design/youtube-banners" },
  { title: "Brochures", href: "/graphic-design/brochures" },
  { title: "Flyers", href: "/graphic-design/flyers" },
  { title: "Animated Graphics", href: "/graphic-design/animated" },
  { title: "Vector Arts", href: "/graphic-design/vector" },
  { title: "3D Designs", href: "/graphic-design/3d" },
  { title: "3D Game Objects", href: "/graphic-design/game-objects" },
  { title: "Posters", href: "/graphic-design/posters" },
  { title: "Marketing Ads", href: "/graphic-design/ads" },
  { title: "Website Headers", href: "/graphic-design/headers" },
  { title: "Thumbnails", href: "/graphic-design/thumbnails" },
  { title: "Social Media PFP", href: "/graphic-design/social-media-pfp" },
]

export default function GraphicDesign() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Graphic Design Services
          </motion.h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <Folder className="w-12 h-12 text-purple-400" />
                      <h3 className="text-center text-white font-medium">{service.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <Navigation />
      </div>
    </ErrorBoundary>
  )
}

