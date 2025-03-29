"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
  service: string
  imageSrc: string
}

export function TestimonialCard({ name, role, testimonial, service, imageSrc }: TestimonialCardProps) {
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="h-full"
    >
      <Card
        className={`overflow-hidden h-full testimonial-card ${
          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-800/50 backdrop-blur-sm border-gray-700"
        }`}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={name}
              width={50}
              height={50}
              className={`rounded-full object-cover h-[50px] w-[50px] ${
                isLight ? "border border-purple-300" : "border border-purple-500"
              }`}
            />
            <div>
              <h4 className={isLight ? "font-medium text-gray-800" : "font-medium text-white"}>{name}</h4>
              <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>{role}</p>
            </div>
          </div>
          <p className={`italic flex-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>"{testimonial}"</p>
          <div className={`mt-4 text-sm testimonial-service ${isLight ? "text-purple-700" : "text-purple-400"}`}>
            {service}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

