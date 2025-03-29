"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, ExternalLink, Github, Layers, Code, Monitor, Cpu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample AI tools website data - replace with actual data later
const websites = [
  {
    id: 1,
    title: "AI Text Generator",
    client: "ContentCreator Pro",
    description:
      "An advanced AI text generation tool that helps content creators produce high-quality articles, blog posts, and marketing copy.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/ai-text-generator",
    githubUrl: "https://github.com/example/ai-text-generator",
    year: 2024,
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel AI SDK"],
    features: ["Multiple content types", "Tone adjustment", "Export options", "SEO optimization"],
  },
  {
    id: 2,
    title: "Image Enhancement Tool",
    client: "PhotoPerfect AI",
    description:
      "AI-powered image enhancement tool that automatically improves photo quality, removes backgrounds, and applies artistic styles.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/image-enhancer",
    githubUrl: "https://github.com/example/image-enhancer",
    year: 2023,
    technologies: ["React", "TensorFlow.js", "Firebase", "Material UI"],
    features: ["Background removal", "Style transfer", "Resolution enhancement", "Batch processing"],
  },
  {
    id: 3,
    title: "AI Code Assistant",
    client: "DevBoost",
    description:
      "Intelligent code assistant that helps developers write better code faster with suggestions, bug detection, and automated refactoring.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/code-assistant",
    githubUrl: "https://github.com/example/code-assistant",
    year: 2024,
    technologies: ["Vue.js", "Node.js", "MongoDB", "CodeMirror"],
    features: ["Multi-language support", "Real-time suggestions", "Code refactoring", "Integration with GitHub"],
  },
  {
    id: 4,
    title: "Voice Transcription Platform",
    client: "SpeechToText Pro",
    description:
      "Accurate voice transcription service that converts audio to text in multiple languages with speaker identification and custom vocabulary.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/voice-transcription",
    githubUrl: "https://github.com/example/voice-transcription",
    year: 2023,
    technologies: ["Angular", "WebRTC", "AWS Transcribe", "Express"],
    features: ["Multi-language support", "Speaker identification", "Custom vocabulary", "Automatic punctuation"],
  },
]

interface WebsiteDetailsProps {
  website: (typeof websites)[0]
  open: boolean
  onClose: () => void
}

function WebsiteDetails({ website, open, onClose }: WebsiteDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-4xl p-0">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="relative aspect-video bg-black">
          <Image src={website.image || "/placeholder.svg"} alt={website.title} fill className="object-cover" />
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {website.title}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Layers className="h-4 w-4 mr-2 text-purple-400" />
                Client
              </h3>
              <p className="text-gray-300">{website.client}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-purple-400" />
                AI Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {website.features.map((feature) => (
                  <span key={feature} className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Code className="h-4 w-4 mr-2 text-purple-400" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {website.technologies.map((tech) => (
                  <span key={tech} className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Monitor className="h-4 w-4 mr-2 text-purple-400" />
                Year
              </h3>
              <p className="text-gray-300">{website.year}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-medium mb-2">Description</h3>
            <p className="text-gray-300">{website.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href={website.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-purple-600 hover:bg-purple-500">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Site
              </Button>
            </a>
            <a href={website.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-600">
                <Github className="h-4 w-4 mr-2" />
                View Source Code
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AIToolsWebsitesPage() {
  const [selectedWebsite, setSelectedWebsite] = useState<(typeof websites)[0] | null>(null)

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
        <Link href="/web-development">
          <motion.div
            className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Web Development
          </motion.div>
        </Link>

        <motion.h1
          className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          AI Tools Websites Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Cutting-edge AI-powered web applications that solve complex problems with intuitive interfaces
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {websites.map((website) => (
            <motion.div
              key={website.id}
              variants={item}
              whileHover={{ y: -10 }}
              className="cursor-pointer group"
              onClick={() => setSelectedWebsite(website)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                <div className="relative aspect-video">
                  <Image
                    src={website.thumbnail || "/placeholder.svg"}
                    alt={website.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="bg-purple-600/80 rounded-full p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white mb-1">{website.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400">{website.client}</span>
                    <span className="text-gray-400 text-sm">{website.year}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {website.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {website.technologies.length > 2 && (
                      <span className="bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded text-xs">
                        +{website.technologies.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedWebsite && (
        <WebsiteDetails website={selectedWebsite} open={!!selectedWebsite} onClose={() => setSelectedWebsite(null)} />
      )}

      <Navigation />
    </div>
  )
}

