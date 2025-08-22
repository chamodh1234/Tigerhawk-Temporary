export interface EmailSettings {
  id?: number
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  from_email: string
  from_name: string
  encryption: 'tls' | 'ssl' | 'none'
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface UpdateEmailSettingsRequest {
  host: string
  port: number
  username: string
  password: string
  from_address: string
  from_name: string
  encryption: 'tls' | 'ssl' | 'none'
  is_active: boolean
  mail_driver: string
}

export interface TestEmailRequest {
  to_email: string
  subject: string
  message: string
}

export interface TestEmailResponse {
  success: boolean
  message: string
} 