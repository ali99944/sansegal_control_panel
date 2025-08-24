"use client"

import { DollarSign, ShoppingBag, MessageSquare, Package } from "lucide-react"
import { LineChart } from "@mui/x-charts/LineChart"

// Your UI Components
import Toolbar from "../../components/ui/toolbar"
import Card from "../../components/ui/card"
import DataTable, { Column } from "../../components/datatable"
import { Badge } from "../../components/ui/badge"
import Avatar from "../../components/ui/avatar"

// Your Custom Hooks (these remain the same)
import { useDashboardKpis, useRecentOrders, useTopProducts, useSalesOverTime } from "../../hooks/use-dashboard"
import type { RecentOrder } from "../../types/dashboard"
import { formatDate } from "../../lib/date" // Assuming formatDate is locale-aware

export default function DashboardPage() {
  // Fetch all necessary data using the custom hooks
  const { data: kpis, isLoading: kpisLoading } = useDashboardKpis()
  const { data: recentOrders = [], isLoading: ordersLoading } = useRecentOrders()
  const { data: topProducts = [], isLoading: productsLoading } = useTopProducts()
  const { data: salesData = [], isLoading: salesLoading } = useSalesOverTime("30d")

  // Helper function to format currency in EGP for an Arabic locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", { // Arabic (Egypt) locale
      style: "currency",
      currency: "EGP", // Egyptian Pound
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Define columns for the Recent Orders DataTable in Arabic
  const orderColumns: Column<RecentOrder>[] = [
    {
      key: "order_code",
      title: "كود الطلب",
      render: (value) => <span className="font-mono text-primary font-medium">{value}</span>,
    },
    { key: "customer_name", title: "العميل" },
    {
      key: "grand_total",
      title: "الإجمالي",
      render: (value) => <span className="font-semibold">{formatCurrency(value)}</span>,
    },
    {
      key: "status",
      title: "الحالة",
      render: (status: RecentOrder["status"]) => {
        const statusMap = {
          pending: { label: "قيد الانتظار", variant: "default" },
          processing: { label: "قيد المعالجة", variant: "secondary" },
          shipped: { label: "تم الشحن", variant: "default" },
          delivered: { label: "تم التوصيل", variant: "secondary" },
          cancelled: { label: "ملغي", variant: "destructive" },
        }
        const { label, variant } = statusMap[status] || statusMap.pending
        return <Badge variant={variant as "default" | "secondary" | "destructive"}>{label}</Badge>
      },
    },
    {
      key: "created_at",
      title: "التاريخ",
      render: (date) => formatDate(date),
    },
  ]

  // Main KPI cards configuration in Arabic
  const kpiCards = [
    {
      title: "إجمالي الإيرادات",
      value: kpis ? formatCurrency(kpis.totalRevenue) : "...",
      icon: DollarSign,
      loading: kpisLoading,
    },
    {
      title: "الطلبات الجديدة (اليوم)",
      value: kpis ? kpis.newOrdersToday : "...",
      icon: ShoppingBag,
      loading: kpisLoading,
    },
    {
      title: "الرسائل المعلقة",
      value: kpis ? kpis.pendingMessages : "...",
      icon: MessageSquare,
      loading: kpisLoading,
    },
    {
      title: "إجمالي المنتجات",
      value: kpis ? kpis.totalProducts : "...",
      icon: Package,
      loading: kpisLoading,
    },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="نظرة عامة" />

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.loading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Top Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">المبيعات خلال آخر 30 يومًا</h3>
              <p className="text-sm text-gray-500">نظرة عامة على الإيرادات اليومية.</p>
            </div>
            <div className="h-[300px]">
              {salesLoading ? (
                <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg"></div>
              ) : (
                <LineChart
                  xAxis={[{ data: salesData.map(d => new Date(d.date)), scaleType: "time" }]}
                  series={[{ data: salesData.map(d => d.revenue), color: "#6D4C41" }]}
                  grid={{ vertical: true, horizontal: true }}
                />
              )}
            </div>
          </Card>
        </div>

        {/* Top Selling Products */}
        <div>
          <Card className="h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المنتجات الأكثر مبيعًا</h3>
            <div className="space-y-4">
              {productsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                topProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <Avatar src={product.image || "/placeholder.svg"} alt={product.name} size="md" />
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales_count} مبيعات</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <Card className="p-0">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">الطلبات الأخيرة</h3>
          </div>
          <DataTable data={recentOrders} columns={orderColumns} loading={ordersLoading} pageSize={5} />
        </Card>
      </div>
    </div>
  )
}