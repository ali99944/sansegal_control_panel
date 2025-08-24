"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDetachModel } from "../../hooks/use-models"

interface UnlinkModelDialogProps {
  modelId?: number
  productId?: number
  productName?: string
  isOpen: boolean
  onClose: () => void
}

export function UnlinkModelDialog({ modelId, productId, productName, isOpen, onClose }: UnlinkModelDialogProps) {
  const { mutate: detachModel, isPending } = useDetachModel()
  if (!modelId || !productId) return null

  const handleConfirm = () => {
    detachModel({ modelId, productId }, { onSuccess: onClose })
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="فك ارتباط المنتج"
      message={`هل أنت متأكد من فك ارتباط هذه الصورة بالمنتج "${productName}"؟`}
      confirmText="نعم, فك الارتباط"
      loading={isPending}
    />
  )
}