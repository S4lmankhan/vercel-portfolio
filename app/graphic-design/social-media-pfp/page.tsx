"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { motion } from "framer-motion"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

const pfpItems = [
  {
    id: 1,
    title: "Luxury Teal Handbag",
    description: "Elegant teal handbag with gold accents in a luminous circular frame with feathers",
    image: "/social-media-pfp/luxury-bag-teal-1.jpeg",
    category: "Product Photography",
    client: "Luxury Fashion Brand",
  },
  {
    id: 2,
    title: "Two-Tone Designer Bag",
    description: "Teal and cream designer handbag displayed in a premium circular frame",
    image: "/social-media-pfp/luxury-bag-teal-cream.jpeg",
    category: "Product Photography",
    client: "Fashion Influencer",
  },
  {
    id: 3,
    title: "Classic Brown Leather",
    description: "Timeless brown leather handbag suspended in an ornate circular frame",
    image: "/social-media-pfp/luxury-bag-brown.jpeg",
    category: "Product Photography",
    client: "Luxury Retailer",
  },
  {
    id: 4,
    title: "Cognac Leather Elegance",
    description: "Rich cognac leather bag in a delicate circular display with soft lighting",
    image: "/social-media-pfp/luxury-bag-brown-2.jpeg",
    category: "Product Photography",
    client: "Fashion House",
  },
  {
    id: 5,
    title: "Emerald Velvet Collection",
    description: "Emerald green velvet handbag with gold hardware in a celestial setting",
    image: "/social-media-pfp/luxury-bag-teal-2.jpeg",
    category: "Product Photography",
    client: "Luxury Brand",
  },
  {
    id: 6,
    title: "Burgundy Statement Piece",
    description: "Deep burgundy leather handbag in a crystalline circular frame",
    image: "/social-media-pfp/luxury-bag-red.jpeg",
    category: "Product Photography",
    client: "Fashion Boutique",
  },
  {
    id: 7,
    title: "Radiant Bags - White Marmont",
    description: "White Gucci Marmont camera bag with chevron quilting and gold GG logo",
    image: "/social-media-pfp/radiant-bags-new.jpeg",
    category: "Brand Identity",
    client: "Luxury Reseller",
  },
  {
    id: 8,
    title: "Bagged Divas - Monogram Pochette",
    description: "Gucci monogram pochette with brown leather trim and gold chain strap",
    image: "/social-media-pfp/bagged-divas-new.jpeg",
    category: "Brand Identity",
    client: "Handbag Boutique",
  },
  {
    id: 9,
    title: "Bags for Elites - Classic Flap",
    description: "Chanel classic flap bag in quilted black leather with gold hardware",
    image: "/social-media-pfp/bags-for-elites-new.jpeg",
    category: "Brand Identity",
    client: "Luxury Consignment",
  },
  {
    id: 10,
    title: "Bags for Divas - Pink Classic",
    description: "Chanel classic flap bag in quilted pink leather with gold chain strap",
    image: "/social-media-pfp/bags-for-divas-new.jpeg",
    category: "Brand Identity",
    client: "Fashion Influencer",
  },
  {
    id: 11,
    title: "Bagged Divas - Canvas Tote",
    description: "Chanel canvas tote with leather handles and embroidered logo",
    image: "/social-media-pfp/bagged-divas-tote-new.jpeg",
    category: "Brand Identity",
    client: "Luxury Accessories Shop",
  },
]

export default function SocialMediaPFP() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Social Media Profile Pictures
          </motion.h1>

          <motion.p
            className="text-gray-300 text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Elevate your brand's social media presence with these premium profile pictures. Each design is crafted to
            capture attention and convey luxury, elegance, and professionalism.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pfpItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative aspect-square">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{item.category}</span>
                    <span>Client: {item.client}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Navigation />
      </div>
    </ErrorBoundary>
  )
}

