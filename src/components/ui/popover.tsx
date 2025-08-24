"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import Card from "./card"

export type PopoverPlacement = 
  | "top" | "top-start" | "top-end"
  | "right" | "right-start" | "right-end" 
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"

export type PopoverTrigger = "click" | "hover"

export interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  showArrow?: boolean
  className?: string
  contentClassName?: string
  disabled?: boolean
  offset?: number
  delay?: number
  closeDelay?: number
  onOpenChange?: (open: boolean) => void
}

interface Position {
  top: number
  left: number
  arrowTop?: number
  arrowLeft?: number
  arrowClass?: string
}

export default function Popover({
  children,
  content,
  placement = "bottom",
  trigger = "hover",
  className = "",
  contentClassName = "",
  disabled = false,
  offset = 4,
  delay = 0,
  closeDelay = 200,
  onOpenChange,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const calculatePosition = useCallback((): Position => {
    if (!triggerRef.current) return { top: 0, left: 0 }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverElement = popoverRef.current
    
    if (!popoverElement) return { top: 0, left: 0 }

    const popoverRect = popoverElement.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    let top = 0
    let left = 0
    let arrowTop: number | undefined
    let arrowLeft: number | undefined
    let arrowClass = ""

    // Calculate base position
    switch (placement) {
      case "top":
      case "top-start":
      case "top-end":
        top = triggerRect.top - popoverRect.height - offset
        if (placement === "top-start") {
          left = triggerRect.left
        } else if (placement === "top-end") {
          left = triggerRect.right - popoverRect.width
        } else {
          left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        }
        arrowTop = popoverRect.height
        arrowLeft = triggerRect.left + triggerRect.width / 2 - left
        arrowClass = "border-t-0 border-l-transparent border-r-transparent border-b-white dark:border-b-gray-800"
        break

      case "right":
      case "right-start":
      case "right-end":
        left = triggerRect.right + offset
        if (placement === "right-start") {
          top = triggerRect.top
        } else if (placement === "right-end") {
          top = triggerRect.bottom - popoverRect.height
        } else {
          top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        }
        arrowLeft = -6
        arrowTop = triggerRect.top + triggerRect.height / 2 - top
        arrowClass = "border-r-0 border-t-transparent border-b-transparent border-l-white dark:border-l-gray-800"
        break

      case "bottom":
      case "bottom-start":
      case "bottom-end":
        top = triggerRect.bottom + offset
        if (placement === "bottom-start") {
          left = triggerRect.left
        } else if (placement === "bottom-end") {
          left = triggerRect.right - popoverRect.width
        } else {
          left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
        }
        arrowTop = -6
        arrowLeft = triggerRect.left + triggerRect.width / 2 - left
        arrowClass = "border-b-0 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"
        break

      case "left":
      case "left-start":
      case "left-end":
        left = triggerRect.left - popoverRect.width - offset
        if (placement === "left-start") {
          top = triggerRect.top
        } else if (placement === "left-end") {
          top = triggerRect.bottom - popoverRect.height
        } else {
          top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
        }
        arrowLeft = popoverRect.width
        arrowTop = triggerRect.top + triggerRect.height / 2 - top
        arrowClass = "border-l-0 border-t-transparent border-b-transparent border-r-white dark:border-r-gray-800"
        break
    }

    // Viewport boundary adjustments
    if (left < 0) {
      left = 8
    } else if (left + popoverRect.width > viewport.width) {
      left = viewport.width - popoverRect.width - 8
    }

    if (top < 0) {
      top = 8
    } else if (top + popoverRect.height > viewport.height) {
      top = viewport.height - popoverRect.height - 8
    }

    // Add scroll offset
    top += window.scrollY
    left += window.scrollX

    return { top, left, arrowTop, arrowLeft, arrowClass }
  }, [placement, offset])

  const updatePosition = useCallback(() => {
    if (isOpen) {
      const newPosition = calculatePosition()
      setPosition(newPosition)
    }
  }, [isOpen, calculatePosition])

  const openPopover = useCallback(() => {
    if (disabled) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true)
        onOpenChange?.(true)
      }, delay)
    } else {
      setIsOpen(true)
      onOpenChange?.(true)
    }
  }, [disabled, delay, onOpenChange])

  const closePopover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    if (closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false)
        onOpenChange?.(false)
      }, closeDelay)
    } else {
      setIsOpen(false)
      onOpenChange?.(false)
    }
  }, [closeDelay, onOpenChange])

  const handleTriggerClick = useCallback(() => {
    if (trigger === "click") {
      if (isOpen) {
        closePopover()
      } else {
        openPopover()
      }
    }
  }, [trigger, isOpen, openPopover, closePopover])

  const handleTriggerMouseEnter = useCallback(() => {
    if (trigger === "hover") {
      openPopover()
    }
  }, [trigger, openPopover])

  const handleTriggerMouseLeave = useCallback(() => {
    if (trigger === "hover") {
      closePopover()
    }
  }, [trigger, closePopover])

  const handlePopoverMouseEnter = useCallback(() => {
    if (trigger === "hover" && closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
  }, [trigger])

  const handlePopoverMouseLeave = useCallback(() => {
    if (trigger === "hover") {
      closePopover()
    }
  }, [trigger, closePopover])

  // Update position when popover opens or window resizes
  useEffect(() => {
    if (isOpen) {
      updatePosition()
      
      const handleResize = () => updatePosition()
      const handleScroll = () => updatePosition()
      
      window.addEventListener("resize", handleResize)
      window.addEventListener("scroll", handleScroll)
      
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen, updatePosition])

  // Close on click outside
  useEffect(() => {
    if (!isOpen || trigger !== "click") return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        closePopover()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, trigger, closePopover])

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, closePopover])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const popoverContent = (
    <div
      ref={popoverRef}
      className={`absolute z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } ${contentClassName}`}
      style={{
        top: position.top,
        left: position.left,
      }}
      role="tooltip"
      onMouseEnter={handlePopoverMouseEnter}
      onMouseLeave={handlePopoverMouseLeave}
    >
      <Card className="relative p-0 shadow-sm">
        {content}
        
        {/* {showArrow && position.arrowClass && (
          <div
            className={`absolute w-3 h-3 border-4 ${position.arrowClass}`}
            style={{
              top: position.arrowTop,
              left: position.arrowLeft,
            }}
          />
        )} */}
      </Card>
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      >
        {children}
      </div>
      
      {mounted && createPortal(popoverContent, document.body)}
    </>
  )
}
