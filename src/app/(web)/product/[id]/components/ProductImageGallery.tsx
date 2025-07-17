'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/redux/store'

/**
 * Component for displaying product image gallery with zoom functionality
 * Uses Redux state for product data
 * 
 * Debugging:
 * - Check Redux DevTools for product state
 * - Check console for component render logs
 */
const ProductImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)
  
  const { currentProduct } = useAppSelector((state) => state.product)

  if (!currentProduct) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500 text-sm sm:text-base">Loading images...</p>
        </div>
      </div>
    )
  }

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
    setIsZoomed(true)
  }

  const handleImageLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image with Zoom */}
      <div className="relative overflow-hidden border border-gray-200">
        <div
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] cursor-zoom-in"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${currentProduct.images[selectedImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(16px)',
              }}
              aria-hidden="true"
            />
            <Image
              src={currentProduct.images[selectedImage]}
              alt={`${currentProduct.name} - Image ${selectedImage + 1}`}
              fill
              className="object-contain z-10"
              priority
            />
          </div>
          
          {/* Zoom Overlay - Hidden on mobile */}
          {isZoomed && (
            <div className="absolute inset-0 pointer-events-none hidden md:block z-20">
              <div
                className="absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-white border-2 border-gray-300 shadow-xl"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: `url(${currentProduct.images[selectedImage]})`,
                  backgroundSize: '800%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {currentProduct.images.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-16 sm:h-18 md:h-20 border-2 transition-all duration-200 ${
              selectedImage === index 
                ? 'border-blue-600' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${currentProduct.name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
        
        {/* Show remaining images when there are more than 5 */}
        {currentProduct.images.length > 5 && !showAllThumbnails && (
          <button
            onClick={() => setShowAllThumbnails(true)}
            className="relative h-16 sm:h-18 md:h-20 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Image
              src={currentProduct.images[5]}
              alt={`${currentProduct.name} - Thumbnail 6`}
              fill
              className="object-cover"
            />
            {/* Low opacity black background with + number */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-xs sm:text-sm font-bold">
                +{currentProduct.images.length - 5}
              </div>
            </div>
          </button>
        )}

        {/* Show all remaining images when expanded */}
        {showAllThumbnails && currentProduct.images.length > 5 && (
          <>
            {currentProduct.images.slice(5, 10).map((image, index) => (
              <button
                key={index + 5}
                onClick={() => setSelectedImage(index + 5)}
                className={`relative h-16 sm:h-18 md:h-20 border-2 transition-all duration-200 ${
                  selectedImage === index + 5 
                    ? 'border-blue-600' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${currentProduct.name} - Thumbnail ${index + 6}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {/* Close button to collapse back to 5 images */}
            <button
              onClick={() => setShowAllThumbnails(false)}
              className="relative h-12 sm:h-12 md:h-12 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center"
            >
              <div className="text-gray-600 text-xs sm:text-sm font-medium">
                Show Less
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductImageGallery 