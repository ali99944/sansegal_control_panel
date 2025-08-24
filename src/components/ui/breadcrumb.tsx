import { ChevronLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Card from "./card"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: LucideIcon
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  variant?: "light" | "dark"
}

export default function Breadcrumb({ items, className = "", variant = "light" }: BreadcrumbProps) {
  const variants = {
    light: {
      link: "text-gray-600 hover:text-primary",
      current: "text-primary font-medium",
      separator: "text-gray-400",
    },
    dark: {
      link: "text-white/80 hover:text-white",
      current: "text-white font-medium",
      separator: "text-white/60",
    },
  }

  const variantStyles = variants[variant]

  return (
    <Card className="!p-2">
      <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <a href={item.href} className={`${variantStyles.link} transition-colors flex items-center gap-1`}>
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </a>
          ) : (
            <span className={`${variantStyles.current} flex items-center gap-1`}>
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <ChevronLeft className={`w-4 h-4 ${variantStyles.separator}`} />}
        </div>
      ))}
    </nav>
    </Card>
  )
}
