"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"

interface ServiceFolderProps {
  title: string
  href: string
  color: string
  delay?: number
}

export function ServiceFolder({ title, href, color, delay = 0 }: ServiceFolderProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Ensure the folder is fully visible
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Link href={href} className="block w-full">
        <div className="relative w-full aspect-square mb-2">
          {/* Folder tab */}
          <div
            className="absolute top-0 left-[15%] w-[70%] h-[12%] rounded-t-md z-10"
            style={{ backgroundColor: color }}
          />

          {/* Folder body */}
          <div
            className="absolute top-[10%] left-0 w-full h-[90%] rounded-md shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: isDark
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 15px 0 ${color}40`
                : `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 15px 0 ${color}40`,
            }}
          />
        </div>
        <p className="text-center font-medium truncate max-w-full px-2">{title}</p>
      </Link>
    </motion.div>
  )
}

