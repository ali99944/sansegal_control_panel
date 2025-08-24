"use client"

import { useState } from "react"
import { Eye, Trash2, Mail, Inbox, Clock } from "lucide-react"
import DataTable, { Column } from "../../components/datatable"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { formatDate } from "../../lib/date"
import { useContactMessages } from "../../hooks/use-contact-message"
import { ContactMessage } from "../../types/contact-message"
import { DeleteMessageDialog } from "./delete-message-dialog"
import { ViewMessageDialog } from "./view-message-dialog"

export default function ContactMessagesPage() {
  const { data: messages = [], isLoading } = useContactMessages()

  const [dialogState, setDialogState] = useState<{
    viewOpen: boolean;
    deleteOpen: boolean;
    selectedMessage: ContactMessage | null;
  }>({ viewOpen: false, deleteOpen: false, selectedMessage: null })

  // --- Event Handlers ---
  const handleViewMessage = (message: ContactMessage) => {
    setDialogState({ ...dialogState, viewOpen: true, selectedMessage: message })
  }

  const handleDeleteMessage = (message: ContactMessage) => {
    setDialogState({ ...dialogState, deleteOpen: true, selectedMessage: message })
  }

  const closeAllDialogs = () => {
    setDialogState({ viewOpen: false, deleteOpen: false, selectedMessage: null })
  }

  // --- Statistics ---
  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length,
    today: messages.filter(m => new Date(m.receivedAt).toDateString() === new Date().toDateString()).length,
  }

  const kpiCards = [
    { title: "إجمالي الرسائل", value: stats.total, icon: Mail },
    { title: "الرسائل غير المقروءة", value: stats.unread, icon: Inbox },
    { title: "رسائل اليوم", value: stats.today, icon: Clock },
  ]

  // --- DataTable Columns ---
  const columns: Column<ContactMessage>[] = [
    {
      key: "sender",
      title: "المرسل",
      render: (_, row) => (
        <div className={!row.isRead ? "font-bold" : ""}>
          <p className="text-gray-900">{row.fullName}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      key: "subject",
      title: "الموضوع",
      render: (subject) => <p className="line-clamp-2">{subject}</p>
    },
    {
      key: "status",
      title: "الحالة",
      render: (_, row) => (
        <div className="flex items-center gap-2">
            {!row.isRead && <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>}
            <span className={!row.isRead ? 'font-semibold text-primary' : 'text-gray-600'}>
                {row.isRead ? 'مقروءة' : 'جديدة'}
            </span>
        </div>
      )
    },
    {
      key: "receivedAt",
      title: "تاريخ الاستلام",
      render: (date) => formatDate(date),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleViewMessage(row)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteMessage(row)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="رسائل التواصل" />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><card.icon className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          data={messages}
          loading={isLoading}
          searchable
          exportable
        />
      </Card>
      
      {/* Dialogs */}
      <ViewMessageDialog
        isOpen={dialogState.viewOpen}
        onClose={closeAllDialogs}
        message={dialogState.selectedMessage}
      />
      <DeleteMessageDialog
        isOpen={dialogState.deleteOpen}
        onClose={closeAllDialogs}
        message={dialogState.selectedMessage}
      />
    </div>
  )
}