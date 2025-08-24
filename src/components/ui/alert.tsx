"use client"

import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"

interface AlertProps {
  type: "success" | "error" | "warning" | "info"
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

export default function Alert({ type, title, message, onClose, className = "" }: AlertProps) {
  const styles = {
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    },
    info: {
      container: "bg-primary/10  text-primary",
      icon: <Info className="w-5 h-5 text-primary" />,
    },
  }

  const style = styles[type]

  return (
    <div className={`rounded-lg p-4 ${style.container} ${className}`}>
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="flex-1 text-right">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-600 hover:text-gray-600 transition-colors duration-300 cursor-pointer hover:bg-gray-200 rounded p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
