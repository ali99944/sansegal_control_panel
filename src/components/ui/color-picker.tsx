"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Check, Palette } from "lucide-react"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  presetColors?: string[]
  showPresets?: boolean
  showInput?: boolean
  className?: string
  disabled?: boolean
}

const DEFAULT_PRESETS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#64748b", // slate
  "#000000", // black
  "#ffffff", // white
  "#6b7280", // gray
]

export default function ColorPicker({
  value,
  onChange,
  presetColors = DEFAULT_PRESETS,
  showPresets = true,
  showInput = true,
  className = "",
  disabled = false,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const pickerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
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

  // Draw color picker canvas
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, "#ff0000")
    gradient.addColorStop(0.17, "#ffff00")
    gradient.addColorStop(0.33, "#00ff00")
    gradient.addColorStop(0.5, "#00ffff")
    gradient.addColorStop(0.67, "#0000ff")
    gradient.addColorStop(0.83, "#ff00ff")
    gradient.addColorStop(1, "#ff0000")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add white to black gradient
    const whiteGradient = ctx.createLinearGradient(0, 0, 0, height)
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)")
    whiteGradient.addColorStop(0.5, "rgba(255,255,255,0)")
    whiteGradient.addColorStop(0.5, "rgba(0,0,0,0)")
    whiteGradient.addColorStop(1, "rgba(0,0,0,1)")

    ctx.fillStyle = whiteGradient
    ctx.fillRect(0, 0, width, height)
  }, [isOpen])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(x, y, 1, 1)
    const [r, g, b] = imageData.data
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

    onChange(hex)
    setInputValue(hex)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue)
    }
  }

  const handlePresetClick = (color: string) => {
    onChange(color)
    setInputValue(color)
  }

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-white/60 focus:outline-none  transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="w-6 h-6 rounded border border-gray-200" style={{ backgroundColor: value }} />
        <span className="text-sm text-gray-700">{value}</span>
        <Palette className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]">
          {/* Color Canvas */}
          <div className="mb-4">
            <canvas
              ref={canvasRef}
              width={240}
              height={120}
              onClick={handleCanvasClick}
              className="border border-gray-200 rounded cursor-crosshair"
            />
          </div>

          {/* Preset Colors */}
          {showPresets && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">الألوان المحفوظة</p>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handlePresetClick(color)}
                    className={`w-8 h-8 rounded border-2 transition-all cursor-pointer ${
                      value === color ? "border-primary/20" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check
                        className="w-4 h-4 text-white mx-auto"
                        style={{
                          filter: color === "#ffffff" ? "invert(1)" : "none",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          {showInput && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">كود اللون</p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm font-mono"
                placeholder="#000000"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
