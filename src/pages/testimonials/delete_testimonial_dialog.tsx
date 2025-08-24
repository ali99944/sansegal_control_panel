"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteTestimonial } from "../../hooks/use-testimonials"
import { Testimonial } from "../../types/testimonial"

interface DeleteTestimonialDialogProps {
  testimonial: Testimonial | null
  isOpen: boolean
  onClose: () => void
}

export function DeleteTestimonialDialog({ testimonial, isOpen, onClose }: DeleteTestimonialDialogProps) {
  const { mutate: deleteTestimonial, isPending } = useDeleteTestimonial()
  if (!testimonial) return null

  const handleConfirm = () => {
    deleteTestimonial({ id: testimonial.id }, { onSuccess: onClose })
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="حذف الشهادة"
      message={`هل أنت متأكد من حذف شهادة العميل "${testimonial.name}"؟`}
      confirmText="نعم, حذف"
      loading={isPending}
    />
  )
}