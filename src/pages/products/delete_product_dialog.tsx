"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useDeleteProduct } from "../../hooks/use-products"
import DangerDialog from "../../components/ui/danger-dialog"
import { Product } from "../../types/product"
import Button from "../../components/ui/button"


interface DeleteProductDialogProps {
  product: Product
  onSuccess?: () => void
}

export function DeleteProductDialog({ product, onSuccess }: DeleteProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: deleteProduct, isPending } = useDeleteProduct(product?.id)

  const handleDelete = () => {
    deleteProduct({ id: product.id }, {
      onSuccess: () => {
        setIsOpen(false)
        onSuccess?.()
      }
    })
  }

  return (
    <>
      <Button className="!p-2" variant="danger" size="sm" onClick={() => setIsOpen(true)}>
        <Trash2 className="w-4 h-4" />
      </Button>
      <DangerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="حذف المنتج"
        message={`هل أنت متأكد من حذف المنتج "${product.name.ar}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="نعم, حذف"
        loading={isPending}
      />
    </>
  )
}