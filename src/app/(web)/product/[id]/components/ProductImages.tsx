 'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/redux/store'

interface ProductImage {
  id: string
  url: string
  alt: string
  caption?: string
}

const ProductImages = () => {
  const [images, setImages] = useState<ProductImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentProduct } = useAppSelector((state) => state.product)

  useEffect(() => {
    const fetchProductImages = async () => {
      if (!currentProduct?.id) {
        setLoading(false)
        return
      }

      try {
        console.log('PRODUCT_IMAGES: Fetching images for product:', currentProduct.id)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockImages: ProductImage[] = [
          {
            id: '1',
            url: '/hero-section-image.jpg',
            alt: 'Product overview',
            caption: 'Complete product overview showing all features'
          },
          {
            id: '2',
            url: '/hero-section-image-2.jpg',
            alt: 'Product in use',
            caption: 'Product being used in real-world scenario'
          },
          {
            id: '3',
            url: '/camping.jpg',
            alt: 'Product details',
            caption: 'Detailed view of product components'
          },
          {
            id: '4',
            url: '/closeup-gas-lamp-tent-nature.jpg',
            alt: 'Product specifications',
            caption: 'Technical specifications and measurements'
          },
          {
            id: '5',
            url: '/man-walking-with-lantern-woods.jpg',
            alt: 'Product features',
            caption: 'Key features and capabilities highlighted'
          }
        ]
        
        setImages(mockImages)
        setLoading(false)
        console.log('PRODUCT_IMAGES: Successfully loaded', mockImages.length, 'images')
      } catch (err) {
        console.error('PRODUCT_IMAGES: Error fetching images:', err)
        setError('Failed to load product images')
        setLoading(false)
      }
    }

    fetchProductImages()
  }, [currentProduct?.id])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Product Images</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 sm:h-80 lg:h-96"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Product Images</h3>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="space-y-4">

        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600">No product images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-[100px]">
      <div className="space-y-6">
        {images.map((image, index) => (
          <div key={image.id} className="space-y-2 w-full flex justify-center items-center">
            <div className="w-2/3  overflow-hidden bg-gray-100">
              <Image
                src={image.url}
                alt={image.alt}
                width={0}
                height={0}
                className="w-full h-auto object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                priority={index < 2}
                onLoad={() => console.log('PRODUCT_IMAGES: Image loaded:', image.url)}
                onError={() => console.error('PRODUCT_IMAGES: Image failed to load:', image.url)}
              />
            </div>
         
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages 