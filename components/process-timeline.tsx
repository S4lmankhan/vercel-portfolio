"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function ProcessTimeline() {
  const steps = [
    {
      number: "1",
      title: "Choose Your Plan",
      description:
        "Find the perfect plan tailored to your needs, offering the right balance of features, flexibility, and value to help you achieve your goals effortlessly.",
    },
    {
      number: "2",
      title: "Submit Your Request",
      description:
        "Easily submit your design requirements through our private design portal, ensuring a seamless process where your vision is understood, refined, and brought to life with precision and creativity.",
    },
    {
      number: "3",
      title: "Project Delivered with Excellence!",
      description:
        "As a dedicated freelancer, I ensure your project is completed with precision and delivered within 2-3 days. With a keen eye for detail and a passion for quality, I bring your vision to life—on time and beyond expectations.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-purple-600 text-white border-0 mb-4">Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Getting your projects done
              <br />
              has never been easier
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Say goodbye to outdated hiring methods and experience the difference firsthand
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-700" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-600 rounded-full" />

                <div className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="w-1/2" />
                  <div className="w-1/2">
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm mb-4">
                        Step #{step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

