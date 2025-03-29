"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Code, Palette } from "lucide-react"
import { ErrorBoundary } from "./error-boundary"

interface InstagramPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function InstagramPopup({ isOpen, onClose }: InstagramPopupProps) {
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null)

  const accounts = [
    {
      id: "coding",
      name: "Code with Salty",
      username: "codewithsalty",
      url: "https://www.instagram.com/codewithsalty/",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500 to-purple-500",
      description: "Follow my coding journey and web development projects",
    },
    {
      id: "design",
      name: "Salty FX",
      username: "saltyy_fx",
      url: "https://www.instagram.com/saltyy_fx/",
      icon: <Palette className="h-6 w-6" />,
      color: "from-pink-500 to-orange-500",
      description: "Check out my graphic design work and creative projects",
    },
  ]

  const openInstagram = (url: string) => {
    window.open(url, "_blank")
    onClose()
  }

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700 max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Choose Instagram Account</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {accounts.map((account) => (
                  <motion.div
                    key={account.id}
                    className="relative overflow-hidden rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredAccount(account.id)}
                    onHoverEnd={() => setHoveredAccount(null)}
                    onClick={() => openInstagram(account.url)}
                  >
                    <div className={`bg-gradient-to-r ${account.color} p-6 relative`}>
                      {/* Instagram-style animated gradient border */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                          opacity: 0.3,
                          zIndex: 0,
                        }}
                      />

                      <div className="relative z-10 flex items-center">
                        <div className="bg-white rounded-full p-2 mr-4">{account.icon}</div>
                        <div>
                          <h3 className="text-white font-bold">{account.name}</h3>
                          <p className="text-white/80 text-sm">@{account.username}</p>
                        </div>
                      </div>

                      <p className="text-white/90 mt-4 relative z-10">{account.description}</p>

                      {/* Animated follow button */}
                      <motion.button
                        className="mt-4 bg-white text-black font-medium px-4 py-2 rounded-lg relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Follow @{account.username}
                      </motion.button>

                      {/* Floating Instagram icons */}
                      <AnimatePresence>
                        {hoveredAccount === account.id && (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                  opacity: 0,
                                  scale: 0,
                                  x: Math.random() * 200 - 100,
                                  y: Math.random() * 100 - 50,
                                }}
                                animate={{
                                  opacity: [0, 0.7, 0],
                                  scale: [0, 1, 0.5],
                                  y: [0, -100 - i * 20],
                                  x: [0, (i % 2 === 0 ? 30 : -30) + (Math.random() * 40 - 20)],
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                style={{
                                  bottom: "20%",
                                  left: "50%",
                                }}
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </motion.div>
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  )
}

