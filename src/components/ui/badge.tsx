import type React from "react"
import { cn } from "../../lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-white": variant === "default",
          "bg-secondary text-white": variant === "secondary",
          "bg-destructive text-destructive-foreground": variant === "destructive",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
