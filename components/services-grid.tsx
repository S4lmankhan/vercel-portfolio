"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ServiceCard } from "./service-card"
import { Code, Palette, Video, Cpu, Database, Gamepad } from "lucide-react"

export function ServicesGrid() {
  const services = [
    {
      title: "Graphic Designing",
      icon: <Palette className="h-12 w-12" />,
      description: "Logos, banners, brochures, flyers, animated graphics, vector arts, 3D designs, and more.",
      href: "/graphic-design",
    },
    {
      title: "Web Development",
      icon: <Code className="h-12 w-12" />,
      description: "Static websites, AI tools, CMS, WordPress, dynamic websites with modern frameworks.",
      href: "/web-development",
    },
    {
      title: "Video Editing",
      icon: <Video className="h-12 w-12" />,
      description: "Velocity edits, YouTube shorts, digital marketing videos, game montages, and more.",
      href: "/video-editing",
    },
    {
      title: "AI Agents & Automation",
      icon: <Cpu className="h-12 w-12" />,
      description: "No-code automations with Zapier, Make.com, n8n, and custom Python solutions.",
      href: "/ai-automation",
    },
    {
      title: "AI/ML Projects",
      icon: <Database className="h-12 w-12" />,
      description: "Projects in AI, ML, ANN, data mining, and related cutting-edge technologies.",
      href: "/ai-ml",
    },
    {
      title: "Game & App Development",
      icon: <Gamepad className="h-12 w-12" />,
      description: "Mobile apps, games, and interactive experiences for various platforms.",
      href: "/game-development",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {services.map((service) => (
        <Link key={service.title} href={service.href}>
          <ServiceCard {...service} />
        </Link>
      ))}
    </motion.div>
  )
}

