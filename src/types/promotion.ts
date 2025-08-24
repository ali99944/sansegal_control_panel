import { z } from "zod"

// The main data structure for a promotion
export interface Promotion {
  id: number
  text: string
  bgColor: string
  textColor: string
  isActive: boolean
}

// Zod schema for the create/update form
export const promotionFormSchema = z.object({
  text: z.string().min(10, "نص العرض الترويجي مطلوب."),
  bgColor: z.string().min(3, "لون الخلفية مطلوب (مثال: bg-blue-600).").regex(/^bg-/, "يجب أن يبدأ اللون بـ 'bg-'"),
  textColor: z.string().min(3, "لون النص مطلوب (مثال: text-white).").regex(/^text-/, "يجب أن يبدأ اللون بـ 'text-'"),
  isActive: z.boolean().default(true),
})

// Type inferred from the Zod schema
export type PromotionFormData = z.infer<typeof promotionFormSchema>