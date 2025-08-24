export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface OrderItem {
  id: number
  product_name: string
  product_image: string
  price: number
  quantity: number
  color?: string
  size?: string
}

export interface OrderTracking {
  id: number
  status: OrderStatus
  location?: string
  description: string
  event_date: string
}

export interface Order {
  id: number
  order_code: string
  status: OrderStatus
  tracking_history: OrderTracking[]
  customer: {
    first_name: string
    last_name: string
    email: string
    phone: string
  }
  shipping_address: {
      address: string
      city: string
  }
  financials: {
    grand_total: number
  }
  items: OrderItem[]
  created_at: string
}