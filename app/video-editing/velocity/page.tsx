"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

// Sample video data - replace with actual data later
const videos = [
  {
    id: 1,
    title: "Gaming Montage - Apex Legends",
    client: "Personal Project",
    description: "Fast-paced gaming montage showcasing epic moments and skilled gameplay in Apex Legends.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://example.com/video1.mp4", // Replace with actual video URL
    year: 2024,
    category: "Gaming",
    duration: "2:45",
  },
  {
    id: 2,
    title: "Product Showcase - Tech Gadget",
    client: "TechWorld",
    description: "Sleek and modern product showcase video highlighting the features of the latest tech gadget.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://example.com/video2.mp4", // Replace with actual video URL
    year: 2024,
    category: "Commercial",
    duration: "1:30",
  },
  {
    id: 3,
    title: "Music Video Edit - Electronic",
    client: "Music Artist",
    description: "Vibrant and energetic music video edit with synchronized visual effects and transitions.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://example.com/video3.mp4", // Replace with actual video URL
    year: 2023,
    category: "Music",
    duration: "3:15",
  },
  {
    id: 4,
    title: "Corporate Presentation",
    client: "Business Solutions Inc.",
    description: "Professional corporate presentation video with clean animations and informative graphics.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://example.com/video4.mp4", // Replace with actual video URL
    year: 2023,
    category: "Corporate",
    duration: "4:20",
  },
]

interface VideoPlayerProps {
  video: (typeof videos)[0]
  open: boolean
  onClose: () => void
}

function VideoPlayer({ video, open, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-4xl p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {video.title}
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video bg-black">
          {/* Replace with actual video player when you have real videos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative z-10">
              <motion.button
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </motion.button>
            </div>
          </div>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
            <div className="text-white text-sm">{isPlaying ? "Playing" : "Paused"}</div>
            <div className="flex items-center gap-2">
              <button
                className="text-white hover:text-purple-400 transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <div className="text-white text-sm">{video.duration}</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-1">Client</h3>
              <p className="text-gray-300">{video.client}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Category</h3>
              <p className="text-gray-300">{video.category}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Year</h3>
              <p className="text-gray-300">{video.year}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Duration</h3>
              <p className="text-gray-300">{video.duration}</p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">Description</h3>
            <p className="text-gray-300">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function VelocityEditsPage() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/video-editing">
          <motion.div
            className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Video Editing
          </motion.div>
        </Link>

        <motion.h1
          className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Velocity Edits Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Dynamic and high-energy video edits with seamless transitions and visual effects
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                <div className="relative aspect-video">
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-medium text-white mb-1">{video.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400">{video.category}</span>
                      <span className="text-gray-400 text-sm">{video.duration}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <motion.div
                      className="bg-purple-600/80 rounded-full p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedVideo && (
        <VideoPlayer video={selectedVideo} open={!!selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      <Navigation />
    </div>
  )
}

