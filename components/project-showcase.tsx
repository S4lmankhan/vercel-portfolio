"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Search, Filter, SortAsc, SortDesc, Calendar, ArrowUpRight, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Project type definition
interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  date: string
  client: string
  technologies: string[]
  featured: boolean
  slug: string
}

// Main component props
interface ProjectShowcaseProps {
  projects: Project[]
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  // Filter and sort projects on dependency changes
  useEffect(() => {
    let result = [...projects]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((project) => project.category === selectedCategory)
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    setFilteredProjects(result)
  }, [searchQuery, selectedCategory, sortOrder, projects])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className={`text-3xl font-bold mb-3 ${isLight ? "text-gray-800" : "text-white"}`}>Project Portfolio</h2>
        <p className={isLight ? "text-gray-600" : "text-gray-300"}>
          Browse through my latest work and creative projects
        </p>
      </motion.div>

      {/* Filter and search controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`p-4 rounded-lg mb-8 ${
          isLight
            ? "bg-white border border-gray-200 shadow-sm"
            : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isLight ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                isLight ? "bg-white border-gray-300 focus-visible:ring-purple-400" : "bg-gray-800 border-gray-700"
              }`}
            />
          </div>

          {/* Category filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  isLight ? "bg-white border-gray-300 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-300"
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                {selectedCategory === "all" ? "All Categories" : selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={isLight ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer ${
                    category === selectedCategory
                      ? isLight
                        ? "bg-purple-100 text-purple-700"
                        : "bg-purple-900/30 text-purple-300"
                      : ""
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort control */}
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className={isLight ? "bg-white border-gray-300 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-300"}
          >
            {sortOrder === "asc" ? (
              <>
                <SortAsc className="h-4 w-4 mr-2" />
                Oldest First
              </>
            ) : (
              <>
                <SortDesc className="h-4 w-4 mr-2" />
                Newest First
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Results summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <p className={isLight ? "text-gray-600" : "text-gray-400"}>
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </motion.div>

      {/* Project grid */}
      {filteredProjects.length === 0 ? (
        <div
          className={`p-12 rounded-lg text-center ${
            isLight
              ? "bg-white border border-gray-200 shadow-sm"
              : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
          }`}
        >
          <p className={`mb-4 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
            No projects found matching your criteria.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
            className={isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-xl overflow-hidden group ${
                  isLight
                    ? "bg-white border border-gray-200 shadow-sm"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                }`}
              >
                {/* Project image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Category tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        isLight ? "bg-white/90 text-gray-800" : "bg-gray-900/80 text-gray-200"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                        }`}
                      >
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Overlay and quick view button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/projects/${project.slug}`}>
                      <Button
                        className={`${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
                      >
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${isLight ? "text-gray-800" : "text-white"}`}>{project.title}</h3>
                    <div className="flex items-center">
                      <Calendar className={`h-4 w-4 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                      <span className={`text-xs ${isLight ? "text-gray-600" : "text-gray-400"}`}>{project.date}</span>
                    </div>
                  </div>

                  <p className={`text-sm mb-4 line-clamp-2 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-xs ${
                          isLight ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          isLight ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between group ${
                        isLight
                          ? "text-purple-700 hover:text-purple-800 hover:bg-purple-50"
                          : "text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                      }`}
                    >
                      View Case Study
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

