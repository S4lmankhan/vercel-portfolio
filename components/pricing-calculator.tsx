"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Calendar, Send, ChevronsDown, ChevronsUp } from "lucide-react"

interface PricingOption {
  id: string
  name: string
  description: string
  features: string[]
  basePrice: number
  pricePerHour?: number
  pricePerPage?: number
  recommended?: boolean
}

export function PricingCalculator() {
  const { theme } = useTheme()
  const isLight = theme === "light"

  // Project parameters
  const [serviceType, setServiceType] = useState<string>("webDevelopment")
  const [complexity, setComplexity] = useState<number>(5)
  const [urgency, setUrgency] = useState<number>(7)
  const [pages, setPages] = useState<number>(5)
  const [hours, setHours] = useState<number>(20)
  const [includesMaintenance, setIncludesMaintenance] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)

  // Calculate price based on parameters
  const [calculatedPrices, setCalculatedPrices] = useState<{ [key: string]: number }>({})

  // Service options
  const pricingOptions: { [key: string]: PricingOption[] } = {
    webDevelopment: [
      {
        id: "basic",
        name: "Basic Website",
        description: "Perfect for small businesses and personal portfolios",
        features: ["Responsive design", "Up to 5 pages", "Contact form", "Basic SEO", "Social media integration"],
        basePrice: 500,
        pricePerPage: 100,
        pricePerHour: 40,
      },
      {
        id: "premium",
        name: "Premium Website",
        description: "Ideal for growing businesses with more complex needs",
        features: [
          "Advanced responsive design",
          "Up to 10 pages",
          "Custom animations",
          "Blog/news section",
          "Advanced SEO optimization",
          "Lead capture forms",
          "Google Analytics setup",
        ],
        basePrice: 1200,
        pricePerPage: 150,
        pricePerHour: 60,
        recommended: true,
      },
      {
        id: "ecommerce",
        name: "E-commerce Solution",
        description: "Full-featured online store with payment processing",
        features: [
          "Product catalog",
          "Shopping cart & checkout",
          "Payment gateway integration",
          "Inventory management",
          "Order processing",
          "Customer accounts",
          "Mobile-optimized shopping experience",
        ],
        basePrice: 2500,
        pricePerPage: 200,
        pricePerHour: 80,
      },
    ],
    graphicDesign: [
      {
        id: "basic",
        name: "Essential Design",
        description: "Simple but effective designs for startups",
        features: ["Logo design", "Basic brand guidelines", "Business card design", "2 revisions included"],
        basePrice: 300,
        pricePerHour: 35,
      },
      {
        id: "premium",
        name: "Brand Identity Package",
        description: "Complete visual identity for established businesses",
        features: [
          "Logo design",
          "Complete brand guidelines",
          "Business card & letterhead",
          "Social media graphics",
          "Email signature",
          "5 revisions included",
        ],
        basePrice: 800,
        pricePerHour: 50,
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Corporate Design System",
        description: "Comprehensive design system for large organizations",
        features: [
          "Logo & visual identity",
          "Extensive brand guidelines",
          "Full stationery design",
          "Marketing materials",
          "Digital asset library",
          "Presentation templates",
          "Unlimited revisions",
        ],
        basePrice: 2000,
        pricePerHour: 75,
      },
    ],
    aiSolutions: [
      {
        id: "basic",
        name: "AI Implementation",
        description: "Basic AI integration for your existing systems",
        features: ["Single AI use case implementation", "API integration", "Basic training", "30 days support"],
        basePrice: 1000,
        pricePerHour: 70,
      },
      {
        id: "advanced",
        name: "Advanced AI Solution",
        description: "Custom AI development for specific business problems",
        features: [
          "Custom AI model development",
          "Data preparation & cleaning",
          "Model training & validation",
          "System integration",
          "Performance monitoring",
          "60 days support",
        ],
        basePrice: 3000,
        pricePerHour: 120,
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Enterprise AI Platform",
        description: "End-to-end AI platform for organization-wide use",
        features: [
          "Multiple AI models",
          "Scalable infrastructure",
          "Data pipeline setup",
          "Cloud deployment",
          "Dashboard & analytics",
          "Staff training",
          "Ongoing support & maintenance",
        ],
        basePrice: 8000,
        pricePerHour: 150,
      },
    ],
  }

  // Calculate prices based on selected parameters
  useEffect(() => {
    const options = pricingOptions[serviceType]
    const newPrices: { [key: string]: number } = {}

    options.forEach((option) => {
      let price = option.basePrice

      // Add complexity factor (0.8 to 1.5x)
      const complexityMultiplier = 0.8 + (complexity / 10) * 0.7
      price = price * complexityMultiplier

      // Add urgency factor (1.0 to 1.8x)
      const urgencyMultiplier = 1.0 + (urgency / 10) * 0.8
      price = price * urgencyMultiplier

      // Add per page cost if applicable
      if (option.pricePerPage && serviceType === "webDevelopment") {
        price += option.pricePerPage * Math.max(0, pages - 3)
      }

      // Add hourly rate for estimated hours
      if (option.pricePerHour) {
        price += option.pricePerHour * hours
      }

      // Add maintenance if selected (20% of base price)
      if (includesMaintenance) {
        price += option.basePrice * 0.2
      }

      newPrices[option.id] = Math.round(price)
    })

    setCalculatedPrices(newPrices)
  }, [serviceType, complexity, urgency, pages, hours, includesMaintenance])

  return (
    <div className={`max-w-6xl mx-auto p-4 sm:p-6 ${isLight ? "text-gray-800" : "text-white"}`}>
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold mb-3 ${isLight ? "text-gray-800" : "text-white"}`}
        >
          Pricing Calculator
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={isLight ? "text-gray-600" : "text-gray-300"}
        >
          Get an instant estimate for your project based on your specific requirements
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-xl p-6 mb-8 ${
          isLight
            ? "bg-white border border-gray-200 shadow-sm"
            : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
        }`}
      >
        <div className="mb-6">
          <h3 className={`text-lg font-medium mb-4 ${isLight ? "text-gray-800" : "text-white"}`}>
            Select service type
          </h3>
          <Tabs defaultValue="webDevelopment" value={serviceType} onValueChange={setServiceType} className="w-full">
            <TabsList className={`grid grid-cols-3 w-full ${isLight ? "bg-gray-100" : "bg-gray-900/50"}`}>
              <TabsTrigger
                value="webDevelopment"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                Web Development
              </TabsTrigger>
              <TabsTrigger
                value="graphicDesign"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                Graphic Design
              </TabsTrigger>
              <TabsTrigger
                value="aiSolutions"
                className={`data-[state=active]:text-white rounded-md ${
                  isLight ? "data-[state=active]:bg-purple-700" : "data-[state=active]:bg-purple-600"
                }`}
              >
                AI Solutions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between mb-4 p-3 rounded-lg ${
            isLight ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-700/50 hover:bg-gray-700 text-gray-200"
          }`}
        >
          <span className="font-medium">Customize parameters</span>
          {expanded ? <ChevronsUp className="h-5 w-5" /> : <ChevronsDown className="h-5 w-5" />}
        </button>

        {expanded && (
          <div className="space-y-6 mb-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className={isLight ? "text-gray-700" : "text-gray-300"}>Project Complexity</label>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                  }`}
                >
                  {complexity < 4 ? "Simple" : complexity < 7 ? "Moderate" : "Complex"}
                </span>
              </div>
              <Slider
                value={[complexity]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setComplexity(value[0])}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className={isLight ? "text-gray-700" : "text-gray-300"}>Urgency</label>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                  }`}
                >
                  {urgency < 4 ? "Standard" : urgency < 7 ? "Expedited" : "Urgent"}
                </span>
              </div>
              <Slider value={[urgency]} min={1} max={10} step={1} onValueChange={(value) => setUrgency(value[0])} />
            </div>

            {serviceType === "webDevelopment" && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className={isLight ? "text-gray-700" : "text-gray-300"}>Number of Pages</label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                    }`}
                  >
                    {pages} pages
                  </span>
                </div>
                <Slider value={[pages]} min={1} max={20} step={1} onValueChange={(value) => setPages(value[0])} />
              </div>
            )}

            <div>
              <div className="flex justify-between mb-2">
                <label className={isLight ? "text-gray-700" : "text-gray-300"}>Estimated Hours</label>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    isLight ? "bg-purple-100 text-purple-700" : "bg-purple-900/30 text-purple-300"
                  }`}
                >
                  {hours} hours
                </span>
              </div>
              <Slider value={[hours]} min={5} max={100} step={5} onValueChange={(value) => setHours(value[0])} />
            </div>

            <div className="flex items-center justify-between">
              <label className={isLight ? "text-gray-700" : "text-gray-300"}>Include 6-month maintenance</label>
              <Switch checked={includesMaintenance} onCheckedChange={setIncludesMaintenance} />
            </div>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingOptions[serviceType].map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`rounded-xl ${
              isLight
                ? "bg-white border border-gray-200 shadow-sm"
                : "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            } ${option.recommended ? "ring-2 ring-purple-500" : ""}`}
          >
            {option.recommended && (
              <div className="flex justify-center -mt-3">
                <Badge className={`${isLight ? "bg-purple-700" : "bg-purple-600"}`}>Recommended</Badge>
              </div>
            )}

            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${isLight ? "text-gray-800" : "text-white"}`}>{option.name}</h3>

              <p className={`text-sm mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>{option.description}</p>

              <div className="mb-6">
                <span className={`text-3xl font-bold ${isLight ? "text-gray-800" : "text-white"}`}>
                  ${calculatedPrices[option.id] || option.basePrice}
                </span>
                <span className={isLight ? "text-gray-600" : "text-gray-400"}> estimated total</span>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`h-5 w-5 mr-2 ${isLight ? "text-purple-700" : "text-purple-400"}`} />
                    <span className={isLight ? "text-gray-700" : "text-gray-300"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  className={`${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button
                  variant="outline"
                  className={
                    isLight
                      ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  }
                >
                  <Send className="h-4 w-4 mr-2" />
                  Contact for Details
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className={`mb-4 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
          Need a more personalized quote? Contact me directly for a detailed proposal.
        </p>
        <Button
          className={`${isLight ? "bg-purple-700 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-500"}`}
          size="lg"
        >
          Request Custom Quote
        </Button>
      </div>
    </div>
  )
}

