"use client"

import { AnimatePresence } from "framer-motion"
import { createContext, useState, ReactNode } from "react"
import Notification, { NotificationType } from "../components/ui/notification"

interface NotificationItem {
  id: string
  message: string
  type: NotificationType
}

interface NotificationContextType {
  addNotification: (message: string, type: NotificationType) => void
  removeNotification: (id: string) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  addNotification: () => {},
  removeNotification: () => {},
})

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = (message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { id, message, type }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 max-w-sm w-full space-y-2" dir="ltr">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              message={notification.message}
              type={notification.type}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}
