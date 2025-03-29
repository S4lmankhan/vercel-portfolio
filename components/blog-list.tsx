"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishDate: string
  readTime: string
  featuredImage: string
  category: string
  tags: string[]
  slug: string
}

interface BlogListProps {
  posts: BlogPost[]
  featuredPost?: BlogPost
  categories?: { name: string; count: number }[]
}

export function BlogList({ posts, featuredPost, categories = [] }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className={`text-3xl font-bold mb-2 ${isLight ? "text-gray-800" : "text-white"}`}>Blog & Articles</h1>
          <p className={isLight ? "text-gray-600" : "text-gray-300"}>
            Insights, tutorials, and updates from my journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-64"
        >
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isLight ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                isLight ? "bg-white border-gray-300 focus-visible:ring-purple-400" : "bg-gray-800 border-gray-700"
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div
            className={`rounded-xl overflow-hidden ${
              isLight
                ? "bg-white border border-gray-200 shadow-sm"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            }`}
          >
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 relative aspect-video md:aspect-auto">
                <Image
                  src={featuredPost.featuredImage || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                    }`}
                  >
                    Featured
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 p-6 flex flex-col">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                    isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                  }`}
                >
                  {featuredPost.category}
                </span>

                <h2 className={`text-2xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>
                  {featuredPost.title}
                </h2>

                <p className={`mb-6 flex-grow ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className={`h-4 w-4 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                      <span className={isLight ? "text-gray-600" : "text-gray-400"}>{featuredPost.publishDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                      <span className={isLight ? "text-gray-600" : "text-gray-400"}>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button
                    className={`group ${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
                  >
                    Read Article
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Area - Posts and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Posts */}
        <div className="lg:col-span-2">
          {filteredPosts.length === 0 ? (
            <div
              className={`p-8 rounded-xl text-center ${
                isLight
                  ? "bg-white border border-gray-200 shadow-sm"
                  : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              }`}
            >
              <p className={isLight ? "text-gray-700" : "text-gray-300"}>
                No articles found matching "{searchQuery}". Try a different search term.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div
                      className={`rounded-xl overflow-hidden hover:shadow-md transition-shadow ${
                        isLight
                          ? "bg-white border border-gray-200"
                          : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                      }`}
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative aspect-video">
                          <Image
                            src={post.featuredImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="md:col-span-2 p-6">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs mb-2 ${
                              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                            }`}
                          >
                            {post.category}
                          </span>

                          <h3 className={`text-xl font-bold mb-2 ${isLight ? "text-gray-800" : "text-white"}`}>
                            {post.title}
                          </h3>

                          <p className={`mb-4 line-clamp-2 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                            {post.excerpt}
                          </p>

                          <div className="flex items-center text-xs">
                            <div className="flex items-center">
                              <Calendar className={`h-3 w-3 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                              <span className={isLight ? "text-gray-600" : "text-gray-400"}>{post.publishDate}</span>
                            </div>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Clock className={`h-3 w-3 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                              <span className={isLight ? "text-gray-600" : "text-gray-400"}>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`rounded-xl p-6 mb-6 ${
              isLight
                ? "bg-white border border-gray-200 shadow-sm"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            }`}
          >
            <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Categories</h3>

            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link href={`/blog/category/${category.name.toLowerCase().replace(/ /g, "-")}`}>
                    <div
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        isLight ? "hover:bg-gray-100" : "hover:bg-gray-700/50"
                      }`}
                    >
                      <span className={isLight ? "text-gray-700" : "text-gray-300"}>{category.name}</span>
                      <span
                        className={`text-sm rounded-full px-2 py-1 ${
                          isLight ? "bg-gray-100 text-gray-600" : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {category.count}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Subscribe Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`rounded-xl p-6 ${
              isLight
                ? "bg-white border border-gray-200 shadow-sm"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            }`}
          >
            <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>Newsletter</h3>

            <p className={`mb-4 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
              Subscribe to get notified about new articles and updates.
            </p>

            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                required
                className={
                  isLight ? "bg-white border-gray-300 focus-visible:ring-purple-400" : "bg-gray-800 border-gray-700"
                }
              />
              <Button
                type="submit"
                className={`w-full ${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

