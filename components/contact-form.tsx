"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { useTheme } from "next-themes"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        service: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 max-w-md mx-auto ${
        isLight
          ? "bg-white border border-purple-200 shadow-md"
          : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
      }`}
    >
      <h3 className={`text-xl font-semibold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Get In Touch</h3>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-lg p-4 text-center ${
            isLight ? "bg-green-50 border border-green-200" : "bg-green-900/20 border border-green-700"
          }`}
        >
          <p className={isLight ? "text-green-700" : "text-green-400"}>
            Thank you for your message! I'll get back to you soon.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className={
                isLight
                  ? "bg-white border-gray-300 text-gray-800 focus:border-purple-400 focus:ring-purple-400"
                  : "bg-gray-700/50 border-gray-600 text-white"
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className={
                isLight
                  ? "bg-white border-gray-300 text-gray-800 focus:border-purple-400 focus:ring-purple-400"
                  : "bg-gray-700/50 border-gray-600 text-white"
              }
            />
          </div>

          <div>
            <label
              htmlFor="service"
              className={`block text-sm font-medium mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}
            >
              Service
            </label>
            <Select onValueChange={(value) => setFormState({ ...formState, service: value })} value={formState.service}>
              <SelectTrigger
                className={
                  isLight ? "bg-white border-gray-300 text-gray-800" : "bg-gray-700/50 border-gray-600 text-white"
                }
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className={isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="video-editing">Video Editing</SelectItem>
                <SelectItem value="ai-automation">AI & Automation</SelectItem>
                <SelectItem value="ai-ml">AI/ML Projects</SelectItem>
                <SelectItem value="game-app">Game & App Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              className={
                isLight
                  ? "bg-white border-gray-300 text-gray-800 min-h-[120px] focus:border-purple-400 focus:ring-purple-400"
                  : "bg-gray-700/50 border-gray-600 text-white min-h-[120px]"
              }
            />
          </div>

          <p className={isLight ? "text-sm text-gray-600" : "text-sm text-gray-400"}>
            Reach out for payment plans, short-term or long-term projects, or one-time tasks—whatever your needs, I'm
            here to help!
          </p>

          <Button
            type="submit"
            className={`w-full text-white ${
              isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}

