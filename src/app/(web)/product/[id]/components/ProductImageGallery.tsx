'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  images: any[]
}

interface ProductImageGalleryProps {
  product: Product
}

/**
 * Component for displaying product image gallery with zoom functionality
 * Uses product prop for data
 * 
 * Debugging:
 * - Check console for component render logs
 */
const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left ) / rect.width) * 100
    const y = ((e.clientY - rect.top + 10) / rect.height) * 100
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
            {/* Blurred background image */}
            <img
              src={product.images[selectedImage]}
              alt={`${product.name} - Blurred Background`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'blur(24px) brightness(0.9)',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              aria-hidden="true"
              draggable={false}
            />
            {/* Foreground clear image */}
            <img
              src={product.images[selectedImage]}
              alt={`${product.name} - Image ${selectedImage + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'relative',
                zIndex: 1,
                background: 'transparent',
              }}
              className="object-contain"
            />
          </div>
          {/* Zoom Overlay - Hidden on mobile */}
          {isZoomed && (
            <div className="absolute inset-0 pointer-events-none md:block z-10">
              <div
                className="absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-white border-2 border-gray-300 shadow-xl"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundImage: `url(${product.images[selectedImage]})`,
                  backgroundSize: '800%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {product.images.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-16 sm:h-18 md:h-20 border-2 transition-all duration-200 ${
              selectedImage === index 
                ? 'border-blue-600' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${product.name} - Thumbnail ${index + 1}`}
              
              className="object-cover overflow-hidden w-full h-full"
            />
          </button>
        ))}
        
        {/* Show remaining images when there are more than 5 */}
        {product.images.length > 5 && !showAllThumbnails && (
          <button
            onClick={() => setShowAllThumbnails(true)}
            className="relative h-16 sm:h-18 md:h-20 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Image
              src={product.images[5]}
              alt={`${product.name} - Thumbnail 6`}
              fill
              className="object-contain overflow-hidden"
            />
            {/* Low opacity black background with + number */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-xs sm:text-sm font-bold">
                +{product.images.length - 5}
              </div>
            </div>
          </button>
        )}

        {/* Show all remaining images when expanded */}
        {showAllThumbnails && product.images.length > 5 && (
          <>
            {product.images.slice(5, 10).map((image, index) => (
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
                  alt={`${product.name} - Thumbnail ${index + 6}`}
                  fill
                  className="object-contain overflow-hidden"
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