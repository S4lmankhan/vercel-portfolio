"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "./error-boundary"
import { ProfessionalAIIcon } from "./professional-ai-icon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

interface UserInfo {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  timeline?: string
}

// Declare SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Salman's AI assistant. I can help you explore his portfolio, discuss project requirements, schedule consultations, or answer any questions about his services.",
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTask, setCurrentTask] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Speech Recognition setup
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()

        if (recognitionRef.current) {
          recognitionRef.current.continuous = true
          recognitionRef.current.interimResults = true

          recognitionRef.current.onresult = (event: any) => {
            const current = event.resultIndex
            const result = event.results[current]
            const transcriptText = result[0].transcript

            setTranscript(transcriptText)
          }

          recognitionRef.current.onend = () => {
            if (isListening) {
              recognitionRef.current?.start()
            }
          }
        }
      }

      // Speech Synthesis setup
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis

        // Get available voices
        const loadVoices = () => {
          const voices = synthRef.current?.getVoices() || []
          setAvailableVoices(voices)
        }

        // Chrome loads voices asynchronously
        if (synthRef.current.onvoiceschanged !== undefined) {
          synthRef.current.onvoiceschanged = loadVoices
        }

        loadVoices()
      }

      // Auto-greet when first opened
      if (isOpen && !isMuted && messages.length === 1) {
        setTimeout(() => {
          speakText(messages[0].content)
        }, 500) // Small delay to ensure voices are loaded
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [isOpen, isListening, isMuted, messages])

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }

      // Process the final transcript if it exists
      if (transcript.trim()) {
        handleUserMessage(transcript)
        setTranscript("")
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
    }

    setIsListening(!isListening)
  }

  const handleUserMessage = async (text: string) => {
    // Add user message
    const userMessage = { role: "user" as const, content: text }
    setMessages((prev) => [...prev, userMessage])

    // Process the message
    setIsProcessing(true)

    // Handle ongoing tasks first
    if (currentTask === "collecting_info") {
      handleInfoCollection(text)
      return
    }

    // Simulate AI response with a professional 1-second delay
    setTimeout(() => {
      let response = ""

      const lowerText = text.toLowerCase()

      // Enhanced professional responses
      if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        response =
          "Hello! I'm pleased to assist you today. I can provide information about Salman's portfolio, discuss your project requirements, or help schedule a consultation. How may I help you with your specific needs?"
      }
      // Portfolio inquiries with more detail
      else if (lowerText.includes("portfolio") || lowerText.includes("work") || lowerText.includes("projects")) {
        response =
          "Salman has developed an impressive portfolio across multiple disciplines. His work includes responsive web applications, AI-driven solutions, and creative design projects. Would you like to explore a specific category of his work? I can provide detailed examples from his web development, AI implementations, or design projects."
      }
      // More professional contact response
      else if (lowerText.includes("contact") || lowerText.includes("hire") || lowerText.includes("email")) {
        response =
          "You can reach Salman directly at contact@salmankhan.dev or through the contact form on this site. For a more personalized approach, I'd be happy to help schedule a consultation call to discuss your project requirements in detail. Would that be helpful for you?"
      }
      // Enhanced scheduling response
      else if (
        lowerText.includes("schedule") ||
        lowerText.includes("appointment") ||
        lowerText.includes("call") ||
        lowerText.includes("meeting")
      ) {
        response =
          "I'd be pleased to assist with scheduling a consultation. Salman is available Monday through Friday, 9am to 6pm PKT. He offers both video and voice calls depending on your preference. What date and time would work best for your schedule? Once confirmed, you'll receive a calendar invitation with all the necessary details."
        setCurrentTask("scheduling")
      }
      // More detailed skills response
      else if (lowerText.includes("skill") || lowerText.includes("experience") || lowerText.includes("expertise")) {
        response =
          "Salman brings extensive expertise across multiple domains. His core competencies include full-stack web development with React and Next.js, AI/ML implementations using Python and TensorFlow, blockchain technologies, and professional UI/UX design. He also has significant experience with cloud infrastructure, database optimization, and responsive design principles. Which specific area would you like to explore further?"
      }
      // More professional pricing response
      else if (
        lowerText.includes("price") ||
        lowerText.includes("cost") ||
        lowerText.includes("rate") ||
        lowerText.includes("quote")
      ) {
        response =
          "Pricing is tailored to each project's specific requirements and scope. Salman offers flexible engagement models including fixed-price projects, hourly rates, and retainer arrangements. To provide you with an accurate estimate, could you share some details about your project's scope, timeline, and objectives? This will help us determine the most suitable approach for your needs."
        setCurrentTask("pricing")
      }
      // Enhanced project inquiry response
      else if (
        lowerText.includes("project") ||
        lowerText.includes("need") ||
        lowerText.includes("looking for") ||
        lowerText.includes("help with")
      ) {
        response =
          "I'd be delighted to discuss your project requirements. To help Salman understand your needs better and provide the most relevant solutions, could you share some details about your project? Specifically, what type of service are you looking for, what problem are you trying to solve, and what are your key objectives for this initiative?"
        setCurrentTask("collecting_info")
      }
      // Professional thank you response
      else if (lowerText.includes("thank")) {
        response =
          "You're most welcome! It's been my pleasure to assist you. Is there anything else I can help you with regarding Salman's services or your project requirements? Feel free to reach out anytime you need further information or assistance."
      }
      // Enhanced web development response
      else if (lowerText.includes("web") || lowerText.includes("website") || lowerText.includes("app")) {
        response =
          "Salman specializes in creating responsive, high-performance web applications using modern technologies like React, Next.js, and TypeScript. His web development services include e-commerce platforms, AI-integrated tools, custom web applications, and progressive web apps. Each solution is built with scalability, security, and optimal user experience in mind. Would you like to see specific examples from his web development portfolio or discuss a particular web project you have in mind?"
      }
      // Enhanced design response
      else if (lowerText.includes("design") || lowerText.includes("graphic") || lowerText.includes("logo")) {
        response =
          "Salman offers comprehensive design services including brand identity development, UI/UX design, logo creation, and 3D graphics. His design philosophy centers on the perfect balance between aesthetic appeal and functional user experience. Each design project begins with thorough research and conceptualization to ensure the final product aligns perfectly with the client's brand and objectives. Would you like to explore his design portfolio or discuss a specific design project you're considering?"
      }
      // Enhanced AI response
      else if (
        lowerText.includes("ai") ||
        lowerText.includes("machine learning") ||
        lowerText.includes("artificial intelligence")
      ) {
        response =
          "Salman has extensive expertise in AI and machine learning implementations. His work includes developing custom AI solutions, creating intelligent automation workflows, building predictive analytics systems, and implementing natural language processing applications. He's proficient with Python, TensorFlow, PyTorch, and various AI frameworks. Would you like to discuss a specific AI project or explore case studies of his previous AI implementations?"
      }
      // Blockchain expertise
      else if (lowerText.includes("blockchain") || lowerText.includes("crypto") || lowerText.includes("web3")) {
        response =
          "Salman has significant experience with blockchain technologies and Web3 development. His expertise includes smart contract development, decentralized application (dApp) creation, and blockchain integration with existing systems. He's  decentralized application (dApp) creation, and blockchain integration with existing systems. He's worked with Ethereum, Solidity, and various Web3 frameworks to deliver secure and efficient blockchain solutions. Would you like to discuss a specific blockchain project or learn more about his approach to Web3 development?"
      }
      // Timeline inquiries
      else if (lowerText.includes("timeline") || lowerText.includes("deadline") || lowerText.includes("how long")) {
        response =
          "Project timelines vary based on scope, complexity, and specific requirements. Salman is known for delivering high-quality work within agreed timeframes. For a typical web development project, the timeline might range from 2-8 weeks, while smaller design projects might be completed in 1-2 weeks. To provide a more accurate timeline for your specific project, could you share some details about its scope and requirements?"
      }
      // Process inquiries
      else if (
        lowerText.includes("process") ||
        lowerText.includes("how do you work") ||
        lowerText.includes("workflow")
      ) {
        response =
          "Salman follows a structured process to ensure project success. This typically begins with a detailed discovery phase to understand your requirements, followed by planning and conceptualization. Development or design work proceeds with regular check-ins and feedback sessions. Before delivery, all work undergoes thorough testing and quality assurance. After launch, ongoing support is available to address any questions or adjustments. Would you like more details about a specific phase of this process?"
      }
      // Default response (more professional)
      else {
        response =
          "Thank you for your interest in Salman's services. To provide you with the most relevant information, could you specify which aspect of his expertise you're interested in? Whether it's web development, design, AI solutions, or another area, I'm here to guide you through the options and help you determine the best approach for your specific needs."
      }

      // Simulate typing effect with delay
      setIsTyping(true)

      // Add assistant response after a 1-second delay
      setTimeout(() => {
        const assistantMessage = { role: "assistant" as const, content: response }
        setMessages((prev) => [...prev, assistantMessage])

        // Speak the response if not muted
        if (!isMuted) {
          speakText(response)
        }

        setIsProcessing(false)
        setIsTyping(false)
      }, 1000)
    }, 1000) // Initial 1-second delay before starting to "type"
  }

  const handleInfoCollection = (text: string) => {
    const lowerText = text.toLowerCase()
    let response = ""
    let nextStep = true

    // Set processing state
    setIsProcessing(true)

    // Simulate a delay before processing the response
    setTimeout(() => {
      // Check what information we're missing and ask for it
      if (!userInfo.name) {
        setUserInfo((prev) => ({ ...prev, name: text }))
        response = `Thank you, ${text}! To ensure we can follow up properly, could you please provide your email address?`
      } else if (!userInfo.email) {
        // Simple email validation
        if (lowerText.includes("@") && lowerText.includes(".")) {
          setUserInfo((prev) => ({ ...prev, email: text }))
          response =
            "Excellent. Now, to help us understand your needs better, could you please describe the type of project you're interested in? For example, is it web development, design work, AI implementation, or something else?"
        } else {
          response =
            "I apologize, but that doesn't appear to be a valid email address. Could you please provide a valid email so we can contact you regarding your project?"
          nextStep = false
        }
      } else if (!userInfo.projectType) {
        setUserInfo((prev) => ({ ...prev, projectType: text }))
        response =
          "Thank you for that information. To help us provide an appropriate estimate, could you share your approximate budget range for this project?"
      } else if (!userInfo.budget) {
        setUserInfo((prev) => ({ ...prev, budget: text }))
        response =
          "Great. And finally, what's your expected timeline or deadline for this project? This will help us determine resource availability and delivery schedules."
      } else if (!userInfo.timeline) {
        setUserInfo((prev) => ({ ...prev, timeline: text }))

        // All information collected, provide summary
        const summary = `
        Thank you for providing all these details. Here's a summary of the information you've shared:
        
        Name: ${userInfo.name}
        Email: ${userInfo.email}
        Project Type: ${userInfo.projectType}
        Budget: ${userInfo.budget}
        Timeline: ${text}
        
        Salman will review this information and get back to you within 24 hours with a personalized response. In the meantime, is there any additional information about your project that you'd like to share?
      `

        setUserInfo((prev) => ({ ...prev, timeline: text }))
        response = summary
        setCurrentTask(null) // End the info collection task
      }

      // Simulate typing effect
      setIsTyping(true)

      // Add assistant response after a delay
      setTimeout(() => {
        const assistantMessage = { role: "assistant" as const, content: response }
        setMessages((prev) => [...prev, assistantMessage])

        // Speak the response if not muted
        if (!isMuted) {
          speakText(response)
        }

        setIsProcessing(false)
        setIsTyping(false)
      }, 1000)
    }, 1000) // Initial delay before processing
  }

  const speakText = (text: string) => {
    if (synthRef.current && !isMuted) {
      synthRef.current.cancel() // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text)

      // Find the best professional voice
      const findBestVoice = () => {
        // Priority order for professional voices
        const preferredVoices = [
          // Premium voices first (often more professional sounding)
          availableVoices.find((v) => v.name.includes("Premium") && v.name.includes("Male")),
          availableVoices.find((v) => v.name.includes("Daniel") || v.name.includes("James")),

          // Google voices (generally good quality)
          availableVoices.find((v) => v.name.includes("Google") && v.name.includes("UK") && v.name.includes("Male")),
          availableVoices.find((v) => v.name.includes("Google") && v.name.includes("US") && v.name.includes("Male")),

          // Microsoft voices (also good quality)
          availableVoices.find((v) => v.name.includes("Microsoft") && v.name.includes("Guy")),
          availableVoices.find((v) => v.name.includes("Microsoft") && v.name.includes("David")),
          availableVoices.find((v) => v.name.includes("Microsoft") && v.name.includes("Mark")),

          // Any English male voice
          availableVoices.find((v) => v.lang.includes("en") && v.name.includes("Male")),

          // Any English voice
          availableVoices.find((v) => v.lang.includes("en")),

          // Fallback to any voice
          availableVoices[0],
        ]

        // Return the first available voice from our preference list
        return preferredVoices.find((v) => v !== undefined)
      }

      const bestVoice = findBestVoice()
      if (bestVoice) {
        utterance.voice = bestVoice
      }

      // Professional voice settings - faster and more fluent
      utterance.rate = 1.1 // Slightly faster for more fluent speech
      utterance.pitch = 1.0 // Natural pitch
      utterance.volume = 1.0 // Full volume

      synthRef.current.speak(utterance)
    }
  }

  const toggleMute = () => {
    if (!isMuted && synthRef.current) {
      synthRef.current.cancel() // Stop speaking if unmuting
    }
    setIsMuted(!isMuted)
  }

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault()
    if (transcript.trim()) {
      handleUserMessage(transcript)
      setTranscript("")
    }
  }

  // Enhanced quick action buttons
  const quickActions = [
    { label: "Portfolio", action: () => handleUserMessage("Show me the portfolio") },
    { label: "Services", action: () => handleUserMessage("What services do you offer?") },
    { label: "Contact", action: () => handleUserMessage("How can I contact Salman?") },
    { label: "Start Project", action: () => handleUserMessage("I want to start a project") },
  ]

  return (
    <ErrorBoundary>
      <div className="fixed bottom-20 left-4 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-gray-800/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg w-80 sm:w-96 mb-4 overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gray-900 p-4 border-b border-gray-700">
                <h3 className="text-white font-medium flex items-center">
                  <ProfessionalAIIcon size={20} className="mr-2" />
                  AI Assistant
                </h3>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={toggleMute}
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {isMuted ? (
                              <>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                              </>
                            ) : (
                              <>
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                              </>
                            )}
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{isMuted ? "Unmute Assistant" : "Mute Assistant"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Close Assistant</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-gray-100">
                      {isTyping ? (
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          <span>Processing your request...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick action buttons */}
              <div className="border-t border-gray-700 p-2 flex flex-wrap gap-2 justify-center">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
                    disabled={isProcessing}
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmitText} className="border-t border-gray-700 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type or speak your message..."}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isProcessing}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={toggleListening}
                          className={`${
                            isListening ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"
                          } text-white rounded-md p-2 transition-colors`}
                          disabled={isProcessing}
                          aria-label={isListening ? "Stop listening" : "Start listening"}
                        >
                          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isListening ? "Stop Voice Input" : "Start Voice Input"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isOpen ? "bg-purple-700" : "bg-purple-600"
                } hover:bg-purple-500 text-white rounded-full p-2 shadow-lg transition-colors relative`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle AI assistant"
              >
                <div className="relative w-[30px] h-[30px] flex items-center justify-center">
                  <Image src="/ai-robot.png" alt="AI Assistant" width={30} height={30} className="object-contain" />
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>Salman's AI Assistant</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </ErrorBoundary>
  )
}

