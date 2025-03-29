"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample logo data - replace with actual data later
const logos = [
  {
    id: 1,
    title: "Black Emerald",
    client: "Luxury Brand",
    description:
      "Elegant logo design featuring a green emerald gemstone with metallic silver 'BE' lettering for a premium jewelry brand.",
    image: "/logos/black-emerald-1.png",
    year: 2024,
    industry: "Luxury & Jewelry",
    colors: ["#0D9D6A", "#333333", "#FFFFFF"],
  },
  {
    id: 2,
    title: "Black Emerald Gemstone",
    client: "Luxury Brand",
    description: "Minimalist version showcasing the emerald gemstone with bilingual branding in English and Arabic.",
    image: "/logos/black-emerald-2.png",
    year: 2024,
    industry: "Luxury & Jewelry",
    colors: ["#0D9D6A", "#333333", "#FFFFFF"],
  },
  {
    id: 3,
    title: "Black Emerald Premium",
    client: "Luxury Brand",
    description:
      "Alternative version with the emerald integrated into the silver 'BE' lettering for a cohesive luxury brand identity.",
    image: "/logos/black-emerald-3.png",
    year: 2024,
    industry: "Luxury & Jewelry",
    colors: ["#0D9D6A", "#333333", "#FFFFFF"],
  },
  {
    id: 4,
    title: "Kahani 1 Minute Ki",
    client: "Media Production",
    description:
      "Elegant logo with metallic silver script on an ornate gold frame, designed for a storytelling media platform.",
    image: "/logos/kahani-minute-ki.jpeg",
    year: 2024,
    industry: "Media & Entertainment",
    colors: ["#C0A080", "#EFEFEF", "#1A5276"],
  },
  {
    id: 5,
    title: "Sports Insights Dynamic",
    client: "Sports Media",
    description: "Bold, dynamic logo with metallic 3D text and motion effects for a sports analysis platform.",
    image: "/logos/sports-insights-1.jpeg",
    year: 2024,
    industry: "Sports Media",
    colors: ["#0077B6", "#FF8C00", "#EFEFEF"],
  },
  {
    id: 6,
    title: "Sports Insights Minimal",
    client: "Sports Media",
    description: "Clean, minimalist version of the Sports Insights brand with a warm gradient background.",
    image: "/logos/sports-insights-2.jpeg",
    year: 2024,
    industry: "Sports Media",
    colors: ["#0A3D62", "#FF8C00", "#E67E22"],
  },
  {
    id: 7,
    title: "Sports Insights Stadium",
    client: "Sports Media",
    description: "Premium version with a stadium background and dynamic lighting effects for broadcast applications.",
    image: "/logos/sports-insights-3.jpeg",
    year: 2024,
    industry: "Sports Media",
    colors: ["#0A3D62", "#FF8C00", "#EFEFEF"],
  },
  {
    id: 8,
    title: "Code with Salty",
    client: "Tech Education",
    description:
      "Modern tech-inspired logo with circuit board background and geometric elements for a coding education platform.",
    image: "/logos/code-with-salty.jpeg",
    year: 2024,
    industry: "Technology & Education",
    colors: ["#0A3D62", "#EFEFEF", "#ADFF2F"],
  },
  {
    id: 9,
    title: "M Monogram",
    client: "Modern Tech",
    description: "Geometric monogram design with clean lines and balanced proportions for a technology company.",
    image: "/logos/m-logo.png",
    year: 2024,
    industry: "Technology",
    colors: ["#FFFFFF", "#000000"],
  },
  {
    id: 10,
    title: "L Minimalist",
    client: "Design Studio",
    description:
      "Ultra-minimalist 'L' logo with subtle shadow effect, embodying simplicity and modern design principles.",
    image: "/logos/l-logo.jpeg",
    year: 2024,
    industry: "Design",
    colors: ["#333333", "#F5F5F5"],
  },
  {
    id: 11,
    title: "Comic Insights",
    client: "Entertainment Blog",
    description: "Playful cartoon-style logo with expressive eyes and bold typography for a comic review platform.",
    image: "/logos/comic-insights-1.jpeg",
    year: 2024,
    industry: "Entertainment",
    colors: ["#FFD700", "#0077B6", "#FF3D00"],
  },
  {
    id: 12,
    title: "Comic Insights Speech Bubble",
    client: "Entertainment Blog",
    description:
      "Alternative design with a speech bubble concept, emphasizing the conversational nature of comic reviews.",
    image: "/logos/comic-insights-2.jpeg",
    year: 2024,
    industry: "Entertainment",
    colors: ["#FFD700", "#0077B6", "#F5DEB3"],
  },
]

interface LogoDetailsProps {
  logo: (typeof logos)[0]
  open: boolean
  onClose: () => void
}

function LogoDetails({ logo, open, onClose }: LogoDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {logo.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={logo.image || "/placeholder.svg"} alt={logo.title} fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-1">Client</h3>
              <p className="text-gray-300">{logo.client}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">Description</h3>
              <p className="text-gray-300">{logo.description}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">Industry</h3>
              <p className="text-gray-300">{logo.industry}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">Year</h3>
              <p className="text-gray-300">{logo.year}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">Color Palette</h3>
              <div className="flex gap-2">
                {logo.colors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-700"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function LogosPage() {
  const [selectedLogo, setSelectedLogo] = useState<(typeof logos)[0] | null>(null)

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
    <ErrorBoundary>
      <div className="min-h-screen pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/graphic-design">
            <motion.div
              className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Graphic Design
            </motion.div>
          </Link>

          <motion.h1
            className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Logo Design Portfolio
          </motion.h1>

          <motion.p
            className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A collection of logo designs crafted with creativity and purpose
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedLogo(logo)}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image src={logo.image || "/placeholder.svg"} alt={logo.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{logo.title}</h3>
                  <p className="text-gray-400 text-sm">{logo.client}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {selectedLogo && (
          <LogoDetails logo={selectedLogo} open={!!selectedLogo} onClose={() => setSelectedLogo(null)} />
        )}

        <Navigation />
      </div>
    </ErrorBoundary>
  )
}

