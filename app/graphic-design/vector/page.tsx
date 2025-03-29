"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

type VectorArtwork = {
  id: string
  title: string
  description: string
  imagePath: string
  category: string
  style: string
}

const vectorArtworks: VectorArtwork[] = [
  {
    id: "stylish-man-orange",
    title: "Stylish Man in Orange",
    description: "Vector portrait of a sophisticated man in an orange suit with dramatic lighting and warm tones.",
    imagePath: "/vector-arts/stylish-man-orange.jpeg",
    category: "Portrait",
    style: "Modern Vector",
  },
  {
    id: "elderly-woman-flower",
    title: "Joyful Elder with Flower",
    description: "Cheerful elderly woman portrait with a flower in her hair, showcasing warmth and character.",
    imagePath: "/vector-arts/elderly-woman-flower.jpeg",
    category: "Portrait",
    style: "Character Vector",
  },
  {
    id: "geometric-woman",
    title: "Geometric Woman",
    description: "Cubist-inspired vector portrait with geometric shapes and bold color blocking.",
    imagePath: "/vector-arts/geometric-woman.jpeg",
    category: "Abstract Portrait",
    style: "Geometric Vector",
  },
  {
    id: "man-teal-suit",
    title: "Teal Suit Gentleman",
    description: "Stylish man in a vibrant teal suit with orange accents and sunglasses.",
    imagePath: "/vector-arts/man-teal-suit.jpeg",
    category: "Fashion Portrait",
    style: "Contemporary Vector",
  },
  {
    id: "young-man-colorful",
    title: "Youth in Color",
    description: "Young man portrait with vibrant geometric background elements in purple, teal, and orange.",
    imagePath: "/vector-arts/young-man-colorful.jpeg",
    category: "Portrait",
    style: "Pop Art Vector",
  },
  {
    id: "elderly-woman-flowers",
    title: "Elder with Floral Elements",
    description: "Joyful elderly woman surrounded by stylized flowers and organic shapes.",
    imagePath: "/vector-arts/elderly-woman-flowers.jpeg",
    category: "Character Portrait",
    style: "Decorative Vector",
  },
  {
    id: "elderly-woman-circle",
    title: "Circular Elder Portrait",
    description: "Elegant elderly woman portrait in a circular frame with complementary color palette.",
    imagePath: "/vector-arts/elderly-woman-circle.jpeg",
    category: "Portrait",
    style: "Minimal Vector",
  },
  {
    id: "elderly-woman-beige",
    title: "Elder in Warm Tones",
    description: "Warm-toned portrait of an elderly woman with expressive features against a beige background.",
    imagePath: "/vector-arts/elderly-woman-beige.jpeg",
    category: "Portrait",
    style: "Character Vector",
  },
  {
    id: "woman-sunglasses",
    title: "Retro Sunglasses",
    description: "Stylish woman with sunglasses and vibrant background in a retro-modern aesthetic.",
    imagePath: "/vector-arts/woman-sunglasses.jpeg",
    category: "Fashion Portrait",
    style: "Pop Art Vector",
  },
  {
    id: "woman-colorful-stripes",
    title: "Colorful Stripes Fashion",
    description: "Fashion-forward woman portrait with dynamic striped background in bold colors.",
    imagePath: "/vector-arts/woman-colorful-stripes.jpeg",
    category: "Fashion Portrait",
    style: "Contemporary Vector",
  },
]

export default function VectorArtsPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<VectorArtwork | null>(null)

  return (
    <div className="min-h-screen pb-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/graphic-design"
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Graphic Design</span>
          </Link>
        </div>

        <motion.h1
          className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Vector Art Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          A collection of stylized vector portraits and character illustrations showcasing various techniques and
          styles.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vectorArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all border border-gray-700 hover:border-purple-500"
              onClick={() => setSelectedArtwork(artwork)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="relative aspect-square">
                <Image
                  src={artwork.imagePath || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-lg">{artwork.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{artwork.style}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enlarged view modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-gray-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
              onClick={() => setSelectedArtwork(null)}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 relative">
                <div className="relative aspect-square">
                  <Image
                    src={selectedArtwork.imagePath || "/placeholder.svg"}
                    alt={selectedArtwork.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="md:w-1/3 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedArtwork.title}</h2>
                <p className="text-gray-300 mb-4">{selectedArtwork.description}</p>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Category</h3>
                    <p className="text-white">{selectedArtwork.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Style</h3>
                    <p className="text-white">{selectedArtwork.style}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Navigation />
    </div>
  )
}

