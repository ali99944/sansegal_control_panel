"use client"

import { useGetQuery } from "./queries-actions"
import type { StatisticsKpi, TopProductStat, SalesByCityStat } from "../types/statistics"

export function useStatisticsKpis() {
  return useGetQuery<StatisticsKpi>({
    key: ["statistics-kpis"],
    url: "statistics/kpis",
  })
}

export function useTopProductsStats(limit = 5) {
  return useGetQuery<TopProductStat[]>({
    key: ["statistics-top-products", limit],
    url: `statistics/top-products?limit=${limit}`,
  })
}

export function useSalesByCityStats(limit = 6) {
  return useGetQuery<SalesByCityStat[]>({
    key: ["statistics-sales-by-city", limit],
    url: `statistics/sales-by-city?limit=${limit}`,
  })
}

// We can reuse the existing hook for sales over time
export { useSalesOverTime } from "./use-dashboard"