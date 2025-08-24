"use client"

import { useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, Trash2, ShoppingBag, Clock, Truck, CheckCircle } from "lucide-react"
import { useOrders, useDeleteOrder } from "../../hooks/use-orders"
import type { Order } from "../../types/order"
import Toolbar from "../../components/ui/toolbar"
import DataTable, { Column } from "../../components/datatable"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import DangerDialog from "../../components/ui/danger-dialog"
import { Badge } from "../../components/ui/badge"
import { formatDate } from "../../lib/date"

export default function OrdersPage() {
  const navigate = useNavigate()
  const { data: orders = [], isLoading, refetch } = useOrders()
  
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder()

  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null)

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }), [orders])

  const kpiCards = [
    { title: "إجمالي الطلبات", value: stats.total, icon: ShoppingBag },
    { title: "طلبات قيد الانتظار", value: stats.pending, icon: Clock },
    { title: "طلبات قيد المعالجة", value: stats.processing, icon: Truck },
    { title: "الطلبات المكتملة", value: stats.delivered, icon: CheckCircle },
  ]

  const formatCurrency = (amount: number) => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(amount)

  const columns: Column<Order>[] = [
    { key: "order_code", title: "كود الطلب", render: (val, order: Order) => {
      return (
        <Link to={`/orders/${order.id}`} className="hover:underline underline-offset-2">
          <span className="font-mono text-primary font-semibold">{val}</span>
        </Link>
      )
    } },
    { 
      key: ["customer", 'first_name'], title: "العميل", render(_, order: Order) {
        return (
          <p>{order.customer.first_name} {order.customer.last_name}</p>
        )
      }, 
    },
    { key: ["financials", "grand_total"], title: "الإجمالي", render: (val) => formatCurrency(val) },
    { 
      key: "status", 
      title: "الحالة", 
      render: (status: Order['status']) => {
        const statusMap = {
          pending: { label: "قيد الانتظار", variant: "default" },
          processing: { label: "قيد المعالجة", variant: "secondary" },
          shipped: { label: "تم الشحن", variant: "default" },
          delivered: { label: "مكتمل", variant: "secondary" },
          cancelled: { label: "ملغي", variant: "destructive" },
        }
        const { label, variant } = statusMap[status] || statusMap.pending;
        return <Badge variant={variant as "default" | "secondary" | "destructive"}>{label}</Badge>
      }
    },
    { key: "created_at", title: "تاريخ الطلب", render: (val) => formatDate(val) },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(`/orders/${row.id}`)}><Eye className="w-4 h-4" /></Button>
          <Button variant="danger" size="sm" onClick={() => setDeleteTarget(row)}><Trash2 className="w-4 h-4" /></Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة الطلبات" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><card.icon className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable pageSize={6} columns={columns} data={orders} loading={isLoading} searchable />
      </Card>

      <DangerDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteOrder({ id: deleteTarget.id }, { onSuccess: () => { setDeleteTarget(null); refetch(); } })
        }}
        title="حذف الطلب"
        message={`هل أنت متأكد من حذف الطلب رقم ${deleteTarget?.order_code}؟`}
        loading={isDeleting}
      />
    </div>
  )
}