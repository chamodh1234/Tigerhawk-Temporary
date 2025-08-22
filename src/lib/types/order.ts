export interface OrderItem {
  id: number
  order_id: number
  quantity: number
  price: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  product?: {
    id: number
    name: string
    price: number
  }
}

export interface OrderUser {
  id: number
  name: string
  email: string
}

export interface Order {
  id: number
  order_id: string
  user_id: number
  status: string
  delivery_address: string | null
  ordered_date: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  total_quantity: number
  total_price: number
  user: OrderUser
  order_items: any[]
}

export interface OrderStatusUpdate {
  orderId: string
  status: string
} 