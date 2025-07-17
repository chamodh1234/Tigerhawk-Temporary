'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useProduct } from './hooks/useProduct'
import ProductImageGallery from './components/ProductImageGallery'
import ProductDetails from './components/ProductDetails'
import ProductInfo from './components/ProductInfo'
import ProductComparison from './components/ProductComparison'
import GallerySection from '../../components/GallerySection'
import ProductReviewSection from './components/ProductReviewSection'
import ProductImages from './components/ProductImages'

/**
 * Dynamic product page component
 * Uses Redux for state management and route-specific hooks
 * 
 * Debugging:
 * - Check console for "HOOK:useProduct" logs
 * - Check Redux DevTools for product state changes
 * - Common errors: Product not found, Network error
 */
const ProductPage = () => {
  const params = useParams()
  const productId = params.id as string
  const { product, loading, error } = useProduct(productId)

  if (loading) {
    return (
      <section className="bg-white min-h-screen">
        <div className="wrapper py-4 sm:py-6 lg:py-8">
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <p className="text-gray-500 text-base sm:text-lg">Loading product...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="bg-white min-h-screen">
        <div className="wrapper py-4 sm:py-6 lg:py-8">
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <p className="text-red-500 text-base sm:text-lg">
              {error || 'Product not found'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-white min-h-screen">
        <div className="wrapper py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb */}
          <div className="mb-4 sm:mb-6">
            <nav className="text-xs sm:text-sm text-gray-500">
              <span>Home</span>
              <span className="mx-1 sm:mx-2">/</span>
              <span>Collection</span>
              <span className="mx-1 sm:mx-2">/</span>
              <span>{product.category}</span>
              <span className="mx-1 sm:mx-2">/</span>
              <span className="text-gray-900 truncate">{product.name}</span>
            </nav>
          </div>

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column - Image Gallery */}
            <ProductImageGallery />
            
            {/* Right Column - Product Details */}
            <ProductDetails />
          </div>

          {/* Product Information Section - Below main layout */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <ProductInfo />
          </div>
  <div>
          <ProductImages />

          </div>
{/* 
          <div>
            <GallerySection />
          </div> */}
          {/* Product Review Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <ProductReviewSection />
          </div>

        

        </div>
      </section>
    </>
  )
}

export default ProductPage 