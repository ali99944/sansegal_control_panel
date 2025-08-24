"use client"

import { useState, useMemo } from "react"
import { Plus, Megaphone, CheckCircle } from "lucide-react"
import { useDeletePromotion, usePromotions } from "../../hooks/use-promotions"
import type { Promotion } from "../../types/promotion"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import DangerDialog from "../../components/ui/danger-dialog"
import { PromotionFormDialog } from "./promotions_form_dialog"
import { PromotionCard } from "./promotion_card"


export default function PromotionsPage() {
  const { data: promotions = [], isLoading } = usePromotions()
  const { mutate: deletePromotion, isPending: isDeleting } = useDeletePromotion()

  const [dialogState, setDialogState] = useState<{
    formOpen: boolean;
    deleteOpen: boolean;
    selectedPromotion: Promotion | null;
  }>({ formOpen: false, deleteOpen: false, selectedPromotion: null })

  // --- Event Handlers ---
  const handleOpenForm = (promotion: Promotion | null = null) => {
    setDialogState({ ...dialogState, formOpen: true, selectedPromotion: promotion })
  }
  const handleOpenDelete = (promotion: Promotion) => {
    setDialogState({ ...dialogState, deleteOpen: true, selectedPromotion: promotion })
  }
  const closeAllDialogs = () => {
    setDialogState({ formOpen: false, deleteOpen: false, selectedPromotion: null })
  }
  
  const handleDeleteConfirm = () => {
    if (dialogState.selectedPromotion) {
        deletePromotion({ id: dialogState.selectedPromotion.id }, { onSuccess: closeAllDialogs })
    }
  }

  // --- Statistics ---
  const stats = useMemo(() => ({
    total: promotions.length,
    active: promotions.filter(p => p.isActive).length,
  }), [promotions])

  const kpiCards = [
    { title: "إجمالي العروض", value: stats.total, icon: Megaphone },
    { title: "العروض النشطة", value: stats.active, icon: CheckCircle },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة العروض الترويجية">
        <Button onClick={() => handleOpenForm()} variant="primary-inverted">
          <Plus className="w-4 h-4 ml-2" />
          إضافة عرض جديد
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

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>)
        ) : promotions.length === 0 ? (
           <div className="col-span-full">
             <Card className="text-center py-12">
                <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">لا توجد عروض ترويجية</h3>
                <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة عرض جديد لعرضه هنا.</p>
            </Card>
          </div>
        ) : (
          promotions.map(promo => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              onEdit={handleOpenForm}
              onDelete={handleOpenDelete}
            />
          ))
        )}
      </div>

      {/* Dialogs */}
      <PromotionFormDialog
        isOpen={dialogState.formOpen}
        onClose={closeAllDialogs}
        promotion={dialogState.selectedPromotion}
      />
      <DangerDialog
        isOpen={dialogState.deleteOpen}
        onClose={closeAllDialogs}
        onConfirm={handleDeleteConfirm}
        title="حذف العرض الترويجي"
        message={`هل أنت متأكد من حذف العرض: "${dialogState.selectedPromotion?.text}"؟`}
        loading={isDeleting}
      />
    </div>
  )
}