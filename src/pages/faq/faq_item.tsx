"use client"

import { useState } from "react"
import { ChevronDown, Edit, Trash2 } from "lucide-react"
import { Faq } from "../../types/faq"
import Card from "../../components/ui/card"
import Button from "../../components/ui/button"


interface FaqItemProps {
  faq: Faq
  onEdit: (faq: Faq) => void
  onDelete: (faq: Faq) => void
}

export function FaqItem({ faq, onEdit, onDelete }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-semibold text-gray-800">{faq.question}</h4>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="xs" onClick={(e) => { e.stopPropagation(); onEdit(faq); }}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="danger" size="xs" onClick={(e) => { e.stopPropagation(); onDelete(faq); }}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>
      {isOpen && (
        <div className="p-4 border-t text-gray-600 bg-white">
          <p className="whitespace-pre-wrap">{faq.answer}</p>
        </div>
      )}
    </Card>
  )
}