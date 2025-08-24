"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteContactMessage } from "../../hooks/use-contact-message"
import { ContactMessage } from "../../types/contact-message"


interface DeleteMessageDialogProps {
  message: ContactMessage | null
  isOpen: boolean
  onClose: () => void
}

export function DeleteMessageDialog({ message, isOpen, onClose }: DeleteMessageDialogProps) {
  const { mutate: deleteMessage, isPending } = useDeleteContactMessage()
  if (!message) return null

  const handleDelete = () => {
    deleteMessage({ id: message.id }, { onSuccess: onClose })
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="حذف الرسالة"
      message={`هل أنت متأكد من حذف رسالة "${message.subject}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="نعم, حذف"
      loading={isPending}
    />
  )
}