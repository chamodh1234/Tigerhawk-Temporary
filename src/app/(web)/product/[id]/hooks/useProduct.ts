import { useGetProductByIdQuery } from '@/lib/redux/apiSlice'

/**
 * Hook for managing product data using Redux RTK Query
 * Handles fetching, loading states, and error management
 * 
 * @param productId - The ID of the product to fetch
 * @returns Object containing product data, loading state, and error
 * 
 * Debugging:
 * - Check Redux DevTools for state changes
 * - Check console for "HOOK:useProduct" logs
 * - Common errors: Product not found, Network error
 */
export function useProduct(productId: string) {
  const { data: apiProduct, isLoading, error } = useGetProductByIdQuery(productId, {
    skip: !productId
  })

  // Transform API data to match component expectations
  const product = apiProduct?.data ? {
    id: apiProduct.data.id || apiProduct.data.product_id,
    name: apiProduct.data.name,
    price: apiProduct.data.price,
    originalPrice: apiProduct.data.price * (1 + (apiProduct.data.discount / 100)),
    discount: apiProduct.data.discount || 0,
    rating: 4.8, // Default rating - could come from API
    reviewCount: 127, // Default review count - could come from API
    description: apiProduct.data.description,
    features: apiProduct.data.product_features?.map((feature: any) => feature.specification) || [],
    specifications: apiProduct.data.product_features?.reduce((acc: any, feature: any) => {
      acc[feature.specification] = feature.tiger_hawk
      return acc
    }, {}) || {},
    images: apiProduct.data.images || ['/hero-section-image.jpg'],
    category: apiProduct.data.main_category?.name || 'Uncategorized',
    subcategory: apiProduct.data.sub_category?.name || '',
    inStock: true, // Default - could come from API
    stockCount: 15, // Default - could come from API
    sku: apiProduct.data.product_id,
    brand: 'Tiger Hawk',
    comparisonData: apiProduct.data.product_features?.map((feature: any) => ({
      specification: feature.specification,
      tigerhawk: feature.tiger_hawk,
      typical: feature.typical_torch
    })) || []
  } : null

  return {
    product,
    loading: isLoading,
    error: error ? 'Failed to fetch product' : null
  }
} 