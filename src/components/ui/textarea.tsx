"use client"

import type React from "react"
import { useState, useId, useCallback } from "react"
import { cn } from "../../lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  resizable?: boolean
}

export function Textarea({ label, resizable = true, className, disabled = false, id, ...props }: TextareaProps) {
  const textareaId = useId()
  const uniqueId = id || textareaId
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(() => setIsFocused(true), [])
  const handleBlur = useCallback(() => setIsFocused(false), [])

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={uniqueId} className="block text-base font-normal text-gray-900 mb-2">
          {label}
        </label>
      )}
      <textarea
        id={uniqueId}
        className={cn(
          "flex min-h-[80px] w-full rounded border px-3 py-2 text-sm outline-none",
          "transition-all duration-200 ease-out",
          isFocused ? "border-primary ring-[0.5px] ring-primary" : "border-gray-300",
          disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white text-gray-900",
          resizable ? "resize-y" : "resize-none",
          // Blue bottom border on focus
          isFocused ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : '',
          className, // Apply custom classes last
        )}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </div>
  )
}
