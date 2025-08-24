"use client"

import { useNavigate } from "react-router-dom"
import { Edit, Plus, Package, CheckCircle, Archive, Percent } from "lucide-react"
import { useProducts } from "../../hooks/use-products"
import type { Product } from "../../types/product"
import DataTable, { Column } from "../../components/datatable"
import Toolbar from "../../components/ui/toolbar"
import Button from "../../components/ui/button"
import Avatar from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { DeleteProductDialog } from "./delete_product_dialog"
import Card from "../../components/ui/card"

export default function ProductsPage() {
  const { data: products = [], isLoading, refetch } = useProducts()
  console.log(products);
  
  const navigate = useNavigate()

  // --- Statistics Calculation ---
  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    withDiscount: products.filter((p) => (p.discount ?? 0) > 0).length,
  }

  const kpiCards = [
    { title: "إجمالي المنتجات", value: stats.total, icon: Package },
    { title: "المنتجات النشطة", value: stats.active, icon: CheckCircle },
    { title: "نفذ من المخزون", value: stats.outOfStock, icon: Archive },
    { title: "منتجات عليها خصم", value: stats.withDiscount, icon: Percent },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(amount)
  }

  const columns: Column<Product>[] = [
    {
      key: "name",
      title: "المنتج",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.image} alt={row.name.ar} size="md" />
          <div>
            <p className="font-semibold">{row.name.ar}</p>
            <p className="text-sm text-gray-500">{row.name.en}</p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      title: "السعر",
      render: (price) => <span className="font-mono">{formatCurrency(price)}</span>,
    },
    {
      key: "status",
      title: "الحالة",
      render: (status) => (
        <Badge variant={status === 'active' ? 'secondary' : 'default'}>
          {status === "active" ? "نشط" : "مسودة"}
        </Badge>
      ),
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button className="!p-2" variant="secondary" size="sm" onClick={() => navigate(`/products/${row.id}/update`)}>
            <Edit className="w-4 h-4" />
          </Button>
          <DeleteProductDialog product={row} onSuccess={refetch} />
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6" dir="rtl">
      <Toolbar title="إدارة المنتجات">
        <Button variant="primary-inverted" onClick={() => navigate("/products/create")}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج جديد
        </Button>
      </Toolbar>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? "..." : card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* DataTable wrapped in a Card for consistent design */}
      <Card className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          data={products}
          loading={isLoading}
          searchable
          exportable
        />
      </Card>
    </div>
  )
}