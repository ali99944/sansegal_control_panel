"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Card from "./card"

interface DropdownProps {
  trigger: React.ReactNode
  content: React.ReactNode
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  disabled?: boolean
  className?: string
  contentClassName?: string
  closeOnClick?: boolean
  offset?: number
}

export default function Dropdown({
  trigger,
  content,
  position = "bottom-left",
  disabled = false,
  className = "",
  contentClassName = "",
  offset = 8,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const getPositionClasses = () => {
    const positions = {
      "bottom-left": `top-full left-0 mt-${offset === 8 ? "2" : "1"}`,
      "bottom-right": `top-full right-0 mt-${offset === 8 ? "2" : "1"}`,
      "top-left": `bottom-full left-0 mb-${offset === 8 ? "2" : "1"}`,
      "top-right": `bottom-full right-0 mb-${offset === 8 ? "2" : "1"}`,
    }
    return positions[position]
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <div
        onClick={handleTriggerClick}
        className={`${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {trigger}
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className={`absolute z-50 ${getPositionClasses()}`}
          style={{
            animation: "dropdownSlideIn 0.15s ease-out",
          }}
        >
          <Card
            className={`border border-gray-200 shadow ${contentClassName}`}
          >
            {content}
          </Card>
        </div>
      )}

      <style>{`
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
