"use client"
import { useEffect } from "react"
import { useForm, Controller, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "../../components/ui/label"
import LabeledSwitch from "../../components/ui/labeled-switch"
import { useCreatePromoCode, useUpdatePromoCode } from "../../hooks/use-promo-code"
import { PromoCode, PromoCodeFormData, promoCodeFormSchema } from "../../types/promo-code"
import Dialog from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Select } from "../../components/ui/select"
import Button from "../../components/ui/button"

interface PromoCodeFormDialogProps {
    promoCode?: PromoCode | null
    isOpen: boolean
    onClose: () => void
}
export function PromoCodeFormDialog({ promoCode, isOpen, onClose }: PromoCodeFormDialogProps) {
    const isUpdateMode = !!promoCode
    const { mutate: create, isPending: isCreating } = useCreatePromoCode()
    const { mutate: update, isPending: isUpdating } = useUpdatePromoCode(promoCode?.id || 0)
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<PromoCodeFormData>({
        resolver: zodResolver(promoCodeFormSchema) as Resolver<PromoCodeFormData>,
    })
    useEffect(() => {
        if (promoCode) {
            reset({ ...promoCode, expires_at: promoCode.expires_at ? promoCode.expires_at.split('T')[0] : "" })
        } else {
            reset({ code: "", type: "percentage", value: 0, is_active: true, expires_at: "", max_uses: undefined })
        }
    }, [promoCode, isOpen, reset])
    const isLoading = isCreating || isUpdating
    const handleFormSubmit = (data: PromoCodeFormData) => {
        const action = isUpdateMode ? update : create
        action(data, { onSuccess: onClose })
    }
    return (
        <Dialog isOpen={isOpen} onClose={onClose} title={isUpdateMode ? "تعديل كود الخصم" : "إنشاء كود خصم جديد"}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="code">كود الخصم *</Label>
                        <Input id="code" {...register("code")} />
                        {errors.code && <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="type">نوع الخصم *</Label>
                        <Controller control={control} name="type" render={({ field }) => (
                            <Select options={[{ label: "نسبة مئوية (%)", value: "percentage" }, { label: "مبلغ ثابت", value: "fixed" }]} {...field} />
                        )} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="value">القيمة *</Label>
                    <Input id="value" type="number" step="0.01" {...register("value")} />
                    {errors.value && <p className="text-sm text-red-600 mt-1">{errors.value.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="max_uses">أقصى عدد للاستخدام (اختياري)</Label>
                        <Input id="max_uses" type="number" {...register("max_uses")} placeholder="اتركه فارغًا للاستخدام غير المحدود" />
                    </div>
                    <div>
                        <Label htmlFor="expires_at">تاريخ الانتهاء (اختياري)</Label>
                        <Input id="expires_at" type="date" {...register("expires_at")} />
                    </div>
                </div>
                <Controller control={control} name="is_active" render={({ field }) => (
                    <LabeledSwitch checked={field.value} title="تفعيل الكود" description="يجب أن يكون فعالًا ليتمكن العملاء من استخدامه." {...field} />
                )} />
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
                    <Button type="submit" loading={isLoading}>{isUpdateMode ? "حفظ التعديلات" : "إنشاء الكود"}</Button>
                </div>
            </form>
        </Dialog>
    )
}