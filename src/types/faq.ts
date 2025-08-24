import { z } from "zod"

// Data structure for an FAQ Category
export interface FaqCategory {
  id: number
  name: string
}

// Data structure for a single FAQ item
export interface Faq {
  id: number
  question: string
  answer: string
  faq_category_id: number
  category?: FaqCategory // Optional for eager loading
}

// Schema for the main FAQ form
export const faqFormSchema = z.object({
  question: z.string().min(5, "السؤال مطلوب ويجب أن يكون أطول من 5 أحرف."),
  answer: z.string().min(10, "الإجابة مطلوبة ويجب أن تكون أطول من 10 أحرف."),
  faq_category_id: z.string().min(1, "يجب اختيار فئة للسؤال."),
})

// Schema for the quick category creation form
export const categoryFormSchema = z.object({
  name: z.string().min(2, "اسم الفئة مطلوب."),
})

// Inferred form data types
export type FaqFormData = z.infer<typeof faqFormSchema>
export type CategoryFormData = z.infer<typeof categoryFormSchema>