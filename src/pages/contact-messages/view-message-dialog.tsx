"use client"

import { useEffect } from "react"
import { Mail, User, Calendar, MessageSquare } from "lucide-react"
import { ContactMessage } from "../../types/contact-message"
import { useMarkMessageAsRead } from "../../hooks/use-contact-message"
import Dialog from "../../components/ui/dialog"
import { formatDateTime } from "../../lib/date"

interface ViewMessageDialogProps {
  isOpen: boolean
  onClose: () => void
  message: ContactMessage | null
}

export function ViewMessageDialog({ isOpen, onClose, message }: ViewMessageDialogProps) {
  const { mutate: markAsRead } = useMarkMessageAsRead()

  useEffect(() => {
    // When the dialog opens, if the message is unread, mark it as read.
    if (isOpen && message && !message.isRead) {
      markAsRead({ id: message.id })
    }
  }, [isOpen, message, markAsRead])

  if (!message) return null

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="تفاصيل الرسالة" size="lg">
      <div className="space-y-6" dir="rtl">
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">اسم المرسل</p>
              <p className="font-medium text-gray-900">{message.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">البريد الإلكتروني</p>
              <p className="font-medium text-gray-900">{message.email}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h4 className="font-medium text-gray-900">الموضوع</h4>
          </div>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{message.subject}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">محتوى الرسالة</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>تاريخ الإرسال:</span>
          <span className="font-medium text-gray-700">{formatDateTime(message.receivedAt)}</span>
        </div>
      </div>
    </Dialog>
  )
}