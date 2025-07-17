'use client'
import React, { useState } from 'react'

interface ProductFilterProps {
  selectedSort: string
  selectedCategory: string
  onSortChange: (value: string) => void
  onCategoryChange: (value: string) => void
  categories: string[]
}

const ProductFilter = ({ 
  selectedSort, 
  selectedCategory, 
  onSortChange, 
  onCategoryChange, 
  categories 
}: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempSort, setTempSort] = useState(selectedSort)
  const [tempCategory, setTempCategory] = useState(selectedCategory)

  const handleApply = () => {
    onSortChange(tempSort)
    onCategoryChange(tempCategory)
    setIsOpen(false)
  }

  const handleClear = () => {
    setTempSort('name-asc')
    setTempCategory('')
    onSortChange('name-asc')
    onCategoryChange('')
    setIsOpen(false)
  }

  const handleClose = () => {
    setTempSort(selectedSort)
    setTempCategory(selectedCategory)
    setIsOpen(false)
  }

  return (
    <>
      {/* Filter Button */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="wrapper">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span className="font-semibold">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleClose}
        />
      )}

      {/* Filter Drawer - Right Side */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Filter Products
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex-1 space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>
              <select
                value={tempCategory}
                onChange={(e) => setTempCategory(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort by
              </label>
              <select
                value={tempSort}
                onChange={(e) => setTempSort(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className='w-full'>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex-1 border w-1/2 border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex-1 border w-1/2 border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Features
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Rechargeable</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Waterproof</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Tactical</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Emergency</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 transition-colors duration-300"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 transition-colors duration-300"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductFilter 