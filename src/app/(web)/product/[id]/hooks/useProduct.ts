import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { setProduct, setLoading, setError, clearProduct } from '@/lib/redux/slices/productSlice'

/**
 * Hook for managing product data using Redux
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
  const dispatch = useAppDispatch()
  const { currentProduct, loading, error } = useAppSelector((state) => state.product)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('🚀 HOOK:useProduct - STARTED', { productId })
        
        dispatch(setLoading(true))
        
        // Mock API call - replace with actual API endpoint
        const mockProduct = {
          id: productId,
          name: 'Tiger Hawk Pro Headlamp - Professional Grade',
          price: 89.99,
          originalPrice: 120.00,
          discount: 25,
          rating: 4.8,
          reviewCount: 127,
          description: 'Professional grade headlamp with 1000 lumens output, rechargeable battery, and multiple lighting modes. Perfect for outdoor activities, emergency situations, and professional use.',
          features: [
            '1000 lumens maximum output',
            'Rechargeable lithium-ion battery',
            '5 lighting modes (High, Medium, Low, Strobe, SOS)',
            'Waterproof (IPX7 rated)',
            'Adjustable headband',
            'USB-C charging port',
            'Runtime: 8 hours on high, 72 hours on low',
            'Weight: 180g'
          ],
          specifications: {
            'Brightness': '1000 lumens',
            'Battery': 'Rechargeable 18650',
            'Runtime': '8-72 hours',
            'Waterproof': 'IPX7',
            'Weight': '180g',
            'Material': 'Aerospace-grade aluminum',
            'Warranty': '2 years'
          },
          images: [
            '/hero-section-image.jpg',
            '/hero-section-image-2.jpg',
            '/camping.jpg',
            '/security-guard-workspace.jpg',
            '/side-view-woman-holding-flashlight.jpg',
            '/closeup-gas-lamp-tent-nature.jpg',
            '/portrait-scuba-diver-sea-water-with-marine-life.jpg',
            '/s-l1200.jpg',
            '/new-product.png',
            '/diamond.png',
            '/trust.png'
          ],
          category: 'Headlamp',
          subcategory: 'Professional',
          inStock: true,
          stockCount: 15,
          sku: 'TH-PRO-1000',
          brand: 'Tiger Hawk',
          comparisonData: [
            {
              specification: 'Battery Life',
              tigerhawk: 'Up to 72 hours',
              typical: '24-48 hours'
            },
            {
              specification: 'Brightness',
              tigerhawk: '1000 lumens',
              typical: '500-800 lumens'
            },
            {
              specification: 'Water Resistance',
              tigerhawk: 'IPX7 (Submersible)',
              typical: 'IPX4 (Splash proof)'
            },
            {
              specification: 'Impact Resistance',
              tigerhawk: '2m drop tested',
              typical: '1m drop tested'
            },
            {
              specification: 'Charging Time',
              tigerhawk: '3 hours',
              typical: '6-8 hours'
            },
            {
              specification: 'Warranty',
              tigerhawk: '2 years',
              typical: '1 year'
            },
            {
              specification: 'Build Quality',
              tigerhawk: 'Aerospace-grade aluminum',
              typical: 'Plastic/Polycarbonate'
            },
            {
              specification: 'Beam Distance',
              tigerhawk: '500m',
              typical: '200-300m'
            }
          ]
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('✅ HOOK:useProduct - SUCCESS', { productId })
        dispatch(setProduct(mockProduct))
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('💥 HOOK:useProduct - ERROR', { 
          productId, 
          error: errorMessage 
        })
        dispatch(setError(`Failed to fetch product: ${errorMessage}`))
      }
    }

    if (productId) {
      fetchProduct()
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearProduct())
    }
  }, [productId, dispatch])

  return {
    product: currentProduct,
    loading,
    error
  }
} 