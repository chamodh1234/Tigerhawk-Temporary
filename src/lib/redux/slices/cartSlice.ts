import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  product_id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    description: string
    price: number
    images: Array<{ url: string }>
    main_category: { name: string }
  }
  created_at: string
}

interface CartState {
  cartItems: any[]
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload
      state.loading = false
      state.error = null
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload)
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const item = state.cartItems.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  setCartItems, 
  addCartItem, 
  removeCartItem, 
  updateCartItemQuantity,
  setLoading, 
  setError, 
  clearError 
} = cartSlice.actions

export default cartSlice.reducer 