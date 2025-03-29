"use client"

import { motion } from "framer-motion"
import { Construction, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

interface ComingSoonProps {
  title: string
  description?: string
  backLink: string
  backLinkText: string
}

export function ComingSoon({ title, description, backLink, backLinkText }: ComingSoonProps) {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="bg-purple-900/30 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
            <Construction className="h-12 w-12 text-purple-400" />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description || "This section is currently under development. Please check back soon for updates!"}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link href={backLink}>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-purple-400 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {backLinkText}
            </Button>
          </Link>
        </motion.div>
      </div>
      <Navigation />
    </div>
  )
}

