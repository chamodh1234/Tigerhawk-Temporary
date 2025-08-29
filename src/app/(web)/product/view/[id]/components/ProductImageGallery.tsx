'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Ensure we have maximum 12 images (1 main + 11 thumbnails)
  const displayImages = images.slice(0, 12)
  const thumbnailImages = displayImages.slice(1) // All images except the first one

  return (
    <div className="w-full">
      {/* Main Square Image */}
      <div className="relative w-full aspect-square mb-6 bg-white rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={displayImages[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Image Counter Overlay */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {selectedImageIndex + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnail Grid - Maximum 11 squares */}
      {thumbnailImages.length > 0 && (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 gap-2 sm:gap-3">
          {thumbnailImages.map((image, index) => {
            const actualIndex = index + 1 // +1 because we excluded the first image
            return (
              <div
                key={actualIndex}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-md border-2 ${
                  selectedImageIndex === actualIndex 
                    ? 'border-blue-500 scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleImageClick(actualIndex)}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${actualIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16vw, (max-width: 1200px) 12vw, 8vw"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Responsive adjustments for smaller screens */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Click on any thumbnail to view the full image</p>
      </div>
    </div>
  )
}

export default ProductImageGallery 