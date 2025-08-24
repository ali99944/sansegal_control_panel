"use client"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Editor } from '@tinymce/tinymce-react' // The new TinyMCE editor
import { policyFormSchema, type PolicyFormData } from "../../types/policy"
import { usePolicy, useUpdatePolicy } from "../../hooks/use-policies"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Card from "../../components/ui/card"
import LabeledSwitch from "../../components/ui/labeled-switch"
import { Save, Loader2 } from "lucide-react"

export default function UpdatePolicyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const policyId = Number(id)

  const { data: policy, isLoading: isFetching } = usePolicy(policyId)
  const { mutate: updatePolicy, isPending } = useUpdatePolicy(policyId)

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<PolicyFormData>({
    resolver: zodResolver(policyFormSchema)
  })

  useEffect(() => {
    if (policy) {
      reset({ title: policy.title, content: policy.content, is_published: policy.is_published })
    }
  }, [policy, reset])

  if (isFetching) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title={`تحرير: ${policy?.title}`}>
        <Button variant="primary-inverted" onClick={() => navigate("/policies")}>
          العودة للسياسات
        </Button>
      </Toolbar>

      <form onSubmit={handleSubmit(data => updatePolicy(data))}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 border-b pb-3">المحتوى الأساسي</h3>
              <div className="pt-4 space-y-4">
                <div>
                    <Label htmlFor="title">عنوان الصفحة *</Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label>المحتوى *</Label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                        <Editor
                            apiKey='5zw3ok7a382r6ge5omb9ep6uyr5ue2khuh6palx5ma9o856z' // IMPORTANT: Add your API key here
                            value={field.value}
                            onEditorChange={field.onChange}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link | code | help',
                                directionality: 'rtl',
                                language: 'ar',
                                skin: 'oxide',
                                content_css: 'default'
                            }}
                        />
                        )}
                    />
                    {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Metadata & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 border-b pb-3">الإعدادات</h3>
              <div className="pt-4 space-y-4">
                <div>
                  <Label>المعرّف (Slug)</Label>
                  <Input value={policy?.slug} disabled />
                  <p className="text-xs text-gray-500 mt-1">هذا المعرّف يستخدم في الرابط ولا يمكن تغييره.</p>
                </div>
                <div>
                  <Controller
                    control={control}
                    name="is_published"
                    render={({ field }) => (
                        <LabeledSwitch
                            title="حالة النشر"
                            description="إظهار هذه الصفحة للزوار."
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    )}
                  />
                </div>
              </div>
            </Card>

            <Button type="submit" loading={isPending} size="sm" className="w-full">
              <Save className="w-4 h-4 ml-2" /> حفظ التغييرات
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}