"use client"

import { Edit, Trash2 } from "lucide-react"
import { Promotion } from "../../types/promotion"
import Card from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import Button from "../../components/ui/button"

interface PromotionCardProps {
  promotion: Promotion
  onEdit: (promotion: Promotion) => void
  onDelete: (promotion: Promotion) => void
}

export function PromotionCard({ promotion, onEdit, onDelete }: PromotionCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {/* Visual Preview */}
      <div className={`text-center py-2 px-1`}
        style={{
            backgroundColor: promotion.bgColor,
            color: promotion.textColor
        }}
      >
        <p>{promotion.text}</p>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">الحالة:</span>
                <Badge variant={promotion.isActive ? 'secondary' : 'default'}>
                    {promotion.isActive ? 'نشط' : 'غير نشط'}
                </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">كود الخلفية:</span>
                <code className="text-xs">{promotion.bgColor}</code>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">كود النص:</span>
                <code className="text-xs">{promotion.textColor}</code>
            </div>
        </div>
        
        <div className="flex gap-2 pt-4 mt-4 border-t">
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(promotion)}>
            <Edit className="w-4 h-4 ml-1" /> تعديل
          </Button>
          <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete(promotion)}>
            <Trash2 className="w-4 h-4 ml-1" /> حذف
          </Button>
        </div>
      </div>
    </Card>
  )
}