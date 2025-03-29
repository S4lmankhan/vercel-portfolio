"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Mail, Bell, ArrowRight } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { theme } = useTheme()
  const isLight = theme === "light"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div
        className={`relative overflow-hidden rounded-2xl ${
          isLight
            ? "bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100"
            : "bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-gray-800"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-purple-400/10 blur-2xl" />
        <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>
              Stay Updated With My Latest Work
            </h2>

            <p className={`mb-6 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
              Join my newsletter to receive updates on new projects, blog posts, and exclusive content. I'll share tips,
              insights, and special offers that only subscribers get access to.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Early access to new projects and case studies",
                "Web development and design tips & tutorials",
                "Exclusive discounts on my services",
                "Monthly industry insights and technology trends",
              ].map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className={`h-5 w-5 mr-2 shrink-0 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                  <span className={isLight ? "text-gray-700" : "text-gray-300"}>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isLight ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className={`pl-10 ${
                      isLight ? "bg-white border-gray-300 focus-visible:ring-purple-400" : "bg-gray-800 border-gray-700"
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
                >
                  {status === "loading" ? (
                    <>
                      <span className="animate-spin mr-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                      Subscribing...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>

              {status === "error" && (
                <div className="mt-2 flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errorMessage}
                </div>
              )}

              <p className={`mt-2 text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                I respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Newsletter illustration"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Social proof */}
        <div className={`relative p-4 text-center border-t ${isLight ? "border-purple-100" : "border-gray-800"}`}>
          <p className={`mb-2 text-sm font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>
            Trusted by professionals from
          </p>
          <div className="flex justify-center items-center space-x-8">
            {["Company A", "Company B", "Company C", "Company D"].map((company, i) => (
              <div key={i} className={`text-sm font-semibold ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent newsletter example with CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <h3 className={`text-xl font-bold mb-2 ${isLight ? "text-gray-800" : "text-white"}`}>Recent Newsletter</h3>
        <p className={`mb-4 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          Take a peek at what you'll receive in your inbox
        </p>
        <Button
          className={`group ${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
        >
          View Sample Newsletter
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  )
}

