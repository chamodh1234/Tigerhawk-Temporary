'use client'
import React, { useState } from 'react'
import ProductComparison from './ProductComparison'

interface Product {
  id: string
  name: string
  description: string
  features: string[]
  specifications: Record<string, string>
  comparisonData: Array<{
    specification: string
    tigerhawk: string
    typical: string
  }>
}

interface ProductInfoProps {
  product: Product
}

/**
 * Component for displaying product information tabs
 * Uses product prop for data
 * 
 * Debugging:
 * - Check console for component render logs
 */
const ProductInfo = ({ product }: ProductInfoProps) => {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className="bg-white border-t border-gray-200 pt-4 sm:pt-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'description', label: 'Description' },
          { id: 'features', label: 'Features' },
          { id: 'specifications', label: 'Specifications' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4 sm:py-6">
        {activeTab === 'description' && (
          <div className="space-y-3 sm:space-y-4" dangerouslySetInnerHTML={{ __html: product.description }} />
           
        )}

        {activeTab === 'features' && (
          <div className="space-y-2 sm:space-y-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-blue-600 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-8">
            <ProductComparison product={product} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo 