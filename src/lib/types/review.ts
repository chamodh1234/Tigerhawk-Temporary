export interface Review {
  id: number
  product_id: number
  user_id?: number
  username: string
  title: string
  rating: number
  comment: string
  verified: boolean
  created_at: string
  updated_at: string
  user?: {
    id: number
    name: string
    email: string
  }
}

export interface CreateReviewRequest {
  rating: number
  comment: string
  username: string
  product_id: number
}

export interface UpdateReviewRequest {
  title: string
  rating: number
  comment: string
}

export interface ReviewResponse {
  success: boolean
  message: string
  data?: {
    reviews: Review[]
    total: number
    average_rating: number
    rating_breakdown: {
      [key: number]: number
    }
  }
}

export interface CreateReviewResponse {
  success: boolean
  message: string
  data?: Review
} 