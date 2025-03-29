"use client"
import { motion } from "framer-motion"
import AnimatedFolder from "./animated-folder"
import { useInView } from "react-intersection-observer"

interface ServiceItem {
  name: string
  href: string
  color: string
  type?: "folder" | "file"
}

interface ServiceFolderGridProps {
  title: string
  services: ServiceItem[]
}

export function ServiceFolderGrid({ title, services }: ServiceFolderGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Professional color palette
  const colors = {
    purple: {
      light: "#9333ea",
      medium: "#7c3aed",
      dark: "#6d28d9",
    },
    blue: {
      light: "#3b82f6",
      medium: "#2563eb",
      dark: "#1d4ed8",
    },
    pink: {
      light: "#ec4899",
      medium: "#db2777",
      dark: "#be185d",
    },
    teal: {
      light: "#14b8a6",
      medium: "#0d9488",
      dark: "#0f766e",
    },
    amber: {
      light: "#f59e0b",
      medium: "#d97706",
      dark: "#b45309",
    },
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div ref={ref} className="py-8 px-4">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={container}
        className="max-w-6xl mx-auto"
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          {title}
        </motion.h2>

        <motion.div
          variants={container}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center"
        >
          {services.map((service, index) => (
            <motion.div key={service.name} variants={item} className="flex flex-col items-center">
              <AnimatedFolder
                color={service.color || colors.purple.medium}
                label={service.name}
                href={service.href}
                type={service.type || "folder"}
                size={1}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

