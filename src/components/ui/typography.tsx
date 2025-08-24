import type React from "react"
import { cn } from "../../lib/utils"

// Typography variant types
export type TypographyVariant =
  | "display-large"
  | "display-medium"
  | "display-small"
  | "headline-large"
  | "headline-medium"
  | "headline-small"
  | "title-large"
  | "title-medium"
  | "title-small"
  | "body-large"
  | "body-medium"
  | "body-small"
  | "label-large"
  | "label-medium"
  | "label-small"

export type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label"

interface TypographyProps {
  variant: TypographyVariant
  element?: TypographyElement
  className?: string
  children: React.ReactNode
}

// Typography variant styles mapping
const typographyStyles: Record<TypographyVariant, string> = {
  "display-large": "text-[57px] font-normal leading-[64px] tracking-tight",
  "display-medium": "text-[45px] font-normal leading-[52px] tracking-tight",
  "display-small": "text-[36px] font-normal leading-[44px] tracking-tight",
  "headline-large": "text-[32px] font-semibold leading-[40px] tracking-tight",
  "headline-medium": "text-[28px] font-semibold leading-[36px] tracking-tight",
  "headline-small": "text-[24px] font-semibold leading-[32px] tracking-tight",
  "title-large": "text-[22px] font-medium leading-[28px] tracking-tight",
  "title-medium": "text-base font-medium leading-6 tracking-normal",
  "title-small": "text-sm font-medium leading-5 tracking-normal",
  "body-large": "text-base font-normal leading-6 tracking-normal",
  "body-medium": "text-sm font-normal leading-5 tracking-normal",
  "body-small": "text-xs font-normal leading-4 tracking-normal",
  "label-large": "text-sm font-medium leading-5 tracking-normal",
  "label-medium": "text-xs font-medium leading-4 tracking-wide",
  "label-small": "text-[11px] font-medium leading-4 tracking-wide uppercase",
}

// Base Typography component with proper typing
export function Typography({
  variant,
  element = "p",
  className,
  children,
  ...props
}: TypographyProps & Omit<React.HTMLAttributes<HTMLElement>, 'children'>) {
  const Component = element as React.ElementType

  return (
    <Component className={cn(typographyStyles[variant], className)} {...props}>
      {children}
    </Component>
  )
}

// Specific typography components for common use cases
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: "large" | "medium" | "small"
  className?: string
  children: React.ReactNode
}

export function Heading({
  level = 1,
  size = "large",
  className,
  children,
  ...props
}: HeadingProps & Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'>) {
  const element = `h${level}` as TypographyElement
  const variant = `headline-${size}` as TypographyVariant

  return (
    <Typography variant={variant} element={element} className={className} {...props}>
      {children}
    </Typography>
  )
}

interface DisplayProps {
  size?: "large" | "medium" | "small"
  className?: string
  children: React.ReactNode
}

export function Display({
  size = "large",
  className,
  children,
  ...props
}: DisplayProps & Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'>) {
  const variant = `display-${size}` as TypographyVariant

  return (
    <Typography variant={variant} element="h1" className={className} {...props}>
      {children}
    </Typography>
  )
}

interface BodyProps {
  size?: "large" | "medium" | "small"
  className?: string
  children: React.ReactNode
}

export function Body({
  size = "medium",
  className,
  children,
  ...props
}: BodyProps & Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'>) {
  const variant = `body-${size}` as TypographyVariant

  return (
    <Typography variant={variant} element="p" className={className} {...props}>
      {children}
    </Typography>
  )
}

interface TitleProps {
  size?: "large" | "medium" | "small"
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  className?: string
  children: React.ReactNode
}

export function Title({
  size = "medium",
  element = "h3",
  className,
  children,
  ...props
}: TitleProps & Omit<React.HTMLAttributes<HTMLElement>, 'children'>) {
  const variant = `title-${size}` as TypographyVariant

  return (
    <Typography variant={variant} element={element} className={className} {...props}>
      {children}
    </Typography>
  )
}

interface LabelProps {
  size?: "large" | "medium" | "small"
  htmlFor?: string
  className?: string
  children: React.ReactNode
}

export function Label({
  size = "medium",
  className,
  children,
  ...props
}: LabelProps & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'>) {
  const variant = `label-${size}` as TypographyVariant

  return (
    <Typography variant={variant} element="label" className={className} {...props}>
      {children}
    </Typography>
  )
}

// Utility component for inline text with specific styling
interface TextProps {
  variant?: TypographyVariant
  className?: string
  children: React.ReactNode
}

export function Text({
  variant = "body-medium",
  className,
  children,
  ...props
}: TextProps & Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>) {
  return (
    <Typography variant={variant} element="span" className={className} {...props}>
      {children}
    </Typography>
  )
}