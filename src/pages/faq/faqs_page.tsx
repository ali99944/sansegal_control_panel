"use client"

import { useState, useMemo } from "react"
import { Plus, HelpCircle, List, Layers, X } from "lucide-react"
import { useFaqs, useFaqCategories } from "../../hooks/use-faqs"
import type { Faq } from "../../types/faq"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Select } from "../../components/ui/select"
import { CreateCategoryDialog } from "./create_category_dialog"
import { DeleteFaqDialog } from "./delete_faq_dialog"
import { FaqFormDialog } from "./faq_form_dialog"
import { FaqItem } from "./faq_item"

export default function FaqsPage() {
  // Data Fetching
  const { data: faqs = [], isLoading: faqsLoading } = useFaqs()
  const { data: categories = [], isLoading: categoriesLoading } = useFaqCategories()

  // State Management
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")
  const [dialogState, setDialogState] = useState<{
    formOpen: boolean;
    deleteOpen: boolean;
    categoryOpen: boolean;
    selectedFaq: Faq | null;
  }>({ formOpen: false, deleteOpen: false, categoryOpen: false, selectedFaq: null })

  // --- Event Handlers ---
  const handleOpenForm = (faq: Faq | null = null) => setDialogState(prev => ({ ...prev, formOpen: true, selectedFaq: faq }))
  const handleOpenDelete = (faq: Faq) => setDialogState(prev => ({ ...prev, deleteOpen: true, selectedFaq: faq }))
  const closeAllDialogs = () => setDialogState({ formOpen: false, deleteOpen: false, categoryOpen: false, selectedFaq: null })

  // --- Memoized Filtering & Grouping ---
  const filteredFaqs = useMemo(() => {
    if (selectedCategoryId === "all") return faqs
    return faqs.filter(faq => String(faq.faq_category_id) === selectedCategoryId)
  }, [faqs, selectedCategoryId])

  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce((acc, faq) => {
      const categoryName = categories.find(c => c.id === faq.faq_category_id)?.name || "غير مصنف"
      if (!acc[categoryName]) acc[categoryName] = []
      acc[categoryName].push(faq)
      return acc
    }, {} as Record<string, Faq[]>)
  }, [filteredFaqs, categories])

  // --- Statistics ---
  const stats = {
    totalFaqs: faqs.length,
    totalCategories: categories.length,
  }

  const kpiCards = [
    { title: "إجمالي الأسئلة", value: stats.totalFaqs, icon: HelpCircle },
    { title: "إجمالي الفئات", value: stats.totalCategories, icon: Layers },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة الأسئلة الشائعة">
        <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setDialogState(p => ({ ...p, categoryOpen: true }))}>
                <List className="w-4 h-4 ml-2" /> إضافة فئة
            </Button>
            <Button variant="primary-inverted" onClick={() => handleOpenForm()}>
                <Plus className="w-4 h-4 ml-2" /> إضافة سؤال جديد
            </Button>
        </div>
      </Toolbar>

      {/* Statistics & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><card.icon className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{faqsLoading || categoriesLoading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
         <Card className="flex items-center p-4">
             <div className="w-full">

                <div className="flex gap-2">
                    <Select
                        className="flex-grow"
                        options={[{ label: 'كل الفئات', value: 'all' }, ...categories.map(c => ({ label: c.name, value: String(c.id) }))]}
                        value={selectedCategoryId}
                        onChange={value => setSelectedCategoryId(Array.isArray(value) ? value[0] : value)}
                        disabled={categoriesLoading}
                    />
                    {selectedCategoryId !== 'all' && (
                        <Button variant="secondary" onClick={() => setSelectedCategoryId('all')}><X className="w-4 h-4"/></Button>
                    )}
                </div>
             </div>
        </Card>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqsLoading ? (
            <p>جاري تحميل الأسئلة...</p>
        ) : Object.keys(groupedFaqs).length === 0 ? (
            <Card className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">لا توجد أسئلة</h3>
                <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة سؤال جديد لعرضه هنا.</p>
            </Card>
        ) : (
            Object.entries(groupedFaqs).map(([categoryName, faqsInCategory]) => (
                <div key={categoryName}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 px-2">{categoryName}</h3>
                    <div className="space-y-2">
                        {faqsInCategory.map(faq => (
                            <FaqItem key={faq.id} faq={faq} onEdit={handleOpenForm} onDelete={handleOpenDelete} />
                        ))}
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Dialogs */}
      <FaqFormDialog isOpen={dialogState.formOpen} onClose={closeAllDialogs} faq={dialogState.selectedFaq} />
      <DeleteFaqDialog isOpen={dialogState.deleteOpen} onClose={closeAllDialogs} faq={dialogState.selectedFaq} />
      <CreateCategoryDialog isOpen={dialogState.categoryOpen} onClose={() => setDialogState(p => ({ ...p, categoryOpen: false }))} />
    </div>
  )
}