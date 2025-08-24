"use client"

import { AlertTriangle } from 'lucide-react'
import Dialog from "./dialog"
import Button from "./button"

interface DangerDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export default function DangerDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "حذف",
  cancelText = "إلغاء",
  loading = false,
}: DangerDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm" className='!h-fit'>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        <h3 className="text-lg font-bold text-red-600 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

