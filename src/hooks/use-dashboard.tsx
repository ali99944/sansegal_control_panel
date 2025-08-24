"use client"

import { useGetQuery } from "./queries-actions"
import type { DashboardKpi, RecentOrder, TopProduct, SalesDataPoint } from "../types/dashboard"

/**
 * Hook to fetch the main Key Performance Indicators for the dashboard.
 */
export function useDashboardKpis() {
  return useGetQuery<DashboardKpi>({
    key: ["dashboard-kpis"],
    url: "dashboard/kpis", // Assumes a backend endpoint: GET /api/dashboard/kpis
  })
}

/**
 * Hook to fetch the most recent orders.
 */
export function useRecentOrders() {
  return useGetQuery<RecentOrder[]>({
    key: ["dashboard-recent-orders"],
    url: "dashboard/recent-orders", // Assumes: GET /api/dashboard/recent-orders
  })
}

/**
 * Hook to fetch top-selling products.
 */
export function useTopProducts() {
  return useGetQuery<TopProduct[]>({
    key: ["dashboard-top-products"],
    url: "dashboard/top-products", // Assumes: GET /api/dashboard/top-products
  })
}

/**
 * Hook to fetch sales data over a period of time for charting.
 * @param range - The date range (e.g., '7d', '30d').
 */
export function useSalesOverTime(range = "30d") {
  return useGetQuery<SalesDataPoint[]>({
    key: ["dashboard-sales-over-time", range],
    url: `dashboard/sales-over-time?range=${range}`, // Assumes: GET /api/dashboard/sales-over-time?range=30d
  })
}