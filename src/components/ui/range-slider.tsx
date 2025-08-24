"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface RangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  className?: string
}

export default function RangeSlider({ min, max, value, onChange, step = 1, className = "" }: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const newValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(newValue / step) * step

    if (isDragging === "min") {
      onChange([Math.min(steppedValue, value[1]), value[1]])
    } else {
      onChange([value[0], Math.max(steppedValue, value[0])])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, value])

  return (
    <div className={`relative ${className}`}>
      <div ref={sliderRef} className="relative h-2 bg-gray-400 rounded-full cursor-pointer">
        {/* Track */}
        <div
          className="absolute h-2 bg-primary rounded-full"
          style={{
            left: `${getPercentage(value[0])}%`,
            width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
          }}
        />

        {/* Min Handle */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
          style={{ left: `${getPercentage(value[0])}%` }}
          onMouseDown={handleMouseDown("min")}
        />

        {/* Max Handle */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
          style={{ left: `${getPercentage(value[1])}%` }}
          onMouseDown={handleMouseDown("max")}
        />
      </div>

      {/* Value Display */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{value[0]} دينار</span>
        <span>{value[1]} دينار</span>
      </div>
    </div>
  )
}
