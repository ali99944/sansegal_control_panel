import { z } from "zod"

export interface Manager {
  id: number
  name: string
  email: string
}

export const loginFormSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح."),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل."),
})

export type LoginFormData = z.infer<typeof loginFormSchema>