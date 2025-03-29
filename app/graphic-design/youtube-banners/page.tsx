"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function YouTubeBannersPage() {
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null)

  const banners = [
    {
      id: 1,
      title: "LION Brand Banner",
      description: "Minimalist banner design with shadow effects",
      image: "/youtube-banners/lion-banner.jpeg",
    },
    {
      id: 2,
      title: "ZAP Gaming Banner",
      description: "Dynamic banner with neon effects and energy visuals",
      image: "/youtube-banners/zap-banner.jpeg",
    },
    {
      id: 3,
      title: "STALKZ Channel Banner",
      description: "Cool blue themed banner with ice crystal effects",
      image: "/youtube-banners/stalkz-banner.jpeg",
    },
    {
      id: 4,
      title: "Minimalist M Banner",
      description: "Abstract monochromatic design with textured elements",
      image: "/youtube-banners/m-banner.jpeg",
    },
    {
      id: 5,
      title: "Comic Insights Orange Banner",
      description: "Vibrant comic-style banner with character mascot",
      image: "/youtube-banners/comic-insights-banner-1.jpeg",
    },
    {
      id: 6,
      title: "Comic Insights Red Banner",
      description: "Halftone pattern banner with cartoon character",
      image: "/youtube-banners/comic-insights-banner-2.jpeg",
    },
    {
      id: 7,
      title: "Comic Insights Stacked Banner",
      description: "Multi-layered comic banner design",
      image: "/youtube-banners/comic-insights-banner-3.jpeg",
    },
    {
      id: 8,
      title: "Sports Insights Banner",
      description: "Dynamic sports channel banner with light streaks",
      image: "/youtube-banners/sports-insights-banner.jpeg",
    },
    {
      id: 9,
      title: "Short Movies Insights Banner",
      description: "Cinematic banner with dramatic lighting and metallic text",
      image: "/youtube-banners/short-movies-banner.jpeg",
    },
  ]

  const selectedBannerData = selectedBanner !== null ? banners.find((banner) => banner.id === selectedBanner) : null

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="flex items-center mb-8">
        <Link
          href="/graphic-design"
          className="flex items-center text-purple-500 hover:text-purple-600 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Graphic Design</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">YouTube Banners</h1>

      <p className="text-lg mb-12 max-w-3xl mx-auto text-center">
        Eye-catching YouTube channel banners designed to enhance brand identity, attract viewers, and maintain visual
        consistency across different platforms.
      </p>

      <div className="grid grid-cols-1 gap-12 mb-16">
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => setSelectedBanner(banner.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: banner.id * 0.1 }}
          >
            <div className="aspect-[16/3] relative w-full overflow-hidden">
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-40 flex items-end">
              <div className="p-6 translate-y-full transition-transform duration-300 group-hover:translate-y-0 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
                <p className="text-gray-200">{banner.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">YouTube Banner Design Services</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Custom banner designs tailored to your channel's theme and content</li>
          <li>Optimized for YouTube's recommended dimensions (2560 x 1440 pixels)</li>
          <li>Responsive designs that look great on all devices</li>
          <li>Brand consistency across your social media platforms</li>
          <li>Quick turnaround time with multiple revision options</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          All banners are delivered in high-resolution formats suitable for YouTube and other social media platforms.
        </p>
      </div>

      {/* Enlarged Banner Modal */}
      <AnimatePresence>
        {selectedBanner !== null && selectedBannerData && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBanner(null)}
          >
            <motion.div
              className="relative max-w-7xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white z-10 hover:bg-opacity-70 transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedBanner(null)
                }}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/3] w-full">
                <Image
                  src={selectedBannerData.image || "/placeholder.svg"}
                  alt={selectedBannerData.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>

              <div className="bg-black bg-opacity-70 p-4 text-white">
                <h3 className="text-xl font-bold">{selectedBannerData.title}</h3>
                <p className="text-gray-300">{selectedBannerData.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

