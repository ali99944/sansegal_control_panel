"use client"

import { useContext } from "react"
import { NotificationContext } from "../providers/notification-provider"

// interface NotificationOptions {
//   title?: string
//   actions?: Array<{
//     label: string
//     onClick: () => void
//     variant?: "primary" | "secondary"
//   }>
//   persistent?: boolean
//   image?: string
// }

export const useNotifications = () => {
  const { addNotification, removeNotification } = useContext(NotificationContext)

  const notify = {
    success: (message: string) => {
      addNotification(message, "success")
    },
    error: (message: string) => {
      addNotification(message, "error")
    },
    warning: (message: string) => {
      addNotification(message, "warning")
    },
    info: (message: string) => {
      addNotification(message, "info")
    },
    // cart: (message: string) => {
    //   addNotification(message, "cart")
    // },
    // order: (message: string) => {
    //   addNotification(message, "order")
    // },
    // shipping: (message: string) => {
    //   addNotification(message, "shipping")
    // },
  }

  return {
    notify,
    removeNotification,
  }
}

// Usage examples:
/*
const { notify } = useNotifications()

// Simple notification
notify.success("تم إضافة المنتج إلى السلة")

// With title and actions
notify.cart("تم إضافة المنتج إلى السلة", {
  title: "نجح الإضافة!",
  image: "/product-image.jpg",
  actions: [
    {
      label: "عرض السلة",
      onClick: () => router.push("/cart"),
      variant: "primary"
    },
    {
      label: "متابعة التسوق",
      onClick: () => {},
      variant: "secondary"
    }
  ]
})
*/
