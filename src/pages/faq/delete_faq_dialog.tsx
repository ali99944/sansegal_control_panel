"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteFaq } from "../../hooks/use-faqs"
import { Faq } from "../../types/faq"

interface DeleteFaqDialogProps {
  faq: Faq | null
  isOpen: boolean
  onClose: () => void
}

export function DeleteFaqDialog({ faq, isOpen, onClose }: DeleteFaqDialogProps) {
  const { mutate: deleteFaq, isPending } = useDeleteFaq()
  if (!faq) return null

  const handleConfirm = () => {
    deleteFaq({ id: faq.id }, { onSuccess: onClose })
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف السؤال"
      message={`هل أنت متأكد من حذف السؤال: "${faq.question}"؟`}
      confirmText="نعم, حذف"
      loading={isPending}
    />
  )
}