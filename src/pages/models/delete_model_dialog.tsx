"use client"

import DangerDialog from "../../components/ui/danger-dialog"
import { useDeleteModel } from "../../hooks/use-models"
import { AppModel } from "../../types/model"

interface DeleteModelDialogProps {
  model: AppModel | null
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function DeleteModelDialog({ model, isOpen, onClose, onSuccess }: DeleteModelDialogProps) {
  const { mutate: deleteModel, isPending } = useDeleteModel(model?.id)
  if (!model) return null

  const handleDelete = () => {
    deleteModel({}, { onSuccess: () => { onClose(); onSuccess?.() }})
  }

  return (
    <DangerDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="حذف صورة الموديل"
      message="هل أنت متأكد من حذف هذه الصورة؟ سيتم فك ارتباطها من جميع المنتجات. لا يمكن التراجع عن هذا الإجراء."
      confirmText="نعم, حذف"
      loading={isPending}
    />
  )
}