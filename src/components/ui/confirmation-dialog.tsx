"use client"

import type React from "react"
import { AlertTriangle, CheckCircle } from 'lucide-react'
import Dialog from "./dialog"
import Button from "./button"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  loading?: boolean
  variant?: "default" | "success"
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  loading = false,
  variant = "default",
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  const iconColor = variant === "success" ? "text-green-600" : "text-blue-600"
  const iconBg = variant === "success" ? "bg-green-100" : "bg-blue-100"
  const Icon = variant === "success" ? CheckCircle : AlertTriangle

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm" className="!h-fit">
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full ${iconBg} mb-4`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "success" ? "primary" : "primary"}
            size="sm"
            onClick={handleConfirm}
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
