import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomBar } from "@/components/bottom-bar"
import { ErrorBoundary } from "@/components/error-boundary"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeToggle } from "@/components/theme-toggle"
import { VoiceAgent } from "@/components/voice-agent"
import { ParticleBackground } from "@/components/particle-background"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Salman Khan - Cryptography, Blockchain & AI-ML Enthusiast",
  description:
    "Portfolio of Salman Khan, a multi-skilled professional specializing in graphic designing, full-stack web development, video editing, AI/ML, cryptography, blockchain, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="cursor-none">
      <head>
        <style>{`
          * {
            cursor: none !important;
          }
        `}</style>
      </head>
      <body className={`${inter.className} cursor-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <div className="min-h-screen bg-gradient-custom text-foreground relative cursor-none">
              <ParticleBackground />
              <ErrorBoundary>
                <PerformanceOptimizer />
                <CustomCursor />
                <ThemeToggle />
                {children}
                <BottomBar />
                <VoiceAgent />
              </ErrorBoundary>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'