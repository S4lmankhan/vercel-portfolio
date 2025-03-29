"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Linkedin, Award, GraduationCap, Briefcase, CheckCircle } from "lucide-react"

export function OnlineCVViewer() {
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
    <motion.div
      className="bg-gray-900 text-white p-8 rounded-lg max-w-4xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          SALMAN KHAN
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <span className="flex items-center">
            <Phone className="h-4 w-4 mr-1 text-purple-400" /> 92-3425646313
          </span>
          <span className="flex items-center">
            <Mail className="h-4 w-4 mr-1 text-purple-400" /> Redhawk112233@gmail.com
          </span>
          <span className="flex items-center">
            <Linkedin className="h-4 w-4 mr-1 text-purple-400" /> linkedin.com/in/salman-khan-59b7bb2b4
          </span>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <p className="text-gray-300 text-center">
          Experienced and versatile professional with 6 years of expertise across multiple domains including Coding,
          Shopify e-Commerce development, WordPress and Wix web development, graphic design, SEO optimization, and
          freelancing. With a proven track record of delivering exceptional results in each respective field.
        </p>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <div className="flex items-center mb-4">
          <Briefcase className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold border-b border-purple-400 pb-1">PROFESSIONAL EXPERIENCE</h2>
        </div>

        <ul className="space-y-4">
          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">CodeAlpha (Python/Java-Internee) – 06 Months 2023</h3>
            <p className="text-gray-400 text-sm">Completed 6 months of Both Python and Java Internship at CodeAlpha</p>
          </li>

          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">CodeSoft (Java-Internee) – 06 Months 2023</h3>
            <p className="text-gray-400 text-sm">Completed 6 months of Java Coding Internship at CodeSoft</p>
          </li>

          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">Graphics Designer (MixDIA uk) – March 2022 - January 2024</h3>
            <p className="text-gray-400 text-sm">Proficient at Photoshop / Canva / Illustrator / Spline / Gimp</p>
          </li>

          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">Freelancing – 2017 - Ongoing</h3>
            <p className="text-gray-400 text-sm">
              Handled Various Projects such as Seo of Businesses and Websites / Shopify Stores / 3D Websites
            </p>
            <p className="text-gray-400 text-sm">
              Have Used Tools & Technologies Such as WordPress.org / Wix /Spline / HTML / CSS / Javascript
            </p>
          </li>
        </ul>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <div className="flex items-center mb-4">
          <GraduationCap className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold border-b border-purple-400 pb-1">EDUCATION</h2>
        </div>

        <ul className="space-y-4">
          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">National University of Modern Languages – 2023-ongoing</h3>
            <p className="text-gray-400 text-sm">Course: BS Artificial Intelligence (92%) (CGPA 3.6)</p>
          </li>

          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">Cadet College Swat – 2019-2022</h3>
            <p className="text-gray-400 text-sm">FSC, (90.90%)</p>
          </li>

          <li className="ml-7 relative">
            <div className="absolute -left-7 top-1 w-5 h-5 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <h3 className="font-semibold">Khyber Public School – 2017-2019</h3>
            <p className="text-gray-400 text-sm">Matric (89%)</p>
          </li>
        </ul>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold border-b border-purple-400 pb-1">SKILLS & OTHER</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              3D & Animated Landing WebPages
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              Shopify e-commerce
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              SEO Optimization
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              Social Media Marketing
            </li>
          </ul>

          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              Graphics Designer
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              Project Management
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
              Strong Communication Skills
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <div className="flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold border-b border-purple-400 pb-1">CERTIFICATIONS</h2>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center text-gray-300">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
            Project Management Foundations– LinkedIn - 2024
          </li>
          <li className="flex items-center text-gray-300">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
            HTML/CSS/JavaScript – Udemy - 2024
          </li>
          <li className="flex items-center text-gray-300">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
            Game Design – Tencent CHINA (Famous for Pubg Mobile) - 2024
          </li>
          <li className="flex items-center text-gray-300">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
            Social Media Marketing - Google Cloud - 2023
          </li>
        </ul>
      </motion.div>

      <motion.div variants={item}>
        <div className="flex items-center mb-4">
          <CheckCircle className="h-5 w-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-bold border-b border-purple-400 pb-1">PROFICIENT AT</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            "HTML/CSS",
            "Java",
            "C++",
            "Python",
            "Javascript",
            "WordPress.org",
            "Wix e-Commerce",
            "Shopify e-Commerce",
            "Spline 3D Tools Builder",
            "MacOS/Windows/Linux",
            "Photoshop / Illustrator",
            "Utilizing AI",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              className="bg-gray-800 rounded-md p-2 text-center text-gray-300 text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

