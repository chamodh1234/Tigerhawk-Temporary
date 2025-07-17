'use client'
import React from 'react'
import { useAppSelector } from '@/lib/redux/store'

const ProductComparison = () => {
  const { currentProduct } = useAppSelector((state) => state.product)

  if (!currentProduct) {
    return (
      <div className="bg-white border-t border-black pt-4 sm:pt-6">
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-sm sm:text-base">Loading comparison data...</p>
        </div>
      </div>
    )
  }

  // Use comparison data from Redux product state
  const comparisonData = currentProduct.comparisonData || []

  return (
    <div className="bg-white border-black pt-4 ">
      <div className="space-y-3 sm:space-y-4">

        <div className="overflow-x-auto">
          <table border={1} className="w-full max-w-4xl border-[1px] border-black border-collapse">
            <thead>
              <tr className="bg-[#000000] border-b border-r border-black">
                <th className="text-left p-2 sm:p-3 border-r border-black font-semibold text-white text-xs sm:text-sm">
                  Specification
                </th>
                <th className="text-center p-2 sm:p-3 border-r border-black font-semibold text-white text-xs sm:text-sm">
                  Tigerhawk
                </th>
                <th className="text-center p-2 sm:p-3 border-r border-black font-semibold text-white text-xs sm:text-sm">
                  Typical
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 sm:p-3 border-b border-r border-black font-medium text-gray-900 text-xs sm:text-sm">
                    {row.specification}
                  </td>
                  <td className="p-2 sm:p-3 border-b border-r border-black text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <span className="text-green-600 font-semibold text-xs sm:text-sm">
                        {row.tigerhawk}
                      </span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 border-b border-black text-center text-gray-600 text-xs sm:text-sm">
                    {row.typical}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-3 sm:pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 transition-colors duration-300 text-xs sm:text-sm">
            SHOP TIGERHAWK PRODUCTS
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductComparison 