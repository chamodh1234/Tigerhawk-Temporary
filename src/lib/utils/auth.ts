// Utility functions for authentication and user management

export interface UserData {
  id: number
  name: string
  email: string
  role: string
  is_admin?: boolean
  type?: string
}

// Get user data from localStorage
export function getUserData(): UserData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Get token from localStorage
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = getToken()
  const userData = getUserData()
  return Boolean(token && userData)
}

// Check if user has admin role
export function isAdmin(): boolean {
  const userData = getUserData()
  if (!userData) return false
  
  return (
    userData.role === 'admin' || 
    userData.role === 'super_admin' || 
    userData.is_admin === true ||
    userData.type === 'admin'
  )
}

// Check if user can access admin routes
export function canAccessAdmin(): boolean {
  return isAuthenticated() && isAdmin()
}

// Logout user
export function logout(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('uid')
  
  // Redirect to login page
  window.location.href = '/auth/signin'
}

// Set user data in localStorage
export function setUserData(userData: UserData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify(userData))
}

// Set token in localStorage
export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
} 