import { z } from "zod"

export interface Seo {
  id: number
  key: string
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  structuredData?: Record<string, any>
}

export const seoFormSchema = z.object({
  title: z.string().min(3, "العنوان مطلوب."),
  description: z.string().min(10, "الوصف مطلوب."),
  keywords: z.string().optional(),
  canonicalUrl: z.string().url("يجب أن يكون رابطًا صحيحًا.").optional().or(z.literal('')),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.any().optional(),
  ogType: z.string().optional(),
  structuredData: z.string().optional().refine(val => {
      if (!val) return true;
      try {
          JSON.parse(val);
          return true;
      } catch (e) {
          return false;
      }
  }, { message: "البيانات المنظمة يجب أن تكون بصيغة JSON صحيحة." }),
})

export type SeoFormData = z.infer<typeof seoFormSchema>