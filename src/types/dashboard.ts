export interface DashboardKpi {
  totalRevenue: number
  newOrdersToday: number
  pendingMessages: number
  totalProducts: number
}

export interface RecentOrder {
  id: number
  order_code: string
  customer_name: string
  grand_total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  created_at: string
}

export interface TopProduct {
  id: number
  name: string
  image: string
  sales_count: number
}

export interface SalesDataPoint {
  date: string
  revenue: number
}