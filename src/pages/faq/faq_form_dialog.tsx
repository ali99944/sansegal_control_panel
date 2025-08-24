"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Faq, FaqFormData, faqFormSchema } from "../../types/faq"
import { useCreateFaq, useFaqCategories, useUpdateFaq } from "../../hooks/use-faqs"
import Dialog from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select } from "../../components/ui/select"
import Button from "../../components/ui/button"

interface FaqFormDialogProps {
  faq?: Faq | null
  isOpen: boolean
  onClose: () => void
}

export function FaqFormDialog({ faq, isOpen, onClose }: FaqFormDialogProps) {
  const isUpdateMode = !!faq
  const { data: categories = [], isLoading: categoriesLoading } = useFaqCategories()
  const { mutate: createFaq, isPending: isCreating } = useCreateFaq()
  const { mutate: updateFaq, isPending: isUpdating } = useUpdateFaq(faq?.id || 0)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormData>({
    resolver: zodResolver(faqFormSchema),
  })

  useEffect(() => {
    if (faq) {
      reset({ question: faq.question, answer: faq.answer, faq_category_id: String(faq.faq_category_id) });
    } else {
      reset({ question: "", answer: "", faq_category_id: "" });
    }
  }, [faq, isOpen, reset])

  const isLoading = isCreating || isUpdating

  const handleFormSubmit = (data: FaqFormData) => {
    const action = isUpdateMode ? updateFaq : createFaq
    action(data, { onSuccess: onClose })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={isUpdateMode ? "تعديل السؤال" : "إضافة سؤال جديد"}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="question">السؤال *</Label>
          <Input id="question" {...register("question")} />
          {errors.question && <p className="text-sm text-red-600 mt-1">{errors.question.message}</p>}
        </div>
        <div>
          <Label htmlFor="answer">الإجابة *</Label>
          <Textarea id="answer" {...register("answer")} rows={6} />
          {errors.answer && <p className="text-sm text-red-600 mt-1">{errors.answer.message}</p>}
        </div>
        <div>
          <Label htmlFor="faq_category_id">الفئة *</Label>
          <Controller
            control={control}
            name="faq_category_id"
            render={({ field }) => (
              <Select
                options={categories.map(c => ({ label: c.name, value: String(c.id) }))}
                value={field.value}
                onChange={value => field.onChange(String(value))}
                placeholder={categoriesLoading ? "جاري التحميل..." : "اختر فئة"}
              />
            )}
          />
          {errors.faq_category_id && <p className="text-sm text-red-600 mt-1">{errors.faq_category_id.message}</p>}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" loading={isLoading}>{isUpdateMode ? "حفظ التعديلات" : "إنشاء السؤال"}</Button>
        </div>
      </form>
    </Dialog>
  )
}