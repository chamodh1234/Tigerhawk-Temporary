'use client'
import React, { useState } from 'react'
import { useAppSelector } from '@/lib/redux/store'
import ProductComparison from './ProductComparison'

/**
 * Component for displaying product information tabs
 * Uses Redux state for product data
 * 
 * Debugging:
 * - Check Redux DevTools for product state
 * - Check console for component render logs
 */
const ProductInfo = () => {
  const [activeTab, setActiveTab] = useState('description')
  const { currentProduct } = useAppSelector((state) => state.product)

  if (!currentProduct) {
    return (
      <div className="bg-white border-t border-gray-200 pt-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading product information...</p>
        </div>
      </div>
    )
  }

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
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{currentProduct.description}</p>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-2 sm:space-y-3">
            {currentProduct.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-blue-600 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-8">
            <ProductComparison />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo 