import { MainCategory, SubCategory } from '@/app/admin/products/page'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface CategoryState {
  mainCategories: MainCategory[]
  subCategories: SubCategory[]
  isLoading: boolean
  error: string | null
}

const initialState: CategoryState = {
  mainCategories: [],
  subCategories: [],
  isLoading: false,
  error: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setMainCategories: (state, action: PayloadAction<MainCategory[]>) => {
      state.mainCategories = action.payload
    },
    setSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.subCategories = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearCategories: (state) => {
      state.mainCategories = []
      state.subCategories = []
      state.error = null
    }
  }
})

export const {
  setMainCategories,
  setSubCategories,
  setLoading,
  setError,
  clearCategories
} = categorySlice.actions

export default categorySlice.reducer 