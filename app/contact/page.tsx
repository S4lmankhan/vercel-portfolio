"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24">
      <ProfileHeader />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/">
          <motion.div
            className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </motion.div>
        </Link>

        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Get In Touch
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-purple-400 font-medium mb-1">Email</h3>
                  <p className="text-gray-300">contact@salmankhan.dev</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-medium mb-1">Location</h3>
                  <p className="text-gray-300">Islamabad, Pakistan</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-medium mb-1">Availability</h3>
                  <p className="text-gray-300">Monday - Friday: 9am - 6pm (PKT)</p>
                  <p className="text-gray-300">Weekend: Limited availability</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-medium mb-1">Response Time</h3>
                  <p className="text-gray-300">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

