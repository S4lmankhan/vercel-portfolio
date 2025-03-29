"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "AI-Powered Healthcare Platform",
    subtitle: "Revolutionizing patient care with artificial intelligence",
    description:
      "An innovative healthcare platform that leverages AI for better patient outcomes and streamlined operations.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-14%20005602-B9fwQ6FdY6StLaq5zb2fL9filtn63z.png",
    link: "#",
    category: "Healthcare",
    stats: [
      { label: "Patient Satisfaction", value: "95%" },
      { label: "Time Saved", value: "60%" },
      { label: "Accuracy Rate", value: "99.9%" },
    ],
  },
  {
    id: 2,
    title: "Next-Gen Productivity Suite",
    subtitle: "Redefine Productivity, Collaborate & Work Effortlessly",
    description: "A comprehensive productivity platform that helps teams collaborate seamlessly and achieve more.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-14%20005612-7M43VrLuFCw9OazXKPPLxb0l9VKYVN.png",
    link: "#",
    category: "Productivity",
    stats: [
      { label: "Team Efficiency", value: "10X" },
      { label: "Task Completion", value: "42%" },
      { label: "User Satisfaction", value: "98%" },
    ],
  },
  {
    id: 3,
    title: "Mental Health AI Solution",
    subtitle: "Technologically driven Mental Health Solution with AI",
    description: "An AI-powered platform providing personalized mental health support and resources.",
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    category: "Healthcare",
    stats: [
      { label: "User Engagement", value: "85%" },
      { label: "Recovery Rate", value: "73%" },
      { label: "Satisfaction", value: "4.8/5" },
    ],
  },
]

export function ProjectsShowcase() {
  const [currentIndex, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrent((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      paginate(1)
    }, 3000) // Changed from 5000 to 3000 for faster transitions

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-900/50 to-black/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="bg-purple-600 text-white border-0">
            Featured Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2 text-white">Latest Projects</h2>
          <p className="text-gray-300">Explore some of my recent work and innovations</p>
        </motion.div>

        <div className="relative h-[600px] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="absolute w-full"
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-800/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  <div className="order-2 lg:order-1 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className="mb-4 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-colors">
                        {projects[currentIndex].category}
                      </Badge>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{projects[currentIndex].title}</h3>
                      <p className="text-xl text-gray-300 mb-4">{projects[currentIndex].subtitle}</p>
                      <p className="text-gray-400 mb-8">{projects[currentIndex].description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {projects[currentIndex].stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <a href={projects[currentIndex].link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-purple-600 hover:bg-purple-500 group">
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </motion.div>
                  </div>

                  <motion.div
                    className="order-1 lg:order-2 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 mix-blend-overlay" />
                      <Image
                        src={projects[currentIndex].image || "/placeholder.svg"}
                        alt={projects[currentIndex].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 border-gray-700 text-purple-400 hover:text-purple-300 hover:bg-gray-700 z-10"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 border-gray-700 text-purple-400 hover:text-purple-300 hover:bg-gray-700 z-10"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-purple-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

