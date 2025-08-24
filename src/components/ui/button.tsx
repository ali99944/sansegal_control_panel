"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Loader2 } from 'lucide-react'
import { IconType } from "react-icons/lib"
import { Link } from "react-router-dom"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primary-inverted" | "secondary" | "accent" | "outline" | "ghost" | "danger"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: LucideIcon | IconType
  iconPosition?: "left" | "right"
  children?: ReactNode
  asLink?: boolean
  href?: string
}

export default function Button({ 
  variant = "primary", 
  size = "sm", 
  loading = false,
  icon: Icon,
  iconPosition = "left",
  children, 
  className = "", 
  asLink = false,
  href,
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses =
    " rounded transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    "primary-inverted": "bg-white hover:bg-white/90 text-primary",
    secondary: "bg-secondary hover:bg-secondary/80 text-white",
    accent: "bg-accent hover:bg-accent/90 text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  }

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  }

  const isDisabled = disabled || loading

  if (asLink) {
    return (
      <Link to={href ?? '#'}>
        <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isDisabled} {...props}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {!loading && Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
          {children}
          {!loading && Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
        </button>
      </Link>
    )
  }

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </button>
  )
}

