export interface UserAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface UserBioData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface UserProfile {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: UserAddress
  preferences?: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
}

export interface UpdateBioDataRequest {
  name: string
  last_name: string
  email: string
  phone_number: string
}

export interface UpdateAddressRequest {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface UserPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

export interface UpdatePreferencesRequest {
  email_notifications: boolean
  sms_notifications: boolean
  marketing_emails: boolean
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