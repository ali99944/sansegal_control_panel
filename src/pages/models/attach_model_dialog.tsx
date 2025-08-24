"use client"
import { useState } from "react"
import { AppModel } from "../../types/model"
import { useAttachModel, useProductList } from "../../hooks/use-models"
import { Select, SelectOption } from "../../components/ui/select"
import Dialog from "../../components/ui/dialog"
import Button from "../../components/ui/button"

interface AttachModelDialogProps {
  model: AppModel | null
  isOpen: boolean
  onClose: () => void
}

export function AttachModelDialog({ model, isOpen, onClose }: AttachModelDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const { data: products = [], isLoading: productsLoading } = useProductList()
  
  const productOptions: SelectOption[] = products.map(p => ({ label: p.name.ar, value: String(p.id) }))
  const { mutate: attachModel, isPending } = useAttachModel({
    product_id: selectedProductId,
    model_id: model?.id
  })
  if (!model) return null
  
  const handleAttach = () => {
    if (!selectedProductId) return
    attachModel({}, { onSuccess: onClose })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`ربط الموديل بمنتج`}>
      <div className="space-y-4">
        <p>اختر منتجًا لربط هذه الصورة به.</p>
        <Select
          options={productOptions}
          value={selectedProductId?.toString()}
          onChange={(value) => setSelectedProductId(Array.isArray(+value) ? +value[0] : +value)}
          placeholder={productsLoading ? "جاري تحميل المنتجات..." : "اختر المنتج"}
          disabled={productsLoading || isPending}
        />
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleAttach} loading={isPending} disabled={!selectedProductId}>ربط المنتج</Button>
        </div>
      </div>
    </Dialog>
  )
}