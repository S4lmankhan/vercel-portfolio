"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, Tag, Share2, Bookmark, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

interface BlogArticleProps {
  title: string
  excerpt: string
  content: string
  publishDate: string
  readTime: string
  author: {
    name: string
    avatar: string
    title: string
  }
  featuredImage: string
  category: string
  tags: string[]
}

export function BlogArticle({
  title,
  excerpt,
  content,
  publishDate,
  readTime,
  author,
  featuredImage,
  category,
  tags,
}: BlogArticleProps) {
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link href={`/blog/category/${category.toLowerCase().replace(/ /g, "-")}`}>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
              isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
            }`}
          >
            {category}
          </span>
        </Link>

        <h1 className={`text-4xl font-bold mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>{title}</h1>

        <p className={`text-xl mb-6 leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>{excerpt}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className={`font-medium ${isLight ? "text-gray-800" : "text-white"}`}>{author.name}</p>
              <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`}>{author.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
              <span className={isLight ? "text-gray-600" : "text-gray-400"}>{publishDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className={`h-4 w-4 mr-1 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
              <span className={isLight ? "text-gray-600" : "text-gray-400"}>{readTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10"
      >
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
          <Image src={featuredImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-10"
      >
        <div
          className={`prose max-w-none ${
            isLight
              ? "prose-purple prose-headings:text-gray-800 prose-p:text-gray-700"
              : "prose-invert prose-headings:text-white prose-p:text-gray-300"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-10"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tag className={`h-5 w-5 ${isLight ? "text-gray-700" : "text-gray-400"}`} />
          {tags.map((tag, index) => (
            <Link href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`} key={index}>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  isLight
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className={`p-6 rounded-xl flex flex-wrap justify-between gap-4 ${
          isLight
            ? "bg-white border border-gray-200 shadow-sm"
            : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
        }`}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className={
              isLight
                ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save for later
          </Button>

          <Button
            variant="outline"
            className={
              isLight
                ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <Button className={isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Leave a comment
        </Button>
      </motion.div>
    </div>
  )
}

