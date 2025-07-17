import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
  topProducts: Array<{
    id: string
    name: string
    sales: number
  }>
}

interface ActivityItem {
  id: string
  type: 'login' | 'purchase' | 'update' | 'delete'
  description: string
  timestamp: string
  userId: string
  userName: string
}

interface DashboardState {
  stats: DashboardStats | null
  recentActivity: ActivityItem[]
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  stats: null,
  recentActivity: [],
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload
      state.error = null
    },
    setRecentActivity: (state, action: PayloadAction<ActivityItem[]>) => {
      state.recentActivity = action.payload
      state.error = null
    },
    addActivity: (state, action: PayloadAction<ActivityItem>) => {
      state.recentActivity.unshift(action.payload)
      // Keep only the latest 50 activities
      if (state.recentActivity.length > 50) {
        state.recentActivity = state.recentActivity.slice(0, 50)
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  setStats, 
  setRecentActivity, 
  addActivity, 
  setLoading, 
  setError, 
  clearError 
} = dashboardSlice.actions

export default dashboardSlice.reducer 