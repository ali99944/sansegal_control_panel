
import { Edit, Trash2, MessageSquare, User, MapPin, Link as LinkIcon } from "lucide-react"
import { Testimonial } from "../../types/testimonial"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Avatar from "../../components/ui/avatar"

interface TestimonialCardProps {
  testimonial: Testimonial
  onEdit: (testimonial: Testimonial) => void
  onDelete: (testimonial: Testimonial) => void
}

export function TestimonialCard({ testimonial, onEdit, onDelete }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 flex-grow">
        <MessageSquare className="w-8 h-8 text-primary/30 mb-3" />
        <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>
      </div>
      <div className="p-4 border-t bg-gray-50/50 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar fallback={testimonial.name} size="sm" />
          <div>
            <p className="font-semibold text-sm text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              {testimonial.name}
            </p>
            {testimonial.location && (
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {testimonial.location}
              </p>
            )}
          </div>
        </div>
        {testimonial.product.name && (
          <div className="text-xs text-gray-600 flex items-start gap-2 pt-2 border-t">
            <LinkIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            {testimonial.product ? (
              <a href={`/products/${testimonial.product.id}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                شهادة على منتج: <span className="font-semibold">{testimonial.product.name.ar}</span>
              </a>
            ) : (
              <span>شهادة على منتج: {'testimonial.product?.product_name'} (محذوف)</span>
            )}
          </div>
        )}
      </div>
      <div className="p-2 border-t flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(testimonial)}>
          <Edit className="w-4 h-4 ml-1" /> تعديل
        </Button>
        <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete(testimonial)}>
          <Trash2 className="w-4 h-4 ml-1" /> حذف
        </Button>
      </div>
    </Card>
  )
}