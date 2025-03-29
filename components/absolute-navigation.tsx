"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AboutMeDialog } from "./about-me-dialog"

export function AbsoluteNavigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Create navigation if it doesn't exist
    const createNavigation = () => {
      if (!document.getElementById("absolute-navigation")) {
        const navContainer = document.createElement("div")
        navContainer.id = "absolute-navigation"
        navContainer.style.position = "fixed"
        navContainer.style.bottom = "20px"
        navContainer.style.left = "0"
        navContainer.style.right = "0"
        navContainer.style.zIndex = "99999"
        navContainer.style.display = "flex"
        navContainer.style.justifyContent = "center"
        document.body.appendChild(navContainer)
      }
    }

    // Run immediately and on event
    createNavigation()

    // Listen for recreation event
    const handleRecreateNav = () => {
      createNavigation()
    }

    document.addEventListener("recreate-navigation", handleRecreateNav)

    return () => {
      document.removeEventListener("recreate-navigation", handleRecreateNav)
    }
  }, [])

  if (!mounted) return null

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Web Dev", href: "/web-development" },
    { name: "Graphic Design", href: "/graphic-design" },
    { name: "Video Editing", href: "/video-editing" },
    { name: "AI Automation", href: "/ai-automation" },
    { name: "Hire Me", href: "/hire-me" },
  ]

  return (
    <div
      id="absolute-navigation"
      className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
    >
      <motion.div
        className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-full px-4 py-2 shadow-lg pointer-events-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-1 text-sm rounded-md transition-colors ${
                  isActive ? "text-white bg-purple-600" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          <AboutMeDialog />
        </nav>
      </motion.div>
    </div>
  )
}

