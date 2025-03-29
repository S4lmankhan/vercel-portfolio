"use client"

import { ErrorBoundary } from "./error-boundary"
import { ComingSoon } from "./coming-soon"

interface ComingSoonWithErrorHandlingProps {
  title: string
  description?: string
  backLink: string
  backLinkText: string
}

export function ComingSoonWithErrorHandling(props: ComingSoonWithErrorHandlingProps) {
  return (
    <ErrorBoundary>
      <ComingSoon {...props} />
    </ErrorBoundary>
  )
}

