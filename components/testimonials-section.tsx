"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { TestimonialCard } from "./testimonial-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Startup Founder",
      testimonial:
        "Salman's 3D designs took my brand to the next level! His attention to detail and creativity exceeded my expectations.",
      service: "Graphic Design",
      imageSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      testimonial:
        "Working with Salman on our website redesign was a game-changer. He delivered a responsive, beautiful site that's increased our conversions by 40%.",
      service: "Web Development",
      imageSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      testimonial:
        "The video edits Salman created for my YouTube channel are phenomenal. My engagement has skyrocketed since we started working together.",
      service: "Video Editing",
      imageSrc: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Priya Patel",
      role: "Tech Entrepreneur",
      testimonial:
        "Salman's AI solution automated our entire customer service workflow. What used to take hours now happens instantly with better results.",
      service: "AI & Automation",
      imageSrc: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      name: "David Wilson",
      role: "Game Developer",
      testimonial:
        "The 3D game assets Salman created were exactly what our project needed. His understanding of both design and functionality is impressive.",
      service: "3D Design",
      imageSrc: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "E-commerce Owner",
      testimonial:
        "Salman's blockchain implementation for our loyalty program has been revolutionary. Our customers love the transparency and security.",
      service: "Blockchain Development",
      imageSrc: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (testimonials.length - 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4" ref={ref}>
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 className="text-2xl font-bold text-white" variants={item}>
          What Clients Say
        </motion.h2>
        <motion.div className="flex gap-2" variants={item}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-800 border-gray-700 text-purple-400 hover:text-purple-300"
            onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length - 2) % (testimonials.length - 2))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-gray-800 border-gray-700 text-purple-400 hover:text-purple-300"
            onClick={() => setCurrent((prev) => (prev + 1) % (testimonials.length - 2))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {testimonials.slice(current, current + 3).map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

