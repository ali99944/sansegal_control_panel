"use client"

import { useState } from "react"
import { Shield, Lock, Mail, RefreshCw, Eye, EyeOff } from "lucide-react"
import Button from "./button"


interface NoPermissionProps {
  title?: string
  description?: string
  action?: string
  requiredRole?: string
  requiredPermissions?: string[]
  showContactInfo?: boolean
  showRetry?: boolean
  onRetry?: () => void
  variant?: "default" | "minimal" | "detailed"
  className?: string
}

export default function NoPermission({
  title = "ليس لديك صلاحية للوصول",
  description = "عذراً، ليس لديك الصلاحية اللازمة لتنفيذ هذا الإجراء. يرجى التواصل مع المدير للحصول على الصلاحيات المطلوبة.",
  requiredRole,
  requiredPermissions = [],
  showContactInfo = true,
  showRetry = false,
  onRetry,
  // variant = "minimal",
  variant = "detailed",
  className = "",
}: NoPermissionProps) {
  const [showDetails, setShowDetails] = useState(true)


  if (variant === "minimal") {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    )
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`} dir="rtl">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-8 text-center border-b border-gray-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Content */}
        <div className="p-6">


          {/* Required Permissions */}
          {variant === "detailed" && (requiredRole || requiredPermissions.length > 0) && (
            <div className="mb-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showDetails ? "إخفاء" : "عرض"} تفاصيل الصلاحيات المطلوبة
              </button>

              {showDetails && (
                <div className="mt-3 bg-primary/10 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-3">الصلاحيات المطلوبة</h4>
                  <div className="space-y-2">
                    {requiredRole && (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary/80">
                          الدور المطلوب: <span className="font-medium">{requiredRole}</span>
                        </span>
                      </div>
                    )}
                    {requiredPermissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary/80">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {showContactInfo && (
                <Button variant="primary" size="sm" onClick={() => {}} icon={Mail} className="flex-1">
                  طلب صلاحية من المدير
                </Button>
              )}
              {showRetry && onRetry && (
                <Button variant="secondary" size="sm" onClick={onRetry} icon={RefreshCw} className="flex-1">
                  إعادة المحاولة
                </Button>
              )}
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.history.back()}
                // icon={ArrowLeft}
                className="flex-1"
              >
                العودة للصفحة السابقة
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => (window.location.href = "/")}
                // icon={Home}
                className="flex-1"
              >
                الذهاب للرئيسية
              </Button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
