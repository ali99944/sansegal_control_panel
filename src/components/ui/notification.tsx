"use client"

import { useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { NotificationContext } from "../../providers/notification-provider"

export type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationProps {
  id: string
  message: string
  type: NotificationType
}

export default function Notification({ id, message, type }: NotificationProps) {
  const { removeNotification } = useContext(NotificationContext)

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id)
    }, 5000)
    return () => clearTimeout(timer)
  }, [id, removeNotification])

  const typeConfig = {
    info: {
      bg: "bg-[#003049]",
      border: "border-white/0",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      text: "text-white",
      accent: "bg-white/60",
      shadow: "shadow-[#003049]/20",
    },
    error: {
      bg: "bg-destructive",
      border: "border-white/0",
      icon: <AlertCircle className="w-5 h-5 text-white" />,
      text: "text-white",
      accent: "bg-white/60",
      shadow: "shadow-red-100",
    },
    warning: {
      bg: "bg-[#f77f00]",
      border: "border-[#f77f00]",
      icon: <AlertTriangle className="w-5 h-5 text-white" />,
      text: "text-white",
      accent: "bg-white/60", 
      shadow: "shadow-[#f77f00]/20",
    },
    success: {
      bg: "bg-secondary",
      border: "border-primary/60",
      icon: <Info className="w-5 h-5 !text-white" />,
      text: "text-white",
      accent: "bg-white/60",
      shadow: "shadow-primary/20",
    },
  }

  const config = typeConfig[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`
        relative overflow-hidden rounded border backdrop-blur-sm
        ${config.bg} ${config.border} ${config.shadow}
        shadow  transition-shadow duration-300
      `}
      dir="rtl"
    >
      {/* Accent bar */}
      <div className={`absolute top-0 right-0 w-1 h-full ${config.accent}`} />
      
      {/* Progress bar for auto-dismiss */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
        className={`absolute bottom-0 right-0 h-0.5 ${config.accent} opacity-30`}
      />

      <div className="p-3 pr-5">
        <div className="flex items-start gap-3">
          {/* Icon with subtle animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 mt-0.5"
          >
            {config.icon}
          </motion.div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`text-sm font-medium leading-relaxed ${config.text}`}
            >
              {message}
            </motion.p>
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => removeNotification(id)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/50 transition-colors duration-200 group cursor-pointer"
          >
            <X className="w-4 h-4 text-white group-hover:text-gray-700" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
