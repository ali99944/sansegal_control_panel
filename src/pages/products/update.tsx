"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useProduct, useUpdateProduct } from "../../hooks/use-products"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { ProductForm } from "./product_form"

export default function UpdateProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const productId = Number(id)

  const { data: product, isLoading: isFetching } = useProduct(productId)
  const { mutate: updateProduct, isPending } = useUpdateProduct(productId)

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return <div>لم يتم العثور على المنتج.</div>
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title={`تعديل المنتج: ${product.name.ar}`}>
        <Button variant="primary-inverted" onClick={() => navigate("/products")}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة إلى المنتجات
        </Button>
      </Toolbar>
      <ProductForm product={product} onSubmit={updateProduct} isLoading={isPending} />
      
      {/* Note: A section to manage existing product variants would be added here */}
    </div>
  )
}