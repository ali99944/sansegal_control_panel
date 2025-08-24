"use client"

import { useState, useMemo } from "react"
import { Plus, MessageSquare, Link as LinkIcon } from "lucide-react"
import { useTestimonials } from "../../hooks/use-testimonials"
import type { Testimonial } from "../../types/testimonial"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { DeleteTestimonialDialog } from "./delete_testimonial_dialog"
import { TestimonialCard } from "./testimonial_card"
import { TestimonialFormDialog } from "./testimonial_form"

export default function TestimonialsPage() {
  // Data Fetching
  const { data: testimonials = [], isLoading } = useTestimonials()

  // State Management
  const [dialogState, setDialogState] = useState<{
    formOpen: boolean;
    deleteOpen: boolean;
    selectedTestimonial: Testimonial | null;
  }>({ formOpen: false, deleteOpen: false, selectedTestimonial: null })

  // --- Event Handlers ---
  const handleOpenForm = (testimonial: Testimonial | null = null) => {
    setDialogState({ ...dialogState, formOpen: true, selectedTestimonial: testimonial })
  }
  const handleOpenDelete = (testimonial: Testimonial) => {
    setDialogState({ ...dialogState, deleteOpen: true, selectedTestimonial: testimonial })
  }
  const closeAllDialogs = () => {
    setDialogState({ formOpen: false, deleteOpen: false, selectedTestimonial: null })
  }

  // --- Statistics ---
  const stats = useMemo(() => ({
    total: testimonials.length,
    linkedToProduct: testimonials.filter(t => t.product).length,
  }), [testimonials])

  const kpiCards = [
    { title: "إجمالي الشهادات", value: stats.total, icon: MessageSquare },
    { title: "المرتبطة بمنتجات", value: stats.linkedToProduct, icon: LinkIcon },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="شهادات العملاء">
        <Button onClick={() => handleOpenForm()} variant="primary-inverted">
          <Plus className="w-4 h-4 ml-2" />
          إضافة شهادة جديدة
        </Button>
      </Toolbar>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>)
        ) : testimonials.length === 0 ? (
          <div className="col-span-full">
             <Card className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">لا توجد شهادات</h3>
                <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة شهادة جديدة لعرضها هنا.</p>
            </Card>
          </div>
        ) : (
          testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onEdit={handleOpenForm}
              onDelete={handleOpenDelete}
            />
          ))
        )}
      </div>

      {/* Dialogs */}
      <TestimonialFormDialog
        isOpen={dialogState.formOpen}
        onClose={closeAllDialogs}
        testimonial={dialogState.selectedTestimonial}
      />
      <DeleteTestimonialDialog
        isOpen={dialogState.deleteOpen}
        onClose={closeAllDialogs}
        testimonial={dialogState.selectedTestimonial}
      />
    </div>
  )
}