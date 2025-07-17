import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  description: string
  features: string[]
  specifications: { [key: string]: string }
  images: string[]
  category: string
  subcategory: string
  inStock: boolean
  stockCount: number
  sku: string
  brand: string
  comparisonData?: {
    specification: string
    tigerhawk: string
    typical: string
  }[]
}

interface ProductState {
  currentProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  currentProduct: null,
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload
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
    clearProduct: (state) => {
      state.currentProduct = null
      state.loading = false
      state.error = null
    }
  }
})

export const { setProduct, setLoading, setError, clearProduct } = productSlice.actions
export default productSlice.reducer 