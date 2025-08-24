"use client"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { seoFormSchema, type SeoFormData } from "../../types/seo"
import { useSeo, useUpdateSeo } from "../../hooks/use-seo"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import Card from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import ImagePicker from "../../components/ui/image-picker"
import { Save, Loader2 } from "lucide-react"
export default function UpdateSeoPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const seoId = Number(id)
    const { data: seo, isLoading: isFetching } = useSeo(seoId)
    const { mutate: updateSeo, isPending } = useUpdateSeo(seoId)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<SeoFormData>({
        resolver: zodResolver(seoFormSchema),
    })
    useEffect(() => {
        if (seo) {
            reset({
                title: seo.title,
                description: seo.description,
                keywords: seo.keywords || "",
                canonicalUrl: seo.canonicalUrl || "",
                ogTitle: seo.ogTitle || "",
                ogDescription: seo.ogDescription || "",
                ogType: seo.ogType || "website",
                // Image is handled separately via display
                structuredData: seo.structuredData ? JSON.stringify(seo.structuredData, null, 2) : "",
            })
        }
    }, [seo, reset])
    const handleFormSubmit = (data: SeoFormData) => {
        const formData = new FormData()
        formData.append('_method', 'PUT') // Method spoofing for Laravel
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'ogImage') {
                if (value && value[0]) formData.append(key, value[0]);
            } else if (value) {
                formData.append(key, String(value));
            }
        });
        updateSeo(formData)
    }
    if (isFetching) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }
    return (
        <div className="space-y-6" dir="rtl">
            <Toolbar title={''}>
                <div className="flex items-center gap-2">
                    <Button type="submit" variant="secondary" loading={isPending} size="sm">
                        <Save className="w-4 h-4 ml-2" /> حفظ التغييرات
                    </Button>
                    <Button variant="primary-inverted" onClick={() => navigate("/seo")}>
                        العودة
                    </Button>
                </div>
            </Toolbar>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-3">البيانات الأساسية لمحركات البحث</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="md:col-span-2">
                            <Label htmlFor="key">المفتاح (غير قابل للتعديل)</Label>
                            <Input id="key" value={seo?.key} disabled />
                        </div>
                        <div>
                            <Label htmlFor="title">العنوان (Title Tag) *</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="keywords">الكلمات المفتاحية</Label>
                            <Input id="keywords" {...register("keywords")} placeholder="كلمة, أخرى, فاصلة" />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="description">الوصف (Meta Description) *</Label>
                            <Textarea id="description" {...register("description")} rows={4} />
                            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="canonicalUrl">الرابط الأساسي (Canonical URL)</Label>
                            <Input id="canonicalUrl" {...register("canonicalUrl")} placeholder="https://sansegal.com/..." />
                            {errors.canonicalUrl && <p className="text-sm text-red-600 mt-1">{errors.canonicalUrl.message}</p>}
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-3">بيانات المشاركة (Open Graph)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="ogTitle">عنوان المشاركة</Label>
                                <Input id="ogTitle" {...register("ogTitle")} placeholder="سيستخدم العنوان الأساسي إن ترك فارغًا" />
                            </div>
                            <div>
                                <Label htmlFor="ogDescription">وصف المشاركة</Label>
                                <Textarea id="ogDescription" {...register("ogDescription")} rows={3} placeholder="سيستخدم الوصف الأساسي إن ترك فارغًا" />
                            </div>
                        </div>
                        <div>
                            <Label>صورة المشاركة (OG Image)</Label>
                            {seo?.ogImage && <img src={seo.ogImage} alt="OG Preview" className="w-48 h-auto rounded-lg mb-2 border" />}
                            <Controller control={control} name="ogImage" render={({ field }) => (
                                <ImagePicker onUrlChange={(urls) => field.onChange(urls)} multiple={false} />
                            )} />
                        </div>
                    </div>
                </Card>

                {/* <Card>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-3">البيانات المنظمة (JSON-LD)</h3>
                    <Textarea {...register("structuredData")} rows={8} placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "url": "https://sansegal.com/",\n  "name": "San Segal"\n}`} />
                    {errors.structuredData && <p className="text-sm text-red-600 mt-1">{errors.structuredData.message}</p>}
                </Card> */}
            </form>
            <div />

        </div>
    )
}