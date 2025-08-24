"use client"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { useSeos } from "../../hooks/use-seo"
import Toolbar from "../../components/ui/toolbar"
import Card from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function SeoPage() {
  const { data: seos = [], isLoading } = useSeos()
  const navigate = useNavigate()

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة SEO للصفحات" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-48 !bg-white/60">
                <div className="animate-pulse bg-gray-200 h-full"></div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seos.map(seo => (
            <Card
              key={seo.id}
              variant="interactive"
              onClick={() => navigate(`/seo/${seo.id}/update`)}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">{seo.title}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{seo.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center gap-2">
                <Badge variant="secondary">المفتاح: {seo.key}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}