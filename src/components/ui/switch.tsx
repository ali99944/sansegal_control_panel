"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  color?: "primary" | "success" | "warning" | "danger"
  label?: string
  description?: string
  className?: string
  id?: string
}

export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  color = "primary",
  label,
  description,
  className = "",
  id,
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleToggle = () => {
    if (disabled) return
    
    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      handleToggle()
    }
  }

  const sizeClasses = {
    sm: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "-translate-x-0.5",
    },
    md: {
      track: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "-translate-x-0.5",
    },
    lg: {
      track: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "-translate-x-0.5",
    },
  }

  const colorClasses = {
    primary: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  }

  const currentSize = sizeClasses[size]
  const currentColor = colorClasses[color]

  return (
    <div className={`flex flex-col-reverse items-start gap-3 ${className}`}>
      <div className="flex flex-col">
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-labelledby={id ? `${id}-label` : undefined}
          aria-describedby={id && description ? `${id}-description` : undefined}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            relative inline-flex items-center rounded-full transition-all duration-200 ease-in-out
            focus:outline-none 
            ${currentSize.track}
            ${isChecked ? currentColor : "bg-gray-200"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span
            className={`
              inline-block rounded-full bg-white  transform transition-transform duration-200 ease-in-out
              ${currentSize.thumb}
              ${isChecked ? currentSize.translate : "-translate-x-5.5"}
            `}
            style={{
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
            }}
          />
        </button>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              id={id ? `${id}-label` : undefined}
              className={`text-sm font-medium cursor-pointer ${
                disabled ? "text-gray-400" : "text-gray-900"
              }`}
              onClick={!disabled ? handleToggle : undefined}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={id ? `${id}-description` : undefined}
              className={`text-xs mt-1 ${
                disabled ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

