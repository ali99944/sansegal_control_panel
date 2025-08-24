"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TooltipProps {
  children: React.ReactNode
  content: string | React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  trigger?: "hover" | "click"
  delay?: number
  className?: string
  disabled?: boolean
  arrow?: boolean
}

export default function Tooltip({
  children,
  content,
  position = "top",
  trigger = "hover",
  delay = 300,
  className = "",
  disabled = false,
  arrow = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [actualPosition, setActualPosition] = useState(position)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  // Calculate tooltip position to avoid viewport overflow
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    let newPosition = position

    // Check if tooltip overflows viewport and adjust position
    switch (position) {
      case "top":
        if (triggerRect.top - tooltipRect.height < 0) {
          newPosition = "bottom"
        }
        break
      case "bottom":
        if (triggerRect.bottom + tooltipRect.height > viewport.height) {
          newPosition = "top"
        }
        break
      case "left":
        if (triggerRect.left - tooltipRect.width < 0) {
          newPosition = "right"
        }
        break
      case "right":
        if (triggerRect.right + tooltipRect.width > viewport.width) {
          newPosition = "left"
        }
        break
    }

    setActualPosition(newPosition)
  }

  const showTooltip = () => {
    if (disabled) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const toggleTooltip = () => {
    if (disabled) return
    setIsVisible(!isVisible)
  }

  // Handle click outside for click trigger
  useEffect(() => {
    if (trigger === "click" && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          tooltipRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          hideTooltip()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [trigger, isVisible])

  // Calculate position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      calculatePosition()
    }
  }, [isVisible])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipClasses = () => {
    const baseClasses = "absolute z-[300] px-3 py-1.5 text-sm text-white bg-gray-900 rounded-lg shadow whitespace-nowrap max-w-xs"
    
    const positionClasses = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    }

    return `${baseClasses} ${positionClasses[actualPosition]}`
  }

  const getArrowClasses = () => {
    if (!arrow) return ""

    const arrowClasses = {
      top: "absolute top-full left-1/2 transform -translate-x-1/2 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900",
      bottom: "absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-6 border-r-6 border-b-6 border-transparent border-b-gray-900",
      left: "absolute left-full top-1/2 transform -translate-y-1/2 border-t-6 border-b-6 border-l-6 border-transparent border-l-gray-900",
      right: "absolute right-full top-1/2 transform -translate-y-1/2 border-t-6 border-b-6 border-r-6 border-transparent border-r-gray-900",
    }

    return arrowClasses[actualPosition]
  }

  const triggerProps = trigger === "hover" 
    ? {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      }
    : {
        onClick: toggleTooltip,
      }

  return (
    <div className={`relative inline-block ${className}`} ref={triggerRef}>
      <div {...triggerProps}>
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={getTooltipClasses()}
          style={{
            animation: "tooltipFadeIn 0.2s ease-out",
          }}
        >
          {content}
          {arrow && <div className={getArrowClasses()} />}
        </div>
      )}
    </div>
  )
}
