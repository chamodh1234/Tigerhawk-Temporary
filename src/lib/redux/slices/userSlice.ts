import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
    language: string
  }
  createdAt: string
  updatedAt: string
}

interface UserState {
  profile: UserProfile | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
      state.error = null
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      }
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearProfile: (state) => {
      state.profile = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  setProfile, 
  updateProfile, 
  setLoading, 
  setError, 
  clearProfile, 
  clearError 
} = userSlice.actions

export default userSlice.reducer 