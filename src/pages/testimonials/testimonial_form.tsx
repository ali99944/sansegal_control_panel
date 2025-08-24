"use client"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProductList } from "../../hooks/use-models"
import { useCreateTestimonial, useUpdateTestimonial } from "../../hooks/use-testimonials"
import { Testimonial, TestimonialFormData, testimonialFormSchema } from "../../types/testimonial"
import { Label } from "../../components/ui/label"
import Dialog from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select } from "../../components/ui/select"
import Button from "../../components/ui/button"


interface TestimonialFormDialogProps {
  testimonial?: Testimonial | null
  isOpen: boolean
  onClose: () => void
}

export function TestimonialFormDialog({ testimonial, isOpen, onClose }: TestimonialFormDialogProps) {
  const isUpdateMode = !!testimonial
  const { data: products = [], isLoading: productsLoading } = useProductList()
  const { mutate: create, isPending: isCreating } = useCreateTestimonial()
  const { mutate: update, isPending: isUpdating } = useUpdateTestimonial(testimonial?.id || 0)
  
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
  })

  useEffect(() => {
    if (testimonial) {
      reset({ name: testimonial.name, review: testimonial.review, location: testimonial.location, product_id: String(testimonial.product.id || "") })
    } else {
      reset({ name: "", review: "", location: "", product_id: "" })
    }
  }, [testimonial, isOpen, reset])

  const isLoading = isCreating || isUpdating

  const handleFormSubmit = (data: TestimonialFormData) => {
    const action = isUpdateMode ? update : create
    action(data, { onSuccess: onClose })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={isUpdateMode ? "تعديل شهادة" : "إضافة شهادة جديدة"}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">اسم العميل *</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="location">الموقع (اختياري)</Label>
          <Input id="location" {...register("location")} placeholder="مثال: القاهرة، مصر" />
        </div>
        <div>
          <Label htmlFor="review">نص الشهادة *</Label>
          <Textarea id="review" {...register("review")} rows={5} />
          {errors.review && <p className="text-sm text-red-600 mt-1">{errors.review.message}</p>}
        </div>
        <div>
          <Label htmlFor="product_id">المنتج المرتبط (اختياري)</Label>
          <Controller
            control={control}
            name="product_id"
            render={({ field }) => (
              <Select
                options={products.map(p => ({ label: p.name.en, value: String(p.id) }))}
                value={field.value}
                onChange={value => field.onChange(String(value))}
                placeholder={productsLoading ? "جاري التحميل..." : "اختر منتجًا"}
                clearable
              />
            )}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" loading={isLoading}>{isUpdateMode ? "حفظ التعديلات" : "إضافة الشهادة"}</Button>
        </div>
      </form>
    </Dialog>
  )
}