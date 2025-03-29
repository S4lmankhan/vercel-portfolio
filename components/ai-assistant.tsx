"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { ErrorBoundary } from "./error-boundary"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm Salman's AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("portfolio") || input.toLowerCase().includes("work")) {
        response =
          "You can check out my portfolio in the Projects section. I've worked on various projects including web development, AI applications, and graphic design."
      } else if (input.toLowerCase().includes("contact") || input.toLowerCase().includes("hire")) {
        response =
          "You can contact Salman through the 'Hire Me' button or the contact form. He's available for freelance projects and collaborations."
      } else if (input.toLowerCase().includes("skill") || input.toLowerCase().includes("experience")) {
        response =
          "Salman has expertise in web development, AI/ML, graphic design, and more. Check out the Skills section for a detailed breakdown."
      } else if (
        input.toLowerCase().includes("price") ||
        input.toLowerCase().includes("cost") ||
        input.toLowerCase().includes("rate")
      ) {
        response =
          "Pricing depends on the project scope and requirements. Please use the contact form to discuss your specific needs for a custom quote."
      } else {
        response =
          "Thanks for your message! Salman will get back to you soon. If you have specific questions about his services or portfolio, feel free to ask."
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <ErrorBoundary>
      <div className="fixed bottom-20 right-4 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-gray-800/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg w-80 sm:w-96 mb-4 overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gray-900 p-4 border-b border-gray-700">
                <h3 className="text-white font-medium">AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-gray-100">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white rounded-md p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isOpen ? "bg-purple-700" : "bg-purple-600"
          } hover:bg-purple-500 text-white rounded-full p-3 shadow-lg transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      </div>
    </ErrorBoundary>
  )
}

