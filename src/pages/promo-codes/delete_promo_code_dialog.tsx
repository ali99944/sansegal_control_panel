"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeletePromoCode } from "../../hooks/use-promo-code"
import { PromoCode } from "../../types/promo-code"

interface DeletePromoCodeDialogProps {
  promoCode: PromoCode | null
  isOpen: boolean
  onClose: () => void
}

export function DeletePromoCodeDialog({ promoCode, isOpen, onClose }: DeletePromoCodeDialogProps) {
  const { mutate: deletePromoCode, isPending } = useDeletePromoCode()

  // Render nothing if no promo code is selected
  if (!promoCode) return null

  const handleDelete = () => {
    deletePromoCode({ id: promoCode.id }, {
      // On successful deletion, close the dialog
      onSuccess: onClose,
    })
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="حذف كود الخصم"
      message={`هل أنت متأكد من حذف كود الخصم "${promoCode.code}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
      confirmText="نعم, حذف"
      loading={isPending}
    />
  )
}