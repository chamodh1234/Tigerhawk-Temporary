'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { useGetProductsQuery } from '@/lib/redux/apiSlice'
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
  const [isProducts, setIsProducts] = useState(false)
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0
  })
  // Get products from API
  const { data: apiProducts, isLoading, error } = useGetProductsQuery({})

  // Transform API data to match component interface
  const transformedProducts: any[] = useMemo(() => {
    if (!apiProducts?.data) return []
    return apiProducts.data
    .filter((product: any) => Number(product.main_category?.id) === Number(categoryId))
    .map((product: any) => ({
      id: product.id || product.product_id,
      name: product.name,
      description: product.description,
      image: product.images?.[0] ? product.images[0] : '/hero-section-image.jpg', // Fallback image
      price: `$${product.price}`,
      category: product.sub_category?.name || 'Uncategorized'
    }))
  }, [apiProducts])

  useEffect(() => {
    if (transformedProducts.length > 0) {
      setIsProducts(true)
    }else{
      setIsProducts(false)
    }
  }, [transformedProducts])
  
  // Get unique categories for filter
  const categories = useMemo(() => {
    return [...new Set(transformedProducts.map(product => product.category))]
  }, [transformedProducts])
console.log("categories", transformedProducts)
  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = transformedProducts

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    //Filter by price range
    if (priceRange.min > 0 || priceRange.max > 0) {
    if (priceRange.min > 0 && priceRange.max === 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace('$', ''))
        return price >= priceRange.min
      })
    } else if (priceRange.min === 0 && priceRange.max > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace('$', ''))
        return price <= priceRange.max
      })
    } else if (priceRange.min > 0 && priceRange.max > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace('$', ''))
        return price >= priceRange.min && price <= priceRange.max
      })
    }
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
  }, [transformedProducts, selectedCategory, selectedSort, priceRange])

  console.log("transformedProducts", transformedProducts)
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="wrapper py-16">
          <p className='text-black font-bold text-[30px]'>COLLECTION</p>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white">
        <div className="wrapper py-16">
          <p className='text-black font-bold text-[30px]'>COLLECTION</p>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading products. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  if(!isProducts){
    return (
      <div className="bg-white">
        <div className="wrapper py-16">
          <p className='text-black font-bold text-[30px]'>COLLECTION</p>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">No products found matching your criteria.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="wrapper py-16">
        <p className='text-black font-bold text-[50px]'>Product Collection</p>
        <p className='text-gray-500 text-[15px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sint quis inventore, eligendi totam magnam quam non ratione.</p>
        {/* Filter Section */}
        {/* <ProductFilter
          selectedSort={selectedSort}
          selectedCategory={selectedCategory}
          onSortChange={setSelectedSort}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          priceRange={setPriceRange}
        /> */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-15">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product?.image || []}
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