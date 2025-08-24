"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "../../lib/utils"

interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  height?: string | number
  maxHeight?: string | number
  orientation?: "vertical" | "horizontal" | "both"
}

export function ScrollArea({ children, className, height, maxHeight, orientation = "vertical" }: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [, setShowScrollbar] = useState(false)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const checkScrollable = () => {
      if (orientation === "vertical" || orientation === "both") {
        setShowScrollbar(element.scrollHeight > element.clientHeight)
      }
    }

    checkScrollable()
    window.addEventListener("resize", checkScrollable)
    return () => window.removeEventListener("resize", checkScrollable)
  }, [orientation])

  const scrollbarClasses = {
    vertical: "overflow-y-auto overflow-x-hidden",
    horizontal: "overflow-x-auto overflow-y-hidden",
    both: "overflow-auto",
  }

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative",
        scrollbarClasses[orientation],
        "custom-scroll",
        "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
        className,
      )}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }}
    >
      {children}
    </div>
  )
}
