import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { apiSlice } from './apiSlice'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import dashboardSlice from './slices/dashboardSlice'
import productSlice from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import favouritesReducer from './slices/favouritesSlice'
import cartReducer from './slices/cartSlice'
import ordersReducer from './slices/ordersSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice,
    dashboard: dashboardSlice,
    product: productSlice,
    category: categoryReducer,
    favourites: favouritesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 