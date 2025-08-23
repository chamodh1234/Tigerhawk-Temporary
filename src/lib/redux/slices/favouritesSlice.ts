import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavouriteItem {
  id: string
  product_id: string
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

interface FavouritesState {
  favourites: FavouriteItem[]
  loading: boolean
  error: string | null
}

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
  error: null
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action: PayloadAction<FavouriteItem[]>) => {
      state.favourites = action.payload
      state.loading = false
      state.error = null
    },
    addFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      state.favourites.push(action.payload)
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(fav => fav.id !== action.payload)
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
  setFavourites, 
  addFavourite, 
  removeFavourite, 
  setLoading, 
  setError, 
  clearError 
} = favouritesSlice.actions

export default favouritesSlice.reducer 