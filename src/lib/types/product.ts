export interface ProductFeature {
  id?: string
  specification: string
  tiger_hawk: string
  typical_torch: string
}

export interface Product {
  id?: string
  product_id: string
  name: string
  description: string
  price: number
  mainCategory: string | number
  subCategory: string | number
  images: File[]
  discount: number
  product_features: ProductFeature[]
  additional_features: string[]
} 