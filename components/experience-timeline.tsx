"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { CalendarDays, Briefcase, GraduationCap, Award, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimelineItem {
  id: string
  type: "work" | "education" | "award"
  title: string
  organization: string
  startDate: string
  endDate: string
  description: string
  details: string[]
  link?: string
}

export function ExperienceTimeline() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { theme } = useTheme()
  const isLight = theme === "light"

  const timelineItems: TimelineItem[] = [
    {
      id: "graphics-designer",
      type: "work",
      title: "Graphics Designer",
      organization: "MixDIA UK",
      startDate: "March 2022",
      endDate: "January 2024",
      description: "Worked as a Graphics Designer, proficient in various design tools and techniques.",
      details: [
        "Created visual assets for marketing campaigns",
        "Designed brand identities and marketing materials",
        "Developed user interfaces for digital platforms",
        "Collaborated with marketing team on creative projects",
        "Maintained brand consistency across all deliverables",
      ],
    },
    {
      id: "python-java-intern",
      type: "work",
      title: "Python/Java Internee",
      organization: "CodeAlpha",
      startDate: "2023",
      endDate: "6 months",
      description: "Completed 6 months of both Python and Java internship at CodeAlpha.",
      details: [
        "Developed backend services using Python and Java",
        "Created RESTful APIs for web applications",
        "Implemented database integrations and data processing utilities",
        "Participated in code reviews and team programming sessions",
        "Contributed to documentation and technical specifications",
      ],
    },
    {
      id: "java-intern",
      type: "work",
      title: "Java Internee",
      organization: "CodeSoft",
      startDate: "2023",
      endDate: "6 months",
      description: "Completed 6 months of Java coding internship at CodeSoft.",
      details: [
        "Built Java applications for various business requirements",
        "Implemented object-oriented programming principles",
        "Developed software following design patterns and best practices",
        "Worked with Spring Framework for application development",
        "Participated in agile development processes",
      ],
    },
    {
      id: "bs-ai",
      type: "education",
      title: "BS Artificial Intelligence",
      organization: "National University of Modern Languages (NUML)",
      startDate: "2023",
      endDate: "Ongoing",
      description: "Currently pursuing a Bachelor's degree in Artificial Intelligence with a 92% average (CGPA 3.6).",
      details: [
        "Core coursework in machine learning, neural networks, and data science",
        "Research focus on natural language processing and computer vision",
        "Participating in AI research projects and competitions",
        "Developing practical skills in TensorFlow, PyTorch, and other AI frameworks",
        "Balancing strong academic performance with extracurricular activities",
      ],
      link: "https://numl.edu.pk/",
    },
    {
      id: "fsc",
      type: "education",
      title: "FSC",
      organization: "Cadet College Swat",
      startDate: "2019",
      endDate: "2022",
      description: "Completed FSC with 90.90% marks.",
      details: [
        "Focused on mathematics, physics, and computer science",
        "Developed strong foundation in STEM subjects",
        "Participated in science competitions and academic olympiads",
        "Engaged in programming and robotics clubs",
        "Maintained excellent academic standing throughout",
      ],
    },
    {
      id: "project-management",
      type: "award",
      title: "Project Management Foundations",
      organization: "LinkedIn",
      startDate: "2024",
      endDate: "",
      description: "Certified in Project Management Foundations through LinkedIn Learning.",
      details: [
        "Mastered project planning and execution methodologies",
        "Learned resource allocation and timeline management",
        "Studied risk assessment and mitigation strategies",
        "Developed stakeholder communication skills",
        "Applied learning to real-world project scenarios",
      ],
      link: "https://www.linkedin.com/learning/",
    },
    {
      id: "game-design",
      type: "award",
      title: "Game Design",
      organization: "Tencent CHINA",
      startDate: "2024",
      endDate: "",
      description: "Received certification in Game Design from Tencent CHINA (Famous for Pubg Mobile).",
      details: [
        "Studied game mechanics and player engagement principles",
        "Learned character design and environmental storytelling",
        "Developed skills in level design and game balancing",
        "Explored monetization strategies and player retention",
        "Created game prototypes for mobile platforms",
      ],
      link: "https://www.tencent.com/en-us/",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className={`h-6 w-6 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
      case "education":
        return <GraduationCap className={`h-6 w-6 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
      case "award":
        return <Award className={`h-6 w-6 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
      default:
        return <CalendarDays className={`h-6 w-6 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-3 ${isLight ? "text-gray-800" : "text-white"}`}>Professional Journey</h2>
        <p className={isLight ? "text-gray-600" : "text-gray-300"}>
          A timeline of my career, education, and achievements
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className={`absolute left-6 top-8 bottom-8 w-0.5 ${isLight ? "bg-gray-200" : "bg-gray-700"}`} />

        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline point */}
              <div
                className={`absolute left-6 w-4 h-4 rounded-full transform -translate-x-1/2 mt-1.5 ${
                  isLight ? "bg-purple-700" : "bg-purple-500"
                }`}
              />

              <div className="ml-12">
                <div
                  className={`p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                    isLight
                      ? "bg-white border border-gray-200"
                      : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                  }`}
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${isLight ? "bg-purple-100" : "bg-purple-900/30"}`}>
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <h3 className={`font-bold ${isLight ? "text-gray-800" : "text-white"}`}>{item.title}</h3>
                        <p className={isLight ? "text-gray-600" : "text-gray-300"}>{item.organization}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                        }`}
                      >
                        {item.startDate} {item.endDate ? `- ${item.endDate}` : ""}
                      </span>
                      <button
                        className={`ml-2 ${isLight ? "text-gray-400" : "text-gray-500"}`}
                        aria-label="Expand details"
                      >
                        <ChevronRight
                          className={`h-5 w-5 transition-transform ${expandedItem === item.id ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-dashed">
                          <p className={`mb-4 ${isLight ? "text-gray-600" : "text-gray-400"}`}>{item.description}</p>

                          <ul className="space-y-2 mb-4">
                            {item.details.map((detail, i) => (
                              <li key={i} className={`flex items-start ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                                <span
                                  className={`inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 ${
                                    isLight ? "bg-purple-700" : "bg-purple-400"
                                  }`}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>

                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <Button
                                variant="outline"
                                className={`text-xs ${
                                  isLight
                                    ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                                }`}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit Website
                              </Button>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

