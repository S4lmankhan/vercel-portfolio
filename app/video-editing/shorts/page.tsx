"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, X } from "lucide-react"
import Link from "next/link"

// Sample shorts data - replace with actual data later
const shorts = [
  {
    id: 1,
    title: "Product Showcase",
    client: "Tech Gadgets",
    description:
      "Quick and engaging product showcase for a new tech gadget, highlighting key features in a visually appealing way.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video1.mp4", // Replace with actual video URL
    year: 2024,
    category: "Product",
    duration: "0:30",
    views: "1.2M",
  },
  {
    id: 2,
    title: "Cooking Recipe",
    client: "Food Channel",
    description:
      "Fast-paced cooking tutorial showing how to prepare a delicious meal in under a minute with clear instructions.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video2.mp4", // Replace with actual video URL
    year: 2024,
    category: "Food",
    duration: "0:45",
    views: "850K",
  },
  {
    id: 3,
    title: "Fitness Challenge",
    client: "Workout Pro",
    description: "Motivational fitness short demonstrating a quick workout challenge that viewers can try at home.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video3.mp4", // Replace with actual video URL
    year: 2023,
    category: "Fitness",
    duration: "0:35",
    views: "2.1M",
  },
  {
    id: 4,
    title: "Travel Highlights",
    client: "Adventure Seeker",
    description: "Stunning travel highlights showcasing breathtaking locations and experiences in a compact format.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video4.mp4", // Replace with actual video URL
    year: 2023,
    category: "Travel",
    duration: "0:40",
    views: "1.5M",
  },
  {
    id: 5,
    title: "Fashion Trends",
    client: "Style Magazine",
    description: "Quick look at the latest fashion trends with stylish transitions and eye-catching visuals.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video5.mp4", // Replace with actual video URL
    year: 2024,
    category: "Fashion",
    duration: "0:50",
    views: "950K",
  },
  {
    id: 6,
    title: "Gaming Highlights",
    client: "Pro Gamer",
    description: "Action-packed gaming highlights showcasing impressive gameplay moments with dynamic editing.",
    thumbnail: "/placeholder.svg?height=600&width=400",
    videoUrl: "https://example.com/video6.mp4", // Replace with actual video URL
    year: 2023,
    category: "Gaming",
    duration: "0:55",
    views: "1.8M",
  },
]

interface VideoPlayerProps {
  video: (typeof shorts)[0]
  open: boolean
  onClose: () => void
}

function VideoPlayer({ video, open, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-sm p-0">
        <DialogClose className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader className="p-3">
          <DialogTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {video.title}
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-[9/16] bg-black">
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
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
              </motion.button>
            </div>
          </div>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
            <div className="text-white text-xs">{video.duration}</div>
            <div className="flex items-center gap-2">
              <button
                className="text-white hover:text-purple-400 transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <div className="text-white text-xs">{video.views} views</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-white text-xs font-medium mb-1">Client</h3>
              <p className="text-gray-300 text-sm">{video.client}</p>
            </div>
            <div>
              <h3 className="text-white text-xs font-medium mb-1">Category</h3>
              <p className="text-gray-300 text-sm">{video.category}</p>
            </div>
            <div>
              <h3 className="text-white text-xs font-medium mb-1">Year</h3>
              <p className="text-gray-300 text-sm">{video.year}</p>
            </div>
            <div>
              <h3 className="text-white text-xs font-medium mb-1">Duration</h3>
              <p className="text-gray-300 text-sm">{video.duration}</p>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs font-medium mb-1">Description</h3>
            <p className="text-gray-300 text-sm">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function YouTubeShortsPage() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof shorts)[0] | null>(null)

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
          YouTube Shorts Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Engaging vertical video content optimized for maximum impact in minimal time
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {shorts.map((video) => (
            <motion.div
              key={video.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                <div className="relative aspect-[9/16]">
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs">{video.duration}</span>
                      <span className="text-gray-300 text-xs">{video.views}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <motion.div
                      className="bg-purple-600/80 rounded-full p-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium text-white truncate">{video.title}</h3>
                  <p className="text-purple-400 text-xs">{video.category}</p>
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

