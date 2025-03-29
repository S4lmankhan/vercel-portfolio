"use client"

import { ErrorBoundary } from "./error-boundary"
import { Home, Code, Palette, Video, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRef } from "react"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isLight = theme === "light"

  const navItems = [
    { icon: <Home className="h-5 w-5" />, href: "/", label: "Home" },
    { icon: <Palette className="h-5 w-5" />, href: "/graphic-design", label: "Graphic Design" },
    { icon: <Code className="h-5 w-5" />, href: "/web-development", label: "Web Development" },
    { icon: <Video className="h-5 w-5" />, href: "/video-editing", label: "Video Editing" },
    { icon: <Database className="h-5 w-5" />, href: "/ai-automation", label: "AI Automation" },
    { icon: <Cpu className="h-5 w-5" />, href: "/ai-ml", label: "AI/ML" },
  ]

  return (
    <ErrorBoundary>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <div
          ref={navRef}
          className={`rounded-full p-2 flex justify-between items-center shadow-lg relative overflow-hidden ${
            isLight
              ? "bg-white/90 backdrop-blur-md border border-purple-200"
              : "bg-gray-800/80 backdrop-blur-md border border-gray-700"
          }`}
        >
          {/* Animated light effect that revolves around the entire navbar */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className={`absolute w-3 h-3 rounded-full filter blur-sm ${isLight ? "bg-purple-600" : "bg-purple-500"}`}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              style={{
                top: -1.5,
                left: "50%",
                transformOrigin: "center 24px",
              }}
            />
          </div>

          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full nav-item ${
                        pathname === item.href
                          ? isLight
                            ? "text-purple-700 bg-purple-50"
                            : "text-purple-400 bg-gray-700"
                          : isLight
                            ? "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                            : "text-gray-400 hover:text-purple-400 hover:bg-gray-700"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {item.icon}
                      </motion.div>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className={
                    isLight ? "bg-white border-gray-200 text-gray-800" : "bg-gray-800 border-gray-700 text-white"
                  }
                  sideOffset={5}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.p>
                </TooltipContent>
              </Tooltip>
            ))}
            <Link href="/hire-me">
              <Button
                className={`text-white rounded-full text-sm px-4 hire-button ${
                  isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"
                }`}
              >
                Hire Me
              </Button>
            </Link>
          </TooltipProvider>
        </div>
      </div>
    </ErrorBoundary>
  )
}

