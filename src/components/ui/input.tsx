"use client"

import type React from "react"
import { useState, useId, useCallback } from "react"
import { cn } from "../../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  contentBefore?: React.ReactNode
  contentAfter?: React.ReactNode
}

export function Input({ label, contentBefore, contentAfter, className, disabled = false, id, ...props }: InputProps) {
  const inputId = useId()
  const uniqueId = id || inputId
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
      <div
        className={cn(
          "relative flex items-center w-full border border-gray-300 rounded overflow-hidden",
          "transition-all duration-200 ease-out",
        //   isFocused ? "border-primary ring-1 ring-primary" : "border-gray-300",
          disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white",
          // Blue bottom border on focus
          isFocused ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : 'after:absolute after:bottom-0 after:left-0 after:h-[1.2px] after:w-full after:bg-primary',
        )}
      >
        {contentBefore && (
          <div
            className={cn(
              "flex items-center px-3 text-gray-500",
              disabled && "text-gray-400",
              // Add border-r if contentBefore is present and not disabled
              contentBefore && !disabled && "border-r border-gray-200",
            )}
          >
            {contentBefore}
          </div>
        )}
        <input
          id={uniqueId}
          className={cn(
            "flex-1 px-3 py-2 text-sm outline-none bg-transparent",
            "transition-colors duration-200 ease-out",
            isFocused && "bg-blue-50", // Light blue background on focus
            disabled ? "text-gray-500" : "text-gray-900",
            // Remove default border as parent div handles it
            "border-none focus:ring-0 focus:outline-none",
          )}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
        {contentAfter && (
          <div
          onMouseDown={(e) => e.preventDefault()}
            className={cn(
              "flex items-center px-3 text-gray-500",
              disabled && "text-gray-400",
              // Add border-l if contentAfter is present and not disabled
              contentAfter && !disabled && "border-l border-gray-200",
            )}
          >
            {contentAfter}
          </div>
        )}
      </div>
    </div>
  )
}
