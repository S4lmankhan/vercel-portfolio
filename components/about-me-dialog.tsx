"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Briefcase, Award } from "lucide-react"
import Image from "next/image"
import { CertificationPreview } from "./certification-preview"
import { useTheme } from "next-themes"

interface AboutMeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutMeDialog({ open, onOpenChange }: AboutMeDialogProps) {
  const [activeTab, setActiveTab] = useState("education")
  const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[0] | null>(null)
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Reset the selected certification when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedCertification(null)
    }
  }, [open])

  const certifications = [
    {
      id: "cert1",
      title: "Certified Prompt Engineering Expert (CPEE)",
      provider: "Future Skills Academy",
      date: "March 2024",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prompt%20egineering%20cert%20salman.jpg-DVprMFWfiXeDGbXONvJiblGHhxFsFv.jpeg",
      credentialId: "97000282",
      skills: ["Prompt Engineering", "AI", "LLM", "ChatGPT", "Natural Language Processing"],
    },
    {
      id: "cert2",
      title: "Graphic Design Specialization",
      provider: "Coursera & CalArts",
      date: "October 2022",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/graphic%20design.jpg-OXmLJEJnabSVU52dgDUc7dqMkEN2m4.jpeg",
      credentialId: "JM2D7TL7N3N8",
      skills: ["Graphic Design", "Typography", "Imagemaking", "Branding", "Visual Communication"],
    },
    {
      id: "cert3",
      title: "WordPress Course",
      provider: "EDUCBA",
      date: "2023",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wordpress%20cert%20salman.jpg-wGXTnLNeVkNcZhpELR3Fy2Km6vR01W.jpeg",
      credentialId: "FS84CPoVD",
      skills: ["WordPress", "CMS", "Web Development", "Content Management", "Website Building"],
    },
    {
      id: "cert4",
      title: "Project Management Foundations",
      provider: "LinkedIn Learning",
      date: "July 30, 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VQH157Ar5jYIz26bUaV1fAe5ztCeaR.png",
      credentialId: "3bbd46f5cce6cebfa0816b0778f5a30e5db25addc422d3b176c6f51e12d30a2d",
      skills: ["Project Management", "Leadership", "Team Coordination", "Agile"],
    },
    {
      id: "cert5",
      title: "Intro to Graphic Design with Photoshop",
      provider: "Great Learning Academy",
      date: "May 2024",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photshop.jpg-II1wTRciVAOd8mPM0LtZC4z97R2jWH.jpeg",
      credentialId: "GL-PS-2024-001",
      skills: ["Photoshop", "Graphic Design", "Digital Imaging", "Visual Design"],
    },
    {
      id: "cert6",
      title: "World of Wonder Gamecraft Program",
      provider: "PUBG Mobile & HEC Pakistan",
      date: "July 2024",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HEC%20X%20TENCENT%20GAME%20DESIGN-eJFhOGMvLb7z3gYK0Qg69qFXf6ouZ2.png",
      credentialId: "10006097",
      skills: ["Game Design", "Game Development", "Interactive Media", "Digital Entertainment"],
    },
    {
      id: "cert7",
      title: "Python and Django Full Stack Web Developer Bootcamp",
      provider: "Udemy",
      date: "January 2021",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/salman%20python%20and%20django.jpg-L6v5ttn7n71S1ReySWmICYfeM4YzeH.jpeg",
      credentialId: "UC-db9e62ed-4e72-464b-afd9-8ad546e9fb1",
      skills: ["Python", "Django", "Full Stack Development", "Web Development", "Backend"],
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  // Handle certification click with proper state management
  const handleCertificationClick = (cert: (typeof certifications)[0]) => {
    setSelectedCertification(cert)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-5xl p-0 overflow-hidden ${
          isLight ? "bg-white/95 backdrop-blur-md border-purple-200" : "bg-gray-800/95 backdrop-blur-md border-gray-700"
        }`}
      >
        <motion.div
          className={`absolute inset-0 z-0 ${
            isLight
              ? "bg-gradient-to-br from-purple-100/50 to-blue-100/50"
              : "bg-gradient-to-br from-purple-900/20 to-blue-900/20"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 p-6">
          <DialogHeader className="mb-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <DialogTitle
                className={`text-3xl font-bold text-center ${
                  isLight
                    ? "text-purple-700"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                }`}
              >
                About Salman Khan
              </DialogTitle>
              <p className={isLight ? "text-gray-600 text-center mt-2" : "text-gray-400 text-center mt-2"}>
                Cryptography, Blockchain & AI-ML Enthusiast
              </p>
            </motion.div>
          </DialogHeader>

          <Tabs defaultValue="education" className="mt-4" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className={`grid grid-cols-3 p-1 max-w-md mx-auto ${isLight ? "bg-gray-100" : "bg-gray-900/50"}`}>
              <TabsTrigger
                value="education"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                <Award className="mr-2 h-4 w-4" />
                Certifications
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 relative min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "education" && (
                  <motion.div
                    key="education"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute w-full max-h-[70vh] overflow-y-auto custom-scrollbar pr-4"
                  >
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Bachelor of Science in Artificial Intelligence
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2023 - 2026
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>
                          National University of Modern Languages (NUML), Islamabad
                        </h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Currently pursuing a Bachelor's degree in Artificial Intelligence with a 92% average (CGPA
                          3.6). Balancing strong academic performance with active participation in sports and public
                          speaking competitions.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            AI/ML
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Computer Science
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Public Speaking
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>FSC</h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2019 - 2022
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>Cadet College Swat</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Completed FSC with 90.90% marks. Developed strong foundation in sciences and mathematics while
                          participating in various extracurricular activities.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Sciences
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Mathematics
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Leadership
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Matric
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2017 - 2019
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>Khyber Public School</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Completed Matric with 89% marks, establishing a strong academic foundation.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            General Sciences
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Computer Studies
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === "experience" && (
                  <motion.div
                    key="experience"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute w-full max-h-[70vh] overflow-y-auto custom-scrollbar pr-4"
                  >
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Graphics Designer
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            March 2022 - January 2024
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>MixDIA UK</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Worked as a Graphics Designer, proficient in Photoshop, Canva, Illustrator, Spline, and Gimp.
                          Created visual assets for various marketing campaigns and digital platforms.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Photoshop
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Illustrator
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Spline
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Canva
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Python/Java Internee
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2023 (6 months)
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>CodeAlpha</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Completed 6 months of both Python and Java internship at CodeAlpha. Worked on various
                          projects, developing skills in backend development, API integration, and software
                          architecture.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Python
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Java
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Backend Development
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Java Internee
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2023 (6 months)
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>CodeSoft</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Completed 6 months of Java coding internship at CodeSoft. Focused on Java application
                          development, object-oriented programming, and software design principles.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Java
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            OOP
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Software Design
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className={`rounded-lg p-6 border hover:border-purple-500 transition-colors ${
                          isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>
                            Freelancing
                          </h3>
                          <span className={isLight ? "text-purple-700 text-sm" : "text-purple-400 text-sm"}>
                            2017 - Present
                          </span>
                        </div>
                        <h4 className={isLight ? "text-gray-700 mb-2" : "text-gray-300 mb-2"}>Self-employed</h4>
                        <p className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                          Handled various projects including SEO for businesses and websites, Shopify stores, and 3D
                          websites. Utilized tools and technologies such as WordPress.org, Wix, Spline, HTML, CSS, and
                          JavaScript.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            SEO
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Shopify
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            WordPress
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            Web Development
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === "certifications" && (
                  <motion.div
                    key="certifications"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute w-full max-h-[70vh] overflow-y-auto custom-scrollbar pr-4"
                  >
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {certifications.map((cert) => (
                        <motion.div
                          key={cert.id}
                          variants={item}
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                          onClick={() => handleCertificationClick(cert)}
                        >
                          <div
                            className={`rounded-lg p-4 border hover:border-purple-500 transition-all ${
                              isLight ? "bg-white border-purple-200 shadow-sm" : "bg-gray-900/50 border-gray-700"
                            }`}
                          >
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                              <Image
                                src={cert.image || "/placeholder.svg"}
                                alt={cert.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h3 className={`text-lg font-medium ${isLight ? "text-gray-800" : "text-white"} mb-1`}>
                              {cert.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className={isLight ? "text-purple-700" : "text-purple-400"}>{cert.provider}</span>
                              <span className={isLight ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                                {cert.date}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </DialogContent>
      {selectedCertification && (
        <CertificationPreview
          certification={selectedCertification}
          open={!!selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </Dialog>
  )
}

