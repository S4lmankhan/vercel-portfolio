import type { ReactNode } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ServicesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  )
}

