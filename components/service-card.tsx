"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface ServiceCardProps {
  title: string
  icon: React.ReactNode
  description: string
}

export function ServiceCard({ title, icon, description }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        className={`overflow-hidden hover:shadow-lg transition-all h-full service-card ${
          isLight
            ? "bg-white border-purple-200 hover:shadow-purple-100"
            : "bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:shadow-purple-500/20"
        }`}
      >
        <CardContent className="p-6 flex flex-col items-center gap-4 h-full">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className={`service-card-icon ${isLight ? "text-purple-700" : "text-purple-400"}`}
          >
            {icon}
          </motion.div>
          <h3 className={`font-medium text-center ${isLight ? "text-gray-800" : "text-white"}`}>{title}</h3>
          <p className={`text-sm text-center ${isLight ? "text-gray-600" : "text-gray-400"}`}>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

