import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order, OrderStatusUpdate } from '../types/order'

interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
  selectedOrder: Order | null
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload
    },
    updateOrderStatus: (state, action: PayloadAction<OrderStatusUpdate>) => {
      const { orderId, status } = action.payload
      const orderIndex = state.orders.findIndex(order => order.id.toString() === orderId)
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status
      }
    },
    clearOrders: (state) => {
      state.orders = []
      state.loading = false
      state.error = null
      state.selectedOrder = null
    }
  }
})

export const { 
  setOrders, 
  setLoading, 
  setError, 
  setSelectedOrder, 
  updateOrderStatus, 
  clearOrders 
} = ordersSlice.actions

export default ordersSlice.reducer 