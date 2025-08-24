"use client"

import { Check } from "lucide-react"
import type { InputHTMLAttributes } from "react"

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export function Checkbox({ label, description, size = "md", className = "", ...props }: CheckboxProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="checkbox" className="sr-only" {...props} />
        <div
          className={`${sizes[size]} rounded transition-all duration-200 ${
            props.checked ? "bg-primary border-primary" : "bg-white hover:border-gray-400 border-2 border-gray-300 "
          }`}
        >
          {props.checked && (
            <Check
              className={`${sizes[size]} text-white p-0.5 transition-all duration-200`}
              style={{
                transform: props.checked ? "scale(1)" : "scale(0)",
                opacity: props.checked ? 1 : 0,
              }}
            />
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="text-right">
          {label && <div className="font-medium text-primary">{label}</div>}
          {description && <div className="text-sm text-gray-600">{description}</div>}
        </div>
      )}
    </label>
  )
}

