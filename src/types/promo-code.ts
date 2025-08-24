import { z } from "zod"

export interface PromoCode {
  id: number
  code: string
  type: "percentage" | "fixed"
  value: number
  max_uses?: number | null
  uses: number
  expires_at?: string | null
  is_active: boolean
  created_at: string
}

export const promoCodeFormSchema = z.object({
  code: z.string().min(3, "كود الخصم مطلوب."),
  type: z.enum(["percentage", "fixed"], { required_error: "نوع الخصم مطلوب." }),
  value: z.coerce.number().min(0.01, "قيمة الخصم مطلوبة."),
  max_uses: z.coerce.number().optional().nullable(),
  expires_at: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
})

export type PromoCodeFormData = z.infer<typeof promoCodeFormSchema>