import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  description: string
  image: { id: string, url: string }
  price: string
  category: string
}

const ProductCard = ({ id, name, description, image, price, category }: ProductCardProps) => {
  console.log("image product card", image)
  return (
    <div className="bg-white border justify-between pb-5 border-gray-200 h-[450px] flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <Link href={`/product/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={image?.url}
            alt={name}
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

        </div>
      </Link>
      <div className='px-5'>
        <button className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 transition-colors duration-300">
        BUY NOW
      </button>
      </div>
      
    </div>
  )
}

export default ProductCard 