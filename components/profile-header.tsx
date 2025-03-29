"use client"

import { useState } from "react"
import Image from "next/image"
import { Linkedin, Github, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AboutMeDialog } from "./about-me-dialog"
import { InstagramPopup } from "./instagram-popup"
import { useTheme } from "next-themes"

export function ProfileHeader() {
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false)
  const [isInstagramPopupOpen, setIsInstagramPopupOpen] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <motion.div
          className="relative cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsAboutMeOpen(true)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1727436722869.jpg-q6BDAhKehuvDqf1o5iMR6cr3InsWxy.jpeg"
            alt="Salman Khan"
            width={80}
            height={80}
            className={`rounded-full object-cover ${
              isLight ? "border-2 border-purple-400" : "border-2 border-purple-500"
            }`}
          />
          <div className="absolute inset-0 bg-purple-500/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-xs text-white font-medium">About Me</span>
          </div>
        </motion.div>
        <div className="flex flex-col">
          <motion.h1
            className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Salman Khan
          </motion.h1>
          <motion.p
            className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Cryptography, Blockchain & AI-ML Enthusiast
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-2 ml-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-green-500 text-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Available for hire
          </span>
        </motion.div>
      </div>
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a href="https://www.linkedin.com/in/s4lmankhan/" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-md ${
                isLight
                  ? "bg-white border-gray-200 text-purple-700 hover:text-purple-600 hover:bg-purple-50"
                  : "bg-gray-800 border-gray-700 text-purple-400 hover:text-purple-300 hover:bg-gray-700"
              }`}
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </a>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a href="https://github.com/S4lmankhan" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-md ${
                isLight
                  ? "bg-white border-gray-200 text-purple-700 hover:text-purple-600 hover:bg-purple-50"
                  : "bg-gray-800 border-gray-700 text-purple-400 hover:text-purple-300 hover:bg-gray-700"
              }`}
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-md ${
              isLight
                ? "bg-white border-gray-200 text-purple-700 hover:text-purple-600 hover:bg-purple-50"
                : "bg-gray-800 border-gray-700 text-purple-400 hover:text-purple-300 hover:bg-gray-700"
            }`}
            onClick={() => setIsInstagramPopupOpen(true)}
          >
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
        </motion.div>
      </div>

      <AboutMeDialog open={isAboutMeOpen} onOpenChange={setIsAboutMeOpen} />
      <InstagramPopup isOpen={isInstagramPopupOpen} onClose={() => setIsInstagramPopupOpen(false)} />
    </div>
  )
}

