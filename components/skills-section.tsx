"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const controls = useAnimation()
  const { theme } = useTheme()
  const isLight = theme === "light"

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Python", level: 90 },
    { name: "React", level: 80 },
    { name: "Blockchain", level: 75 },
    { name: "AI/ML", level: 80 },
    { name: "Graphic Design", level: 85 },
    { name: "Video Editing", level: 85 },
    { name: "C/C++", level: 75 },
    { name: "Tailwind CSS", level: 90 },
    { name: "MongoDB", level: 80 },
    { name: "SQL", level: 85 },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          custom={index}
          variants={item}
          className={`skill-card rounded-lg p-4 ${
            isLight
              ? "bg-white border border-purple-200 shadow-sm"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          }`}
        >
          <div className="flex justify-between mb-2">
            <span className={isLight ? "text-gray-800" : "text-white"}>{skill.name}</span>
            <span className={isLight ? "text-purple-700" : "text-purple-400"}>{skill.level}%</span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${isLight ? "bg-purple-100" : "bg-gray-700"}`}>
            <motion.div
              className={`h-2.5 rounded-full ${
                isLight
                  ? "bg-gradient-to-r from-purple-700 to-purple-500"
                  : "bg-gradient-to-r from-purple-600 to-blue-500"
              }`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

