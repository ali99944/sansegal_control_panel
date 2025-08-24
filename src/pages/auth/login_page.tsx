"use client"

import React, { useState } from "react"
import { Lock, User, Eye, EyeOff, LogInIcon } from "lucide-react"

// Your custom components
import Card from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import Button from "../../components/ui/button"
import { Label } from "../../components/ui/label"

import { useLogin } from "../../hooks/use-auth"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const { mutateAsync: login, isPending: is_login_process } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.email && formData.password) {
      login(formData)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="flex w-full max-w-5xl overflow-hidden">
        {/* Left Column - Login Form */}
        <div className="w-full md:w-1/2 p-4">
          <div className="text-center">
            <h2 className="mt-4 text-3xl font-bold text-gray-900">لوحة تحكم sansegal</h2>
            <p className="mt-2 text-sm text-gray-600">سجل الدخول للمتابعة إلى حسابك الإداري</p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">اسم المستخدم</Label>
                <Input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="أدخل اسم المستخدم"
                  contentBefore={<User className="w-4 h-4 text-gray-400" />}
                  required
                  disabled={is_login_process}
                />
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="أدخل كلمة المرور"
                    contentBefore={<Lock className="w-4 h-4 text-gray-400" />}
                    required
                    disabled={is_login_process}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                    disabled={is_login_process}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                loading={is_login_process}
                disabled={is_login_process}
                icon={LogInIcon}
              >
                تسجيل الدخول
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block w-1/2 bg-gray-100">
          <img
            src="/logo.jpg"
            alt="Login Illustration"
            className="w-full h-96 object-cover"
          />
        </div>
      </Card>
    </div>
  )
}