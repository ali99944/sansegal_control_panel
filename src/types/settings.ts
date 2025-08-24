import { z } from "zod"

export interface GeneralSettings {
  app_name: string
  app_url: string
  logo_url?: string
  favicon_url?: string
  support_email: string
  maintenance_mode: boolean
  maintenance_message?: string
  copyright_text?: string
}

export interface ContactSettings {
  public_email: string
  phone_number?: string
  whatsapp_number?: string
  address_line_1?: string
  google_maps_url?: string
  working_hours?: string
}

export interface SocialSettings {
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  pinterest_url?: string
  tiktok_url?: string
}

export interface AppSettings {
  general: GeneralSettings
  contact: ContactSettings
  social: SocialSettings
}

export const settingsFormSchema = z.object({
  contact: z.object({
    public_email: z.string().email("البريد الإلكتروني العام غير صحيح."),
    phone_number: z.string().optional(),
    whatsapp_number: z.string().optional(),
    address_line_1: z.string().optional(),
    google_maps_url: z.string().url("رابط خرائط جوجل غير صحيح.").optional().or(z.literal('')),
    working_hours: z.string().optional(),
  }),
  general: z.object({
    app_name: z.string().min(1, "اسم التطبيق مطلوب."),
    app_url: z.string().url("رابط التطبيق غير صحيح."),
    logo_url: z.string().optional(),
    favicon_url: z.string().optional(),
    support_email: z.string().email("بريد الدعم غير صحيح."),
    maintenance_mode: z.boolean(),
    maintenance_message: z.string().optional(),
    copyright_text: z.string().optional(),
  }),
  social: z.object({
    facebook_url: z.string().url("رابط فيسبوك غير صحيح.").optional().or(z.literal('')),
    instagram_url: z.string().url("رابط انستغرام غير صحيح.").optional().or(z.literal('')),
    twitter_url: z.string().url("رابط تويتر غير صحيح.").optional().or(z.literal('')),
    pinterest_url: z.string().url("رابط بينترست غير صحيح.").optional().or(z.literal('')),
    tiktok_url: z.string().url("رابط تيك توك غير صحيح.").optional().or(z.literal('')),
  }),

  store: z.object({
    enable_promo_codes: z.boolean()
  })
})

export type SettingsFormData = z.infer<typeof settingsFormSchema>