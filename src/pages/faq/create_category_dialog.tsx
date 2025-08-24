"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CategoryFormData, categoryFormSchema } from "../../types/faq"
import { useCreateFaqCategory } from "../../hooks/use-faqs"
import Dialog from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"


interface CreateCategoryDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateCategoryDialog({ isOpen, onClose }: CreateCategoryDialogProps) {
  const { mutate: createCategory, isPending } = useCreateFaqCategory()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  })

  const handleFormSubmit = (data: CategoryFormData) => {
    createCategory(data, { onSuccess: () => { reset(); onClose(); } })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة فئة جديدة">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">اسم الفئة *</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" loading={isPending}>إنشاء الفئة</Button>
        </div>
      </form>
    </Dialog>
  )
}