"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ErrorBoundary } from "./error-boundary"
import { Badge } from "@/components/ui/badge"

interface Skill {
  id: string
  name: string
  level: number
  category: string
  description: string
  relatedSkills: string[]
}

export function InteractiveSkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const skills: Skill[] = [
    {
      id: "html-css",
      name: "HTML/CSS",
      level: 90,
      category: "frontend",
      description: "Expert in semantic HTML5 and modern CSS techniques including Flexbox, Grid, and animations.",
      relatedSkills: ["tailwind", "responsive-design"],
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: 85,
      category: "frontend",
      description:
        "Strong knowledge of modern JavaScript (ES6+) including async/await, modules, and functional programming concepts.",
      relatedSkills: ["react", "typescript"],
    },
    {
      id: "react",
      name: "React",
      level: 80,
      category: "frontend",
      description:
        "Experienced in building complex applications with React, including hooks, context API, and state management.",
      relatedSkills: ["javascript", "typescript"],
    },
    {
      id: "typescript",
      name: "TypeScript",
      level: 75,
      category: "frontend",
      description:
        "Proficient in TypeScript for type-safe JavaScript development, interfaces, generics, and advanced types.",
      relatedSkills: ["javascript", "react"],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      level: 90,
      category: "frontend",
      description: "Expert in utility-first CSS with Tailwind, creating responsive and custom designs efficiently.",
      relatedSkills: ["html-css", "responsive-design"],
    },
    {
      id: "responsive-design",
      name: "Responsive Design",
      level: 85,
      category: "frontend",
      description: "Skilled in creating websites that work seamlessly across all devices and screen sizes.",
      relatedSkills: ["html-css", "tailwind"],
    },
    {
      id: "python",
      name: "Python",
      level: 90,
      category: "backend",
      description: "Expert in Python for backend development, data processing, and automation scripts.",
      relatedSkills: ["ai-ml", "data-analysis"],
    },
    {
      id: "nodejs",
      name: "Node.js",
      level: 80,
      category: "backend",
      description: "Experienced in building scalable backend services with Node.js and Express.",
      relatedSkills: ["javascript", "api-development"],
    },
    {
      id: "api-development",
      name: "API Development",
      level: 85,
      category: "backend",
      description: "Skilled in designing and implementing RESTful and GraphQL APIs with proper documentation.",
      relatedSkills: ["nodejs", "database"],
    },
    {
      id: "database",
      name: "Databases",
      level: 85,
      category: "backend",
      description: "Proficient in SQL and NoSQL databases including MongoDB, PostgreSQL, and Firebase.",
      relatedSkills: ["api-development", "nodejs"],
    },
    {
      id: "ai-ml",
      name: "AI/ML",
      level: 80,
      category: "data",
      description: "Experienced in machine learning algorithms, neural networks, and AI model deployment.",
      relatedSkills: ["python", "data-analysis"],
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      level: 85,
      category: "data",
      description: "Skilled in data processing, visualization, and extracting insights from large datasets.",
      relatedSkills: ["python", "ai-ml"],
    },
    {
      id: "blockchain",
      name: "Blockchain",
      level: 75,
      category: "specialized",
      description: "Knowledge of blockchain technologies, smart contracts, and decentralized applications.",
      relatedSkills: ["cryptography", "javascript"],
    },
    {
      id: "cryptography",
      name: "Cryptography",
      level: 70,
      category: "specialized",
      description: "Understanding of cryptographic principles, algorithms, and their applications in security.",
      relatedSkills: ["blockchain", "security"],
    },
    {
      id: "security",
      name: "Security",
      level: 75,
      category: "specialized",
      description: "Knowledge of web security best practices, authentication, and common vulnerabilities.",
      relatedSkills: ["cryptography", "api-development"],
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      level: 85,
      category: "design",
      description: "Skilled in creating logos, illustrations, and visual assets using industry-standard tools.",
      relatedSkills: ["ui-design", "3d-design"],
    },
    {
      id: "ui-design",
      name: "UI Design",
      level: 80,
      category: "design",
      description: "Experience in creating intuitive and aesthetically pleasing user interfaces.",
      relatedSkills: ["graphic-design", "responsive-design"],
    },
    {
      id: "3d-design",
      name: "3D Design",
      level: 75,
      category: "design",
      description: "Ability to create 3D models, environments, and animations for various applications.",
      relatedSkills: ["graphic-design", "animation"],
    },
    {
      id: "animation",
      name: "Animation",
      level: 80,
      category: "design",
      description: "Skilled in creating engaging animations for web, video, and interactive experiences.",
      relatedSkills: ["3d-design", "video-editing"],
    },
    {
      id: "video-editing",
      name: "Video Editing",
      level: 85,
      category: "media",
      description: "Proficient in video editing, color grading, and post-production techniques.",
      relatedSkills: ["animation", "motion-graphics"],
    },
    {
      id: "motion-graphics",
      name: "Motion Graphics",
      level: 80,
      category: "media",
      description: "Experience in creating dynamic motion graphics for videos and digital content.",
      relatedSkills: ["video-editing", "animation"],
    },
  ]

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "data", name: "Data & AI" },
    { id: "specialized", name: "Specialized" },
    { id: "design", name: "Design" },
    { id: "media", name: "Media" },
  ]

  const filteredSkills =
    selectedCategory === "all" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const getRelatedSkills = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId)
    return skill ? (skill.relatedSkills.map((id) => skills.find((s) => s.id === id)).filter(Boolean) as Skill[]) : []
  }

  return (
    <ErrorBoundary>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layoutId={`skill-card-${skill.id}`}
                onClick={() => setSelectedSkill(skill)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500 cursor-pointer transition-all"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <h3 className="text-white font-medium mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 to-blue-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Proficiency</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
              >
                <motion.div
                  layoutId={`skill-card-${selectedSkill.id}`}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                    <Badge className="bg-purple-600 border-0">{selectedSkill.level}%</Badge>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedSkill.description}</p>

                  {getRelatedSkills(selectedSkill.id).length > 0 && (
                    <div>
                      <h3 className="text-white font-medium mb-2">Related Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {getRelatedSkills(selectedSkill.id).map((relatedSkill) => (
                          <Badge
                            key={relatedSkill.id}
                            className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedSkill(relatedSkill)
                            }}
                          >
                            {relatedSkill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="mt-6 text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setSelectedSkill(null)}
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  )
}

