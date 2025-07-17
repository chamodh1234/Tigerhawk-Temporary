import React from 'react'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  description: string
  image: string
  price: string
  category: string
}

const ProductCard = ({ id, name, description, image, price, category }: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 h-[400px] flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xl font-bold text-blue-600">
            {price}
          </span>
        </div>

        {/* Buy Now Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 transition-colors duration-300">
          BUY NOW
        </button>
      </div>
    </div>
  )
}

export default ProductCard 