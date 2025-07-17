'use client'
import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: string
  category: string
}

interface ProductListProps {
  categoryId: string
}

const ProductList = ({ categoryId }: ProductListProps) => {
  const [selectedSort, setSelectedSort] = useState('name-asc')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Mock products data - replace with actual API call
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Tiger Hawk Pro Headlamp',
      description: 'Professional grade headlamp with 1000 lumens output, rechargeable battery, and multiple lighting modes.',
      image: '/hero-section-image.jpg',
      price: '$89.99',
      category: 'Indoor'
    },
    {
      id: '2',
      name: 'Outdoor Adventure Flashlight',
      description: 'Waterproof flashlight designed for outdoor activities with 800 lumens and long battery life.',
      image: '/hero-section-image-2.jpg',
      price: '$65.50',
      category: 'Outdoor'
    },
    {
      id: '3',
      name: 'Tactical LED Torch',
      description: 'Military-grade tactical flashlight with strobe function and durable aluminum construction.',
      image: '/camping.jpg',
      price: '$120.00',
      category: 'Tactical'
    },
    {
      id: '4',
      name: 'Emergency Backup Light',
      description: 'Compact emergency light with SOS mode and 72-hour runtime for critical situations.',
      image: '/security-guard-workspace.jpg',
      price: '$45.99',
      category: 'Emergency'
    },
    {
      id: '5',
      name: 'Professional Work Light',
      description: 'High-powered work light with adjustable beam and rugged design for construction sites.',
      image: '/photorealistic-scene-with-warehouse-logistics-operations(1).jpg',
      price: '$150.00',
      category: 'Professional'
    },
    {
      id: '6',
      name: 'Rechargeable Camping Lantern',
      description: 'Portable camping lantern with USB charging and multiple brightness levels.',
      image: '/side-view-woman-holding-flashlight.jpg',
      price: '$75.25',
      category: 'Camping'
    },
    {
      id: '7',
      name: 'Compact Pocket Light',
      description: 'Ultra-compact flashlight perfect for everyday carry with 500 lumens output.',
      image: '/Bike_Lights_On_Mountain_Mobile_3024x.png',
      price: '$35.00',
      category: 'Compact'
    },
    {
      id: '8',
      name: 'Waterproof Dive Light',
      description: 'Professional dive light rated for depths up to 100 meters with 1200 lumens.',
      image: '/portrait-scuba-diver-sea-water-with-marine-life.jpg',
      price: '$200.00',
      category: 'Waterproof'
    }
  ]

  // Get unique categories for filter
  const categories = useMemo(() => {
    return [...new Set(mockProducts.map(product => product.category))]
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    switch (selectedSort) {
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')))
      case 'price-desc':
        return filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')))
      case 'newest':
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      case 'popular':
        // Mock popularity - in real app, this would be based on sales/views
        return filtered.sort((a, b) => Math.random() - 0.5)
      default:
        return filtered
    }
  }, [mockProducts, selectedCategory, selectedSort])

  return (
    <div className="bg-white">
      <div className="wrapper py-16">
        <p className='text-black font-bold text-[30px]'>COLLECTION</p>
        {/* Filter Section */}
        <ProductFilter
          selectedSort={selectedSort}
          selectedCategory={selectedCategory}
          onSortChange={setSelectedSort}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList 