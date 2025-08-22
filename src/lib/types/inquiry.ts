export interface InquiryFormData {
  name: string
  email: string
  contactNumber: string
  product: string
  message: string
}

export interface ProductForInquiry {
  id: number
  name: string
  category?: string
  subcategory?: string
}

export interface InquiryResponse {
  success: boolean
  message: string
  data?: {
    id: number
    name: string
    email: string
    contact_number: string
    product_id: number
    message: string
    created_at: string
  }
}

export interface ProductsForInquiryResponse {
  success: boolean
  message: string
  data: ProductForInquiry[]
} 