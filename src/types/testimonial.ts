import { z } from "zod"
import { Product } from "./product"

// The main data structure for a testimonial
export interface Testimonial {
  id: number
  name: string
  location?: string
  review: string
  product: Product
  created_at: string
}

// Zod schema for the create/update form
export const testimonialFormSchema = z.object({
  name: z.string().min(3, "اسم العميل مطلوب."),
  review: z.string().min(10, "نص الشهادة مطلوب."),
  location: z.string().optional(),
  product_id: z.string().optional(), // The value from the <select> will be a string
})

// Type inferred from the Zod schema
export type TestimonialFormData = z.infer<typeof testimonialFormSchema>