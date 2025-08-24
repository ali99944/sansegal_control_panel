"use client"

import { useGetQuery, useMutationAction } from "./queries-actions"
import type { ContactMessage } from "../types/contact-message"
import { useNotifications } from "./use-notification"
import { getApiError } from "../lib/error_handler"

/**
 * Hook to fetch all contact messages.
 */
export function useContactMessages() {
  return useGetQuery<ContactMessage[]>({
    key: ["contact-messages"],
    url: "contact-messages",
  })
}

/**
 * Hook to mark a message as read.
 * This is triggered automatically when a message is viewed.
 */
export function useMarkMessageAsRead() {
  return useMutationAction<ContactMessage, { id: number }>({
    method: "put",
    url: "contact-messages", // The ID will be appended to the URL
    key: ["contact-messages"], // Invalidate the list to update the 'read' status indicator
  })
}

/**
 * Hook for deleting a contact message.
 */
export function useDeleteContactMessage() {
  const { notify } = useNotifications()
  return useMutationAction<unknown, { id: number }>({
    method: "delete",
    url: "contact-messages", // The ID will be appended to the URL
    key: ["contact-messages"],
    onSuccessCallback: () => {
      notify.success("تم حذف الرسالة بنجاح.")
    },
    onErrorCallback: (error) => {
      notify.error(getApiError(error).message)
    },
  })
}