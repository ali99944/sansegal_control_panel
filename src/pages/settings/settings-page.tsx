"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Settings as SettingsIcon, AtSign, Share2, Save, Loader2, Store } from "lucide-react"
import { useSettings, useUpdateSettings } from "../../hooks/use-settings"
import { settingsFormSchema, type SettingsFormData } from "../../types/settings"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import LabeledSwitch from "../../components/ui/labeled-switch"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { data: settings, isLoading: isFetching } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
  })

  useEffect(() => {
    if (settings) {
      console.log(settings);
      
      reset(settings)
    }
  }, [settings, reset])

  useEffect(() => {
    console.log(errors);
    
  }, [errors])

  const handleFormSubmit = (data: SettingsFormData) => {    
    updateSettings(data)
  }
  
  const tabs = [
    { id: "general", name: "الإعدادات العامة", icon: SettingsIcon },
    { id: "contact", name: "بيانات التواصل", icon: AtSign },
    { id: "social", name: "الروابط الاجتماعية", icon: Share2 },
    { id: "store", name: "اعدادات المتجر", icon: Store },
  ]
  
  if (isFetching) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إعدادات النظام">
        <Button onClick={handleSubmit(handleFormSubmit)} loading={isPending}>
          <Save className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </Toolbar>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="flex lg:flex-col gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full text-right p-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5 ml-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card className="space-y-6">
              {/* --- General Settings Tab --- */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-3">الإعدادات العامة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="general.app_name">اسم الموقع *</Label>
                      <Input id="general.app_name" {...register("general.app_name")} />
                      {errors.general?.app_name && <p className="text-sm text-red-600 mt-1">{errors.general.app_name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="general.app_url">رابط الموقع *</Label>
                      <Input id="general.app_url" {...register("general.app_url")} />
                      {errors.general?.app_url && <p className="text-sm text-red-600 mt-1">{errors.general.app_url.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="general.logo_url">رابط اللوجو</Label>
                      <Input id="general.logo_url" {...register("general.logo_url")} />
                    </div>
                     <div>
                      <Label htmlFor="general.favicon_url">رابط أيقونة الموقع (Favicon)</Label>
                      <Input id="general.favicon_url" {...register("general.favicon_url")} />
                    </div>
                     <div>
                      <Label htmlFor="general.support_email">بريد الدعم الفني *</Label>
                      <Input id="general.support_email" {...register("general.support_email")} />
                      {errors.general?.support_email && <p className="text-sm text-red-600 mt-1">{errors.general.support_email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="general.copyright_text">نص حقوق النشر</Label>
                      <Input id="general.copyright_text" {...register("general.copyright_text")} placeholder="© {year} San Segal." />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="general.maintenance_message">رسالة الصيانة</Label>
                    <Textarea id="general.maintenance_message" {...register("general.maintenance_message")} rows={3} />
                  </div>
                  <Controller
                    control={control}
                    name="general.maintenance_mode"
                    render={({ field }) => (
                        <LabeledSwitch
                            title="وضع الصيانة"
                            description="تعطيل الموقع مؤقتًا للزوار وعرض رسالة الصيانة."
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    )}
                  />
                </div>
              )}

              {/* --- Contact Settings Tab --- */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-3">بيانات التواصل</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="contact.public_email">البريد الإلكتروني العام *</Label>
                        <Input id="contact.public_email" {...register("contact.public_email")} />
                        {errors.contact?.public_email && <p className="text-sm text-red-600 mt-1">{errors.contact.public_email.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="contact.phone_number">رقم الهاتف</Label>
                        <Input id="contact.phone_number" {...register("contact.phone_number")} />
                    </div>
                     <div>
                        <Label htmlFor="contact.whatsapp_number">رقم واتساب</Label>
                        <Input id="contact.whatsapp_number" {...register("contact.whatsapp_number")} />
                    </div>
                     <div>
                        <Label htmlFor="contact.working_hours">ساعات العمل</Label>
                        <Input id="contact.working_hours" {...register("contact.working_hours")} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact.address_line_1">العنوان</Label>
                    <Input id="contact.address_line_1" {...register("contact.address_line_1")} />
                  </div>
                   <div>
                    <Label htmlFor="contact.google_maps_url">رابط خرائط جوجل</Label>
                    <Input id="contact.google_maps_url" {...register("contact.google_maps_url")} />
                    {errors.contact?.google_maps_url && <p className="text-sm text-red-600 mt-1">{errors.contact.google_maps_url.message}</p>}
                  </div>
                </div>
              )}

              {/* --- Social Media Settings Tab --- */}
              {activeTab === 'social' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-3">الروابط الاجتماعية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="social.facebook_url">رابط فيسبوك</Label>
                      <Input id="social.facebook_url" {...register("social.facebook_url")} />
                      {errors.social?.facebook_url && <p className="text-sm text-red-600 mt-1">{errors.social.facebook_url.message}</p>}
                    </div>
                     <div>
                      <Label htmlFor="social.instagram_url">رابط انستغرام</Label>
                      <Input id="social.instagram_url" {...register("social.instagram_url")} />
                      {errors.social?.instagram_url && <p className="text-sm text-red-600 mt-1">{errors.social.instagram_url.message}</p>}
                    </div>
                     <div>
                      <Label htmlFor="social.twitter_url">رابط تويتر</Label>
                      <Input id="social.twitter_url" {...register("social.twitter_url")} />
                      {errors.social?.twitter_url && <p className="text-sm text-red-600 mt-1">{errors.social.twitter_url.message}</p>}
                    </div>
                     <div>
                      <Label htmlFor="social.pinterest_url">رابط بينترست</Label>
                      <Input id="social.pinterest_url" {...register("social.pinterest_url")} />
                      {errors.social?.pinterest_url && <p className="text-sm text-red-600 mt-1">{errors.social.pinterest_url.message}</p>}
                    </div>
                     <div>
                      <Label htmlFor="social.tiktok_url">رابط تيك توك</Label>
                      <Input id="social.tiktok_url" {...register("social.tiktok_url")} />
                      {errors.social?.tiktok_url && <p className="text-sm text-red-600 mt-1">{errors.social.tiktok_url.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'store' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-3">اعدادات المتجر</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="store.enable_promo_codes"
                    render={({ field }) => (
                        <LabeledSwitch
                            title="تفعيل الكوبونات"
                            // description="تعطيل الموقع مؤقتًا للزوار وعرض رسالة الصيانة."
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    )}
                  />
                  </div>
                </div>
              )}
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}