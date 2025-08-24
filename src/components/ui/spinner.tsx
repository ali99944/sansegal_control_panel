"use client"

import { cn } from "../../lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const spinnerSizes: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
  xl: "h-12 w-12 border-4",
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = spinnerSizes[size]

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-current border-r-transparent",
        "text-blue-600", // Base color for the spinner
        sizeClasses,
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
