"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronRight, ArrowRight, Code, Palette, FileText, CheckCircle, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface ProjectCaseStudyProps {
  title: string
  client: string
  timeline: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  imageSrc: string
  imageAlt: string
  galleryImages?: { src: string; alt: string }[]
}

export function ProjectCaseStudy({
  title,
  client,
  timeline,
  description,
  challenge,
  solution,
  results,
  technologies,
  imageSrc,
  imageAlt,
  galleryImages = [],
}: ProjectCaseStudyProps) {
  const [activeImage, setActiveImage] = useState(imageSrc)
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className={isLight ? "text-gray-700" : "text-gray-300"}>Portfolio</span>
            <ChevronRight className="h-3 w-3" />
            <span className={isLight ? "text-purple-700" : "text-purple-400"}>{title}</span>
          </div>

          <h1 className={`text-4xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>{title}</h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${isLight ? "bg-gray-100" : "bg-gray-800/50"}`}>
              <div className="flex items-center gap-2 mb-1">
                <FileText className={`h-4 w-4 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                <span className={`text-sm font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Client</span>
              </div>
              <p className={`font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{client}</p>
            </div>

            <div className={`p-4 rounded-lg ${isLight ? "bg-gray-100" : "bg-gray-800/50"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className={`h-4 w-4 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                <span className={`text-sm font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Timeline</span>
              </div>
              <p className={`font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{timeline}</p>
            </div>
          </div>

          <p className={`mb-8 leading-relaxed ${isLight ? "text-gray-700" : "text-gray-300"}`}>{description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <Button
            className={`group ${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
          >
            View Live Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image src={activeImage || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
          </div>

          {galleryImages.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              <div
                className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeImage === imageSrc
                    ? isLight
                      ? "border-purple-600"
                      : "border-purple-500"
                    : "border-transparent"
                }`}
                onClick={() => setActiveImage(imageSrc)}
              >
                <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
              </div>

              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                    activeImage === img.src
                      ? isLight
                        ? "border-purple-600"
                        : "border-purple-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(img.src)}
                >
                  <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Challenge and Solution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`p-8 rounded-xl ${
            isLight
              ? "bg-white border border-gray-200 shadow-sm"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-full ${isLight ? "bg-purple-100" : "bg-purple-900/30"}`}>
              <Code className={`h-5 w-5 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
            </div>
            <h2 className={`text-xl font-bold ${isLight ? "text-gray-800" : "text-white"}`}>The Challenge</h2>
          </div>

          <p className={`leading-relaxed ${isLight ? "text-gray-700" : "text-gray-300"}`}>{challenge}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`p-8 rounded-xl ${
            isLight
              ? "bg-white border border-gray-200 shadow-sm"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-full ${isLight ? "bg-purple-100" : "bg-purple-900/30"}`}>
              <Palette className={`h-5 w-5 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
            </div>
            <h2 className={`text-xl font-bold ${isLight ? "text-gray-800" : "text-white"}`}>The Solution</h2>
          </div>

          <p className={`leading-relaxed ${isLight ? "text-gray-700" : "text-gray-300"}`}>{solution}</p>
        </motion.div>
      </div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className={`text-2xl font-bold mb-8 text-center ${isLight ? "text-gray-800" : "text-white"}`}>
          Results & Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className={`p-6 rounded-xl ${
                isLight
                  ? "bg-white border border-gray-200 shadow-sm"
                  : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full mt-1 ${isLight ? "bg-purple-100" : "bg-purple-900/30"}`}>
                  <CheckCircle className={`h-5 w-5 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                </div>
                <p className={`leading-relaxed ${isLight ? "text-gray-700" : "text-gray-300"}`}>{result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className={`text-2xl font-bold mb-8 text-center ${isLight ? "text-gray-800" : "text-white"}`}>
          Project Timeline
        </h2>

        <div
          className={`p-8 rounded-xl ${
            isLight
              ? "bg-white border border-gray-200 shadow-sm"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          }`}
        >
          <div className="flex flex-col space-y-8">
            {[
              {
                phase: "Discovery & Planning",
                duration: "2 weeks",
                description: "Requirements gathering, stakeholder interviews, and project planning.",
              },
              {
                phase: "Design & Prototyping",
                duration: "3 weeks",
                description: "Creating wireframes, mockups, and interactive prototypes.",
              },
              {
                phase: "Development",
                duration: "6 weeks",
                description: "Frontend and backend development with regular client check-ins.",
              },
              {
                phase: "Testing & Refinement",
                duration: "2 weeks",
                description: "Quality assurance testing, bug fixes, and final refinements.",
              },
              {
                phase: "Launch & Support",
                duration: "1 week",
                description: "Deployment, client training, and post-launch support.",
              },
            ].map((phase, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      isLight ? "bg-purple-700 text-white" : "bg-purple-600 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 4 && <div className={`w-0.5 h-full ${isLight ? "bg-purple-200" : "bg-purple-900/30"}`} />}
                </div>
                <div className="pb-8">
                  <div className="flex items-center">
                    <h3 className={`text-lg font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{phase.phase}</h3>
                    <span
                      className={`ml-4 px-3 py-1 rounded-full text-xs ${
                        isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                      }`}
                    >
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      {phase.duration}
                    </span>
                  </div>
                  <p className={`mt-2 ${isLight ? "text-gray-600" : "text-gray-400"}`}>{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

