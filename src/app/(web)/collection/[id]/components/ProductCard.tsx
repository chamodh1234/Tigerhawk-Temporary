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
    <div className="bg-white border h-[400px] w-[400px] overflow-hidden justify-between pb-5 border-gray-200 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 relative rounded-[30px]">
      {/* Product Image */}
      <Link href={`/product/${id}`} className="z-0">
        <div>
          <img
            src={image?.url}
            alt={name}
            className="object-fill z-0"
          />
        </div>
      </Link>
      {/* Gradient Layer: absolute, bottom, yellow to white */}
      <div
        className="absolute bottom-0 left-0 w-full h-full z-10 pointer-events-none rounded-b-[30px]"
        style={{
          background: 'linear-gradient(to top, #fde047 0%, #fff 50%)',
          opacity: 0.55,
        }}
        aria-hidden="true"
      />
      <div className="px-5 absolute bottom-0 mb-7 w-full z-20">
        <button className="w-full primary-color-bg text-black cursor-pointer rounded-full font-bold py-3 px-4 transition-colors duration-300">
          Read more
        </button>
      </div>
      
    </div>
  )
}

export default ProductCard 