export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  token: string
  refreshToken?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
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

export interface AuthError {
  message: string
  code?: string
  field?: string
} 