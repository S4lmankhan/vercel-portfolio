"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, ExternalLink, Github, Layers, Code, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample website data - replace with actual data later
const websites = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    client: "Fashion Boutique",
    description:
      "A sleek and responsive e-commerce website with advanced filtering, cart functionality, and secure checkout.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/site1",
    githubUrl: "https://github.com/example/site1",
    year: 2024,
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
  },
  {
    id: 2,
    title: "Corporate Portfolio",
    client: "Business Solutions Inc.",
    description:
      "Professional corporate website showcasing services, team members, and case studies with a modern design.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/site2",
    githubUrl: "https://github.com/example/site2",
    year: 2023,
    technologies: ["React", "GSAP", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Personal Blog",
    client: "Content Creator",
    description:
      "Minimalist blog website with content management system, search functionality, and newsletter subscription.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/site3",
    githubUrl: "https://github.com/example/site3",
    year: 2023,
    technologies: ["Gatsby", "GraphQL", "Netlify CMS", "Styled Components"],
  },
  {
    id: 4,
    title: "Restaurant Booking System",
    client: "Gourmet Dining",
    description: "Interactive restaurant website with online reservation system, menu display, and customer reviews.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/site4",
    githubUrl: "https://github.com/example/site4",
    year: 2024,
    technologies: ["Vue.js", "Firebase", "Express", "Tailwind CSS"],
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

export default function StaticWebsitesPage() {
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
          Static Websites Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Fast, responsive, and beautifully designed static websites for various clients and purposes
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

