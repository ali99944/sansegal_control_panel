"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useOrder, useUpdateOrderStatus } from "../../hooks/use-orders"
import type { OrderStatus } from "../../types/order"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import { Select } from "../../components/ui/select"
import { Loader2, ArrowRight, User, MapPin, Phone, Hash, DollarSign, Package } from "lucide-react"

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const orderId = Number(id)

  const { data: order, isLoading, refetch } = useOrder(orderId)
  console.log(order);
  
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateOrderStatus(orderId)

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }
  if (!order) {
    return <div className="text-center py-12">لم يتم العثور على الطلب.</div>
  }
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(amount)

  const statusOptions = [
      { label: "قيد الانتظار", value: "pending" },
      { label: "قيد المعالجة", value: "processing" },
      { label: "تم الشحن", value: "shipped" },
      { label: "مكتمل", value: "delivered" },
      { label: "ملغي", value: "cancelled" },
  ]
  
  const handleStatusChange = (status: OrderStatus) => {
    updateStatus({ status }, { onSuccess: () => refetch() })
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title={`تفاصيل الطلب: ${order.order_code}`}>
        <Button variant="secondary" onClick={() => navigate("/orders")}>
          <ArrowRight className="w-4 h-4 ml-2" /> العودة إلى الطلبات
        </Button>
      </Toolbar>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 border-b pb-3 flex items-center gap-2"><Package className="w-5 h-5 text-primary"/> المنتجات المطلوبة</h3>
            <div className="space-y-4 pt-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded-md bg-neutral-light" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                  <p className="font-mono font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
             <h3 className="text-lg font-semibold mb-4 border-b pb-3 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary"/> ملخص الدفع</h3>
             <div className="space-y-2 pt-4">
                 {/* This would be expanded with subtotal, tax, shipping etc. if available */}
                 <div className="flex justify-between font-semibold text-lg">
                    <span>الإجمالي النهائي</span>
                    <span>{formatCurrency(order.financials.grand_total)}</span>
                 </div>
             </div>
          </Card>
        </div>

        {/* Right Column: Customer & Order Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4 border-b pb-3">حالة الطلب</h3>
            <div className="pt-4 space-y-2">
                <Select
                    options={statusOptions}
                    value={order.status}
                    onChange={(val) => handleStatusChange(val as OrderStatus)}
                    disabled={isUpdatingStatus}
                />
                <p className="text-xs text-gray-500">تغيير الحالة سيقوم بتحديث الطلب فورًا.</p>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-4 border-b pb-3 flex items-center gap-2"><User className="w-5 h-5 text-primary"/> بيانات العميل</h3>
            <div className="space-y-3 pt-4 text-sm">
                <p className="flex items-center gap-2"><Hash className="w-4 h-4 text-gray-400"/> {order.customer.first_name} {order.customer.last_name}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400"/> {order.customer.phone}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400"/> {order.shipping_address.address}, {order.shipping_address.city}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}