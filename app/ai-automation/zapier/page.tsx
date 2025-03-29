"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, ExternalLink, Zap, Clock, Layers, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample automation data - replace with actual data later
const automations = [
  {
    id: 1,
    title: "E-commerce Order Processing",
    client: "Online Retail Store",
    description:
      "Automated workflow that processes new orders, updates inventory, sends confirmation emails, and creates shipping labels.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    year: 2024,
    category: "E-commerce",
    triggers: ["New Order", "Inventory Update"],
    actions: ["Send Email", "Create Shipping Label", "Update Database", "Slack Notification"],
    timesSaved: "15 hours/week",
  },
  {
    id: 2,
    title: "Lead Management System",
    client: "Marketing Agency",
    description:
      "Comprehensive lead management automation that captures leads from multiple sources, enriches data, and routes to appropriate sales representatives.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    year: 2023,
    category: "Sales & Marketing",
    triggers: ["Form Submission", "Email Received", "CRM Update"],
    actions: ["Data Enrichment", "Lead Scoring", "CRM Update", "Email Notification"],
    timesSaved: "20 hours/week",
  },
  {
    id: 3,
    title: "Social Media Content Calendar",
    client: "Digital Content Creator",
    description:
      "Automated content calendar that schedules and posts content across multiple social media platforms with analytics tracking.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    year: 2024,
    category: "Social Media",
    triggers: ["Calendar Event", "Content Approval", "Time Trigger"],
    actions: ["Post to Social Media", "Schedule Content", "Track Analytics", "Generate Report"],
    timesSaved: "12 hours/week",
  },
  {
    id: 4,
    title: "Customer Support Ticket System",
    client: "SaaS Company",
    description:
      "Automated customer support workflow that categorizes tickets, assigns to appropriate team members, and provides response templates.",
    image: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=400&width=600",
    year: 2023,
    category: "Customer Support",
    triggers: ["New Support Ticket", "Email Received", "Status Change"],
    actions: ["Categorize Ticket", "Assign to Team", "Send Template Response", "Update Dashboard"],
    timesSaved: "18 hours/week",
  },
]

interface AutomationDetailsProps {
  automation: (typeof automations)[0]
  open: boolean
  onClose: () => void
}

function AutomationDetails({ automation, open, onClose }: AutomationDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-4xl p-0">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="relative aspect-video bg-black">
          <Image src={automation.image || "/placeholder.svg"} alt={automation.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl font-bold text-white">{automation.title}</h2>
            <p className="text-purple-400">{automation.category}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Layers className="h-4 w-4 mr-2 text-purple-400" />
                Client
              </h3>
              <p className="text-gray-300">{automation.client}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                Time Saved
              </h3>
              <p className="text-gray-300">{automation.timesSaved}</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-purple-400" />
                Triggers
              </h3>
              <div className="flex flex-wrap gap-2">
                {automation.triggers.map((trigger) => (
                  <span key={trigger} className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-purple-400" />
                Actions
              </h3>
              <div className="flex flex-wrap gap-2">
                {automation.actions.map((action) => (
                  <span key={action} className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-xs">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-medium mb-2">Description</h3>
            <p className="text-gray-300">{automation.description}</p>
          </div>

          <Button className="bg-purple-600 hover:bg-purple-500">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Case Study
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ZapierAutomationPage() {
  const [selectedAutomation, setSelectedAutomation] = useState<(typeof automations)[0] | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/ai-automation">
          <motion.div
            className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI & Automation
          </motion.div>
        </Link>

        <motion.h1
          className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Zapier Automation Portfolio
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Powerful no-code automation solutions that save time and streamline business processes
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {automations.map((automation) => (
            <motion.div
              key={automation.id}
              variants={item}
              whileHover={{ y: -10 }}
              className="cursor-pointer group"
              onClick={() => setSelectedAutomation(automation)}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all">
                <div className="relative aspect-video">
                  <Image
                    src={automation.thumbnail || "/placeholder.svg"}
                    alt={automation.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-medium text-white mb-1">{automation.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400">{automation.category}</span>
                      <span className="text-gray-400 text-sm">{automation.year}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="bg-purple-600/80 rounded-full p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Zap className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-gray-300 mb-2">
                    <Clock className="h-4 w-4 mr-2 text-purple-400" />
                    <span>Time Saved: {automation.timesSaved}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {automation.triggers.slice(0, 2).map((trigger) => (
                      <span key={trigger} className="bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded text-xs">
                        {trigger}
                      </span>
                    ))}
                    {automation.triggers.length > 2 && (
                      <span className="bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded text-xs">
                        +{automation.triggers.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedAutomation && (
        <AutomationDetails
          automation={selectedAutomation}
          open={!!selectedAutomation}
          onClose={() => setSelectedAutomation(null)}
        />
      )}

      <Navigation />
    </div>
  )
}

