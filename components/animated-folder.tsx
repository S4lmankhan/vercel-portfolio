"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"

interface AnimatedFolderProps {
  color: string
  label: string
  href: string
  type?: "folder" | "file"
  size?: number
}

export default function AnimatedFolder({ color, label, href, type = "folder", size = 1 }: AnimatedFolderProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Link href={href} className="group">
      <motion.div
        className="flex flex-col items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="relative"
          style={{
            width: `${60 * size}px`,
            height: `${50 * size}px`,
          }}
        >
          {/* Folder tab */}
          {type === "folder" && (
            <div
              className="absolute top-0 left-[15%] w-[70%] h-[12%] rounded-t-md z-10"
              style={{ backgroundColor: color }}
            />
          )}

          {/* Folder body */}
          <div
            className="absolute top-[10%] left-0 w-full h-[90%] rounded-md shadow-lg transition-all duration-200 group-hover:shadow-xl"
            style={{
              backgroundColor: color,
              boxShadow: isDark
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 15px 0 ${color}40`
                : `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 15px 0 ${color}40`,
            }}
          />

          {/* File icon details */}
          {type === "file" && (
            <>
              <div
                className="absolute top-[30%] left-[20%] w-[60%] h-[8%] rounded-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
              />
              <div
                className="absolute top-[45%] left-[20%] w-[60%] h-[8%] rounded-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
              />
              <div
                className="absolute top-[60%] left-[20%] w-[40%] h-[8%] rounded-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
              />
            </>
          )}
        </div>
        <p
          className="text-sm font-medium text-center mt-1 max-w-[80px] truncate"
          style={{ fontSize: `${14 * size}px` }}
        >
          {label}
        </p>
      </motion.div>
    </Link>
  )
}

