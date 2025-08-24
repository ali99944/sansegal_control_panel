"use client"

import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react"
import { BarChart, LineChart, PieChart, pieArcLabelClasses } from "@mui/x-charts"
import { useSalesByCityStats, useSalesOverTime, useStatisticsKpis, useTopProductsStats } from "../hooks/use-statistics"
import Toolbar from "../components/ui/toolbar"
import Card from "../components/ui/card"

export default function StatisticsPage() {
  // Fetch all statistics data
  const { data: kpis, isLoading: kpisLoading } = useStatisticsKpis()
  const { data: salesData = [], isLoading: salesLoading } = useSalesOverTime("30d")
  const { data: topProducts = [], isLoading: topProductsLoading } = useTopProductsStats()
  const { data: salesByCity = [], isLoading: cityLoading } = useSalesByCityStats()

  const formatCurrency = (amount: number) => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(amount)

  const kpiCards = [
    { title: "إجمالي الإيرادات", value: kpis ? formatCurrency(kpis.totalRevenue) : "...", icon: DollarSign, loading: kpisLoading },
    { title: "إجمالي الطلبات", value: kpis ? kpis.totalOrders : "...", icon: ShoppingBag, loading: kpisLoading },
    { title: "المنتجات المباعة", value: kpis ? kpis.totalProductsSold : "...", icon: Package, loading: kpisLoading },
    { title: "متوسط قيمة الطلب", value: kpis ? formatCurrency(kpis.averageOrderValue) : "...", icon: TrendingUp, loading: kpisLoading },
  ]

  // Chart brand color
  const primaryColor = "#6D4C41";

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="الإحصائيات والتحليلات" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg"><card.icon className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.loading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Sales Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">نظرة عامة على المبيعات (آخر 30 يومًا)</h3>
        <div className="h-[350px]">
          {salesLoading ? (
            <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <LineChart
              xAxis={[{ data: salesData.map(d => new Date(d.date)), scaleType: "time", valueFormatter: (date) => date.toLocaleDateString('ar-EG') }]}
              series={[{ data: salesData.map(d => d.revenue), color: primaryColor, area: true, curve: "catmullRom" }]}
              grid={{ vertical: true, horizontal: true }}
              sx={{ '.MuiLineElement-root': { strokeWidth: 3 }, '.MuiAreaElement-root': { fill: "url(#gradient)", fillOpacity: 0.2 } }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                    </linearGradient>
                </defs>
            </LineChart>
          )}
        </div>
      </Card>
      
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <Card className="h-full">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">المنتجات الأكثر مبيعًا</h3>
                 <div className="h-[300px]">
                    {topProductsLoading ? (
                        <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg" />
                    ) : (
                         <BarChart
                            dataset={topProducts.map((product, id) => ({ id, product_name: product.product_name, total_sold: product.total_sold }))}
                            yAxis={[{ scaleType: 'band', dataKey: 'product_name' }]}
                            series={[{ dataKey: 'total_sold', color: primaryColor }]}
                            layout="horizontal"
                            grid={{ vertical: true }}
                        />
                    )}
                 </div>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">التوزيع الجغرافي للمبيعات</h3>
                <div className="h-[300px]">
                    {cityLoading ? (
                         <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg" />
                    ): (
                        <PieChart
                            series={[{
                                data: salesByCity.map((city, id) => ({ id, value: city.order_count, label: city.city })),
                                innerRadius: 50,
                                arcLabel: (item) => `${item.value}`,
                            }]}
                            sx={{ [`& .${pieArcLabelClasses.root}`]: { fill: 'white', fontSize: 14 } }}
                            colors={['#6D4C41', '#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8', '#EFEBE9']} // Palette of brown shades
                        />
                    )}
                </div>
            </Card>
        </div>
      </div>
    </div>
  )
}