'use client'

import React from 'react'
import ProductImageGallery from './components/ProductImageGallery'

// Dummy product data
const dummyProduct = {
  id: '1',
  name: 'Tiger Hawk Pro LED Torch',
  price: 299.99,
  description: 'Professional-grade LED torch with advanced features including multiple brightness modes, waterproof design, and long battery life. Perfect for outdoor adventures, emergency situations, and professional use.',
  images: [
    '/hero-section-image.jpg',
    '/hero-section-image-2.jpg',
    '/camping.jpg',
    '/closeup-gas-lamp-tent-nature.jpg',
    '/man-walking-with-lantern-woods.jpg',
    '/side-view-woman-holding-flashlight.jpg',
    '/side-view-woman-with-head-lantern.jpg',
    '/portrait-scuba-diver-sea-water-with-marine-life.jpg',
    '/hero-section-image.jpg',
    '/hero-section-image-2.jpg',
    '/camping.jpg',
    '/closeup-gas-lamp-tent-nature.jpg'
  ],
  features: [
    '1000 Lumens Brightness',
    'Waterproof IPX7',
    'Rechargeable Battery',
    '5 Brightness Modes',
    'SOS Emergency Mode',
    'Durable Aluminum Body'
  ],
  specifications: {
    'Battery Life': 'Up to 12 hours',
    'Beam Distance': '300 meters',
    'Weight': '250g',
    'Dimensions': '15cm x 3cm',
    'Material': 'Aerospace Aluminum',
    'Warranty': '2 Years'
  }
}

const ProductViewPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="/products" className="text-gray-700 hover:text-blue-600">Products</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{dummyProduct.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Image Gallery */}
          <div className="relative">
            <ProductImageGallery 
              images={dummyProduct.images} 
              productName={dummyProduct.name} 
            />
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-8">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{dummyProduct.name}</h1>
              <div className="text-3xl font-bold text-blue-600 mb-6">${dummyProduct.price}</div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{dummyProduct.description}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {dummyProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(dummyProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 font-medium">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6">
              <button className="w-full primary-color-bg text-black rounded-full py-4 px-8  font-semibold text-lg hover:bg-blue-700 transition-colors duration-300">
                Add to favourites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductViewPage