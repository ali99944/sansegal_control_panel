"use client"
import { useState, useMemo } from "react"
import { Plus, Percent, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react"
import type { PromoCode } from "../../types/promo-code"
import Toolbar from "../../components/ui/toolbar"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { formatDate } from "../../lib/date"
import { usePromoCodes } from "../../hooks/use-promo-code"
import { PromoCodeFormDialog } from "./promo_code_form_dialog"
import { DeletePromoCodeDialog } from "./delete_promo_code_dialog"
export default function PromoCodesPage() {
    const { data: promoCodes = [], isLoading } = usePromoCodes()
    const [dialogState, setDialogState] = useState<{
      formOpen: boolean;
      deleteOpen: boolean;
      selected: PromoCode | null;
    }>({ formOpen: false, deleteOpen: false, selected: null })
  
    // --- Event Handlers for Dialogs ---
    const handleOpenForm = (promoCode: PromoCode | null = null) => {
      setDialogState({ formOpen: true, deleteOpen: false, selected: promoCode })
    }
    const handleOpenDelete = (promoCode: PromoCode) => {
      setDialogState({ formOpen: false, deleteOpen: true, selected: promoCode })
    }
    const closeAllDialogs = () => {
      setDialogState({ formOpen: false, deleteOpen: false, selected: null })
    }
  
    const stats = useMemo(() => ({
      total: promoCodes.length,
      active: promoCodes.filter(p => p.is_active && (!p.expires_at || new Date(p.expires_at) > new Date())).length,
      expired: promoCodes.filter(p => !p.is_active || (p.expires_at && new Date(p.expires_at) < new Date())).length,
    }), [promoCodes])
  
    const kpiCards = [
      { title: "إجمالي الأكواد", value: stats.total, icon: Percent },
      { title: "الأكواد النشطة", value: stats.active, icon: CheckCircle },
      { title: "الأكواد غير النشطة", value: stats.expired, icon: XCircle },
    ]
    
    const columns: Column<PromoCode>[] = [
      { key: 'code', title: 'الكود', render: (val) => <span className="font-mono font-bold text-primary">{val}</span> },
      { 
        key: 'value', 
        title: 'الخصم', 
        render: (_, row) => (
          <span>{row.value} {row.type === 'percentage' ? '%' : 'ج.م.'}</span>
        )
      },
      { 
        key: 'uses', 
        title: 'الاستخدام',
        render: (_, row) => (
          <span>{row.uses} / {row.max_uses || '∞'}</span>
        )
      },
      { 
        key: 'is_active', 
        title: 'الحالة', 
        render: (_, row) => {
          const isActive = row.is_active && (!row.expires_at || new Date(row.expires_at) > new Date());
          return <Badge variant={isActive ? 'secondary' : 'destructive'}>{isActive ? 'نشط' : 'غير نشط'}</Badge>
        }
      },
      { key: 'expires_at', title: 'تاريخ الانتهاء', render: (val) => val ? formatDate(val) : 'لا يوجد' },
      // --- COMPLETED ACTIONS COLUMN ---
      {
        key: "actions",
        title: "الإجراءات",
        render: (_, row) => (
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => handleOpenForm(row)} className="!px-2">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleOpenDelete(row)} className="!px-2">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ];
  
    return (
      <div className="space-y-6" dir="rtl">
        <Toolbar title="إدارة أكواد الخصم">
          <Button variant="primary-inverted" onClick={() => handleOpenForm()}>
            <Plus className="w-4 h-4 ml-2" />
            إنشاء كود جديد
          </Button>
        </Toolbar>
  
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
          <DataTable columns={columns} data={promoCodes} loading={isLoading} searchable />
        </Card>
  
        <PromoCodeFormDialog 
          isOpen={dialogState.formOpen}
          onClose={closeAllDialogs}
          promoCode={dialogState.selected}
        />
        
        {/* --- RENDER THE DELETE DIALOG --- */}
        <DeletePromoCodeDialog
          isOpen={dialogState.deleteOpen}
          onClose={closeAllDialogs}
          promoCode={dialogState.selected}
        />
      </div>
    )
  }