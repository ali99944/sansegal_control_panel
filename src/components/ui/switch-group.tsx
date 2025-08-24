"use client"

import type React from "react"

interface SwitchGroupProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export default function SwitchGroup({ children, className = "", title, description }: SwitchGroupProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}
