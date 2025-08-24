import { z } from "zod"

export interface Policy {
  id: number
  title: string
  slug: string
  content: string // This will be Markdown
  is_published: boolean
  updated_at: string
}

export const policyFormSchema = z.object({
  title: z.string().min(3, "عنوان السياسة مطلوب."),
  content: z.string().min(20, "محتوى السياسة مطلوب."),
  is_published: z.boolean(),
})

export type PolicyFormData = z.infer<typeof policyFormSchema>