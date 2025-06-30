export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
  emailNotifications: boolean
  pushNotifications: boolean
}

export interface UpdateProfileData {
  name?: string
  bio?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}

export interface UserStats {
  totalLogins: number
  lastLogin: string
  accountAge: number
  profileCompletion: number
} 