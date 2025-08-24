"use client"

import { LucideIcon, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  message: string; // Main message
  subMessage?: string; // Optional sub-message
  icon?: LucideIcon; // Custom icon
  actionText?: string; // Button text
  actionPath?: string; // Navigation path for button
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  subMessage,
  icon: Icon = AlertCircle,
  actionText,
  actionPath,
}) => {
  const navigate = useNavigate()

  return (
    <div className="py-12 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon size={32} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{message}</h2>
        {subMessage && <p className="text-gray-600 mb-4">{subMessage}</p>}
        {actionText && actionPath && (
          <button
            onClick={() => navigate(actionPath)}
            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:from-[#1ed760] hover:to-[#1DB954] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 transition-all duration-200"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState