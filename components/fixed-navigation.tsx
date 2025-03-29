"use client"

import { Home, Code, Palette, Video, Database, Cpu, UserPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function FixedNavigation() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isLight = theme === "light"
  const [mounted, setMounted] = useState(false)

  // Navigation items
  const navItems = [
    { icon: <Home className="h-5 w-5" />, href: "/", label: "Home" },
    { icon: <Palette className="h-5 w-5" />, href: "/graphic-design", label: "Graphic Design" },
    { icon: <Code className="h-5 w-5" />, href: "/web-development", label: "Web Development" },
    { icon: <Video className="h-5 w-5" />, href: "/video-editing", label: "Video Editing" },
    { icon: <Database className="h-5 w-5" />, href: "/ai-automation", label: "AI Automation" },
    { icon: <Cpu className="h-5 w-5" />, href: "/ai-ml", label: "AI/ML" },
  ]

  // Ensure the component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted, return null
  if (!mounted) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "0",
        right: "0",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          borderRadius: "9999px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          pointerEvents: "auto",
          backgroundColor: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(31, 41, 55, 0.9)",
          backdropFilter: "blur(8px)",
          border: isLight ? "1px solid rgba(196, 181, 253, 0.5)" : "1px solid rgba(75, 85, 99, 0.5)",
        }}
      >
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={{
              display: "block",
              textDecoration: "none",
            }}
          >
            <motion.div
              style={{
                padding: "8px",
                borderRadius: "9999px",
                transition: "all 0.2s",
                color: pathname === item.href ? (isLight ? "#7c3aed" : "#a78bfa") : isLight ? "#4b5563" : "#9ca3af",
                backgroundColor:
                  pathname === item.href
                    ? isLight
                      ? "rgba(237, 233, 254, 0.8)"
                      : "rgba(55, 65, 81, 0.8)"
                    : "transparent",
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              title={item.label}
            >
              {item.icon}
            </motion.div>
          </a>
        ))}

        <a
          href="/hire-me"
          style={{
            display: "block",
            textDecoration: "none",
            marginLeft: "8px",
          }}
        >
          <motion.div
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: isLight ? "#7c3aed" : "#8b5cf6",
              color: "white",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Hire Me"
          >
            <UserPlus className="h-4 w-4 mr-1.5" />
            Hire Me
          </motion.div>
        </a>
      </div>
    </div>
  )
}

