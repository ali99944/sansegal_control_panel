"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateModel } from "../../hooks/use-models"
import ImagePicker from "../../components/ui/image-picker"
import { ModelFormData, modelFormSchema } from "../../types/model"
import Dialog from "../../components/ui/dialog"
import Button from "../../components/ui/button"
import { useState } from "react"

interface CreateModelDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateModelDialog({ isOpen, onClose }: CreateModelDialogProps) {
  const { mutate: createModel, isPending } = useCreateModel()
  const { handleSubmit, formState: { errors } } = useForm<ModelFormData>({
    resolver: zodResolver(modelFormSchema),
  })

  const [image, setImage] = useState<File | null>(null)

  const handleFormSubmit = (data: ModelFormData) => {
    console.log(data);
    
    const formData = new FormData()
    if (image) {
        console.log(image);
        
      formData.append('image', image)
    }
    createModel(formData, { onSuccess: onClose })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="إضافة صورة موديل جديدة">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <ImagePicker onChange={(file) => setImage(file as File)} multiple={false} />
        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message as string}</p>}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" loading={isPending}>حفظ الصورة</Button>
        </div>
      </form>
    </Dialog>
  )
}