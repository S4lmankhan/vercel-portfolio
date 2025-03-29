"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ProfileHeader } from "@/components/profile-header"
import { ServicesGrid } from "@/components/services-grid"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { ProcessTimeline } from "@/components/process-timeline"
import { HeroBackground } from "@/components/hero-background"
import { InteractiveSkillTree } from "@/components/interactive-skill-tree"
import DecryptedText from "@/components/decrypted-text"

export default function Home() {
  // Add this useEffect to ensure content is visible immediately
  useEffect(() => {
    // Force immediate render of all animations
    const elements = document.querySelectorAll('[style*="opacity: 0"]')
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1"
        el.style.transform = "none"
      }
    })
  }, [])

  // Hero section animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })

  // Services section animations
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })
  const servicesControls = useAnimation()

  // Skills section animations
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })
  const skillsControls = useAnimation()

  // Testimonials section animations
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })
  const testimonialsControls = useAnimation()

  // Why Hire Me section animations
  const [whyHireMeRef, whyHireMeInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })
  const whyHireMeControls = useAnimation()

  // Add this for the projects showcase section
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start("visible")
    } else {
      servicesControls.start("hidden")
    }
  }, [servicesControls, servicesInView])

  useEffect(() => {
    if (skillsInView) {
      skillsControls.start("visible")
    } else {
      skillsControls.start("hidden")
    }
  }, [skillsControls, skillsInView])

  useEffect(() => {
    if (testimonialsInView) {
      testimonialsControls.start("visible")
    } else {
      testimonialsControls.start("hidden")
    }
  }, [testimonialsControls, testimonialsInView])

  useEffect(() => {
    if (whyHireMeInView) {
      whyHireMeControls.start("visible")
    } else {
      whyHireMeControls.start("hidden")
    }
  }, [whyHireMeControls, whyHireMeInView])

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
    <ErrorBoundary>
      <main className="min-h-screen pb-24">
        <ProfileHeader />

        <section className="text-center py-20 relative overflow-hidden" ref={heroRef}>
          <HeroBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.1),transparent_70%)]"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2 shadow-md mb-8 border border-gray-700"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#a855f7"
                  className="text-purple-500"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-300">100+ Satisfied Clients</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto mb-12 animated-gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I craft websites that hustle as hard as you do
          </motion.h1>

          <div className="flex flex-col items-center justify-center space-y-4 mb-12">
            <DecryptedText
              text="Cryptography, Blockchain & AI-ML Enthusiast"
              speed={25}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="periodic"
              animationInterval={10000}
              className="text-2xl text-gray-300 font-medium"
              encryptedClassName="text-2xl text-purple-400 font-medium"
              parentClassName="block"
            />
            <DecryptedText
              text="Python Full Stack Developer"
              speed={25}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="periodic"
              animationInterval={12000}
              className="text-2xl text-gray-300 font-medium"
              encryptedClassName="text-2xl text-purple-400 font-medium"
              parentClassName="block"
            />
            <DecryptedText
              text="3D Animated Fully Responsive Web Developer"
              speed={25}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="periodic"
              animationInterval={14000}
              className="text-2xl text-gray-300 font-medium"
              encryptedClassName="text-2xl text-purple-400 font-medium"
              parentClassName="block"
            />
            <DecryptedText
              text="Graphic Designer"
              speed={25}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="periodic"
              animationInterval={16000}
              className="text-2xl text-gray-300 font-medium"
              encryptedClassName="text-2xl text-purple-400 font-medium"
              parentClassName="block"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/projects">
              <Button
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-8 py-6 text-lg group glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Latest Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section ref={projectsRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectsShowcase />
          </motion.div>
        </section>

        <section className="py-20" ref={servicesRef}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={servicesControls}
          >
            <motion.span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm" variants={itemVariants}>
              Services
            </motion.span>
            <motion.h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2 text-white" variants={itemVariants}>
              Tailored Solutions,
              <br />
              Impactful Results
            </motion.h2>
            <motion.p className="text-gray-300" variants={itemVariants}>
              Delivering innovative, results-driven solutions that
              <br />
              elevate your brand and business
            </motion.p>
          </motion.div>
          <ServicesGrid />
        </section>

        <section className="py-20 bg-gradient-to-b from-black/50 to-gray-900/50" ref={skillsRef}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={skillsControls}
          >
            <motion.span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm" variants={itemVariants}>
              Skills
            </motion.span>
            <motion.h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2 text-white" variants={itemVariants}>
              Technical Expertise
            </motion.h2>
            <motion.p className="text-gray-300" variants={itemVariants}>
              A diverse skill set across multiple domains
            </motion.p>
          </motion.div>
          <InteractiveSkillTree />
        </section>

        <section className="py-20" ref={testimonialsRef}>
          <motion.div variants={containerVariants} initial="hidden" animate={testimonialsControls}>
            <TestimonialsSection />
          </motion.div>
        </section>

        <ProcessTimeline />

        <section className="py-20 bg-gradient-to-b from-black/50 to-gray-900/50" ref={whyHireMeRef}>
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={whyHireMeControls}
          >
            <motion.span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm" variants={itemVariants}>
              Why Hire Me
            </motion.span>
            <motion.h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2 text-white" variants={itemVariants}>
              Expertise That Delivers
            </motion.h2>
            <motion.p className="text-gray-300" variants={itemVariants}>
              What sets me apart from the rest
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 glow"
              variants={itemVariants}
              initial="hidden"
              animate={whyHireMeControls}
              custom={0}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Diverse Skill Set</h3>
              <p className="text-gray-300">
                With expertise spanning graphic design, web development, AI/ML, blockchain, and more, I bring a
                comprehensive approach to every project.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 glow"
              variants={itemVariants}
              initial="hidden"
              animate={whyHireMeControls}
              custom={1}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Decade of Experience</h3>
              <p className="text-gray-300">
                Over 10 years in content creation and 7+ years in design and development, working with clients across
                various industries.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 glow"
              variants={itemVariants}
              initial="hidden"
              animate={whyHireMeControls}
              custom={2}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Flexible Engagement</h3>
              <p className="text-gray-300">
                Whether you need a short-term project, long-term collaboration, or one-time task, I offer flexible
                payment plans and working arrangements.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 glow"
              variants={itemVariants}
              initial="hidden"
              animate={whyHireMeControls}
              custom={3}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Client Satisfaction</h3>
              <p className="text-gray-300">
                I'm committed to delivering innovative solutions that exceed expectations, with a focus on quality,
                timeliness, and communication.
              </p>
            </motion.div>
          </div>
        </section>

        <Navigation />
      </main>
    </ErrorBoundary>
  )
}

