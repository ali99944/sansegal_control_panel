"use client"
import { useNavigate } from "react-router-dom"
import { Edit, BookOpen } from "lucide-react"
import { usePolicies } from "../../hooks/use-policies"
import Toolbar from "../../components/ui/toolbar"
import Card from "../../components/ui/card"
import Button from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { formatDate } from "../../lib/date"

export default function PoliciesPage() {
  const { data: policies = [], isLoading } = usePolicies()
  const navigate = useNavigate()

  // Helper function to create a clean text preview from HTML/Markdown
  const createPreview = (content: string) => {
    const stripped = content.replace(/<[^>]+>/g, '').replace(/#/g, '')
    return stripped.length > 100 ? `${stripped.substring(0, 100)}...` : stripped
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة السياسات والصفحات" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />)
        ) : (
          policies.map(policy => (
            <Card key={policy.id} className="flex flex-col">
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{policy.title}</h3>
                  </div>
                  <Badge variant={policy.is_published ? 'secondary' : 'default'}>
                    {policy.is_published ? 'منشورة' : 'مسودة'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {createPreview(policy.content)}
                </p>
              </div>
              <hr className="my-2"/>
              <div className="flex justify-between items-center bg-gray-50/50">
                <p className="text-xs text-gray-500">آخر تحديث: {formatDate(policy.updated_at)}</p>
                <Button variant="secondary" className="!px-2" size="sm" onClick={() => navigate(`/policies/${policy.id}/update`)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}