"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ContactForm } from "@/components/contact-form"
import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import {
  ArrowLeft,
  Mail,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  Zap,
  Code,
  Palette,
  Cpu,
  Search,
  Video,
  FileText,
  Eye,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HireMePage() {
  // Services section animations
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const servicesControls = useAnimation()

  // Process section animations
  const [processRef, processInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const processControls = useAnimation()

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start("visible")
    } else {
      servicesControls.start("hidden")
    }
  }, [servicesControls, servicesInView])

  useEffect(() => {
    if (processInView) {
      processControls.start("visible")
    } else {
      processControls.start("hidden")
    }
  }, [processControls, processInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

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
          className="text-4xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Let's Work Together
        </motion.h1>

        <motion.p
          className="text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          I'm available for freelance projects, short-term collaborations, and long-term partnerships. Let's discuss how
          I can help bring your vision to life.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Email</h3>
                    <p className="text-gray-300">Redhawk112233@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Location</h3>
                    <p className="text-gray-300">Islamabad, Pakistan</p>
                    <p className="text-gray-400 text-sm">Available for remote work worldwide</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4">
                    <Calendar className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Availability</h3>
                    <p className="text-gray-300">Monday - Friday: 9am - 6pm (PKT)</p>
                    <p className="text-gray-300">Weekend: Limited availability</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Response Time</h3>
                    <p className="text-gray-300">Usually within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="https://www.linkedin.com/in/s4lmankhan/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#0077b5] hover:bg-[#006399]">Connect on LinkedIn</Button>
                </Link>
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

        <section ref={servicesRef} className="mb-16">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={servicesControls}
          >
            <motion.span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm" variants={itemVariants}>
              Services
            </motion.span>
            <motion.h2 className="text-3xl font-bold mt-4 mb-2 text-white" variants={itemVariants}>
              What I Can Do For You
            </motion.h2>
            <motion.p className="text-gray-300 max-w-2xl mx-auto" variants={itemVariants}>
              I offer a wide range of services to help businesses and individuals achieve their goals.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Web Development",
                description:
                  "Custom websites, e-commerce solutions, and web applications built with modern technologies.",
                icon: <Code className="h-10 w-10" />,
              },
              {
                title: "Graphic Design",
                description: "Logos, branding materials, marketing assets, and visual content for your business.",
                icon: <Palette className="h-10 w-10" />,
              },
              {
                title: "AI & Automation",
                description: "Custom AI solutions, automation workflows, and data processing tools.",
                icon: <Cpu className="h-10 w-10" />,
              },
              {
                title: "SEO Optimization",
                description: "Improve your website's visibility and ranking in search engine results.",
                icon: <Search className="h-10 w-10" />,
              },
              {
                title: "Video Editing",
                description: "Professional video editing for marketing, social media, and content creation.",
                icon: <Video className="h-10 w-10" />,
              },
              {
                title: "Consulting",
                description: "Expert advice on technology, digital marketing, and business strategy.",
                icon: <Lightbulb className="h-10 w-10" />,
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate={servicesControls}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <div className="bg-purple-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-purple-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section ref={processRef}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={processControls}
          >
            <motion.span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm" variants={itemVariants}>
              Process
            </motion.span>
            <motion.h2 className="text-3xl font-bold mt-4 mb-2 text-white" variants={itemVariants}>
              How We'll Work Together
            </motion.h2>
            <motion.p className="text-gray-300 max-w-2xl mx-auto" variants={itemVariants}>
              A streamlined process to ensure your project is completed efficiently and effectively.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Discovery",
                description:
                  "We'll discuss your project requirements, goals, timeline, and budget to ensure we're aligned.",
                icon: <Search className="h-6 w-6" />,
              },
              {
                step: 2,
                title: "Proposal",
                description:
                  "I'll provide a detailed proposal outlining the scope, deliverables, timeline, and cost for your project.",
                icon: <FileText className="h-6 w-6" />,
              },
              {
                step: 3,
                title: "Development",
                description:
                  "Once approved, I'll begin working on your project, providing regular updates on progress.",
                icon: <Code className="h-6 w-6" />,
              },
              {
                step: 4,
                title: "Review & Revisions",
                description:
                  "You'll review the work and provide feedback. I'll make revisions until you're completely satisfied.",
                icon: <Eye className="h-6 w-6" />,
              },
              {
                step: 5,
                title: "Delivery",
                description:
                  "The final deliverables will be provided, along with any necessary documentation or training.",
                icon: <CheckCircle className="h-6 w-6" />,
              },
              {
                step: 6,
                title: "Ongoing Support",
                description:
                  "I offer ongoing support and maintenance to ensure your project continues to perform optimally.",
                icon: <Zap className="h-6 w-6" />,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate={processControls}
                className="flex items-start mb-8 relative"
              >
                {index < 5 && <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-700"></div>}
                <div className="bg-purple-900/30 p-4 rounded-full w-12 h-12 flex items-center justify-center mr-6 text-purple-400 shrink-0 z-10">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-purple-400 text-sm font-medium mr-2">STEP {step.step}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Navigation />
    </div>
  )
}

