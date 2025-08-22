'use client'
import React from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  images: string[]
}

interface ProductImagesProps {
  product: Product
}

const ProductImages = ({ product }: ProductImagesProps) => {
  if (!product.images || product.images.length === 0) {
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
        {product.images.map((image, index) => (
          <div key={index} className="space-y-2 w-full flex justify-center items-center">
            <div className="w-2/3 overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                width={0}
                height={0}
                className="w-full h-auto object-contain "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                onLoad={() => console.log('PRODUCT_IMAGES: Image loaded:', image)}
                onError={() => console.error('PRODUCT_IMAGES: Image failed to load:', image)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages 