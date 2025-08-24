export interface StatisticsKpi {
  totalRevenue: number
  totalOrders: number
  totalProductsSold: number
  averageOrderValue: number
}

export interface TopProductStat {
  product_name: string
  total_sold: number
}

export interface SalesByCityStat {
  city: string
  order_count: number
}