"use client"
import { useEffect } from "react"
import { useForm, Controller, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Promotion, PromotionFormData, promotionFormSchema } from "../../types/promotion"
import { useCreatePromotion, useUpdatePromotion } from "../../hooks/use-promotions"
import Dialog from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Input } from "../../components/ui/input"
import LabeledSwitch from "../../components/ui/labeled-switch"
import Button from "../../components/ui/button"


interface PromotionFormDialogProps {
  promotion?: Promotion | null
  isOpen: boolean
  onClose: () => void
}

export function PromotionFormDialog({ promotion, isOpen, onClose }: PromotionFormDialogProps) {
  const isUpdateMode = !!promotion
  const { mutate: create, isPending: isCreating } = useCreatePromotion()
  const { mutate: update, isPending: isUpdating } = useUpdatePromotion(promotion?.id || 0)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionFormSchema) as Resolver<PromotionFormData>,
  })

  useEffect(() => {
    if (promotion) {
      reset({ text: promotion.text, bgColor: promotion.bgColor, textColor: promotion.textColor, isActive: promotion.isActive })
    } else {
      reset({ text: "", bgColor: "bg-primary", textColor: "text-white", isActive: true })
    }
  }, [promotion, isOpen, reset])

  const isLoading = isCreating || isUpdating

  const handleFormSubmit = (data: PromotionFormData) => {
    const action = isUpdateMode ? update : create
    action(data, { onSuccess: onClose })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={isUpdateMode ? "تعديل العرض الترويجي" : "إضافة عرض ترويجي"}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="text">نص العرض *</Label>
          <Textarea id="text" {...register("text")} rows={3} />
          {errors.text && <p className="text-sm text-red-600 mt-1">{errors.text.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bgColor">لون الخلفية *</Label>
            <Input id="bgColor" {...register("bgColor")} placeholder="bg-blue-600" />
            {errors.bgColor && <p className="text-sm text-red-600 mt-1">{errors.bgColor.message}</p>}
          </div>
          <div>
            <Label htmlFor="textColor">لون النص *</Label>
            <Input id="textColor" {...register("textColor")} placeholder="text-white" />
            {errors.textColor && <p className="text-sm text-red-600 mt-1">{errors.textColor.message}</p>}
          </div>
        </div>
        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <LabeledSwitch
              title="تفعيل العرض"
              description="سيظهر العرض في الشريط العلوي للموقع عند تفعيله."
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" loading={isLoading}>{isUpdateMode ? "حفظ التعديلات" : "إضافة العرض"}</Button>
        </div>
      </form>
    </Dialog>
  )
}