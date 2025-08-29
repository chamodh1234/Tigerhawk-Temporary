'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaFilter, FaLightbulb, FaTree, FaMountain, FaShieldAlt, FaStar } from 'react-icons/fa'
import { useGetProductImagesForGalleryQuery } from '@/lib/redux/apiSlice'

// Dummy product gallery data
const galleryData = {
  categories: [
    { id: 'all', name: 'All Products', icon: FaStar, count: 0 },
    { id: 'torches', name: 'LED Torches', icon: FaLightbulb, count: 0 },
    { id: 'camping', name: 'Camping Gear', icon: FaTree, count: 0 },
    { id: 'outdoor', name: 'Outdoor Equipment', icon: FaMountain, count: 0 },
    { id: 'safety', name: 'Safety Equipment', icon: FaShieldAlt, count: 0 }
  ],
  products: [
    {
      id: 1,
      name: 'Tiger Hawk Pro LED Torch',
      category: 'torches',
      images: [
        '/hero-section-image.jpg',
        '/hero-section-image-2.jpg',
        '/camping.jpg',
        '/closeup-gas-lamp-tent-nature.jpg'
      ],
      description: 'Professional-grade LED torch with advanced features'
    },
    {
      id: 2,
      name: 'Adventure Camping Lantern',
      category: 'camping',
      images: [
        '/man-walking-with-lantern-woods.jpg',
        '/side-view-woman-holding-flashlight.jpg',
        '/side-view-woman-with-head-lantern.jpg'
      ],
      description: 'Portable camping lantern for outdoor adventures'
    },
    {
      id: 3,
      name: 'Mountain Safety Light',
      category: 'safety',
      images: [
        '/portrait-scuba-diver-sea-water-with-marine-life.jpg',
        '/hero-section-image.jpg',
        '/camping.jpg'
      ],
      description: 'High-visibility safety light for mountain activities'
    },
    {
      id: 4,
      name: 'Outdoor Explorer Kit',
      category: 'outdoor',
      images: [
        '/hero-section-image-2.jpg',
        '/closeup-gas-lamp-tent-nature.jpg',
        '/man-walking-with-lantern-woods.jpg'
      ],
      description: 'Complete outdoor lighting solution'
    },
    {
      id: 5,
      name: 'Emergency Rescue Light',
      category: 'safety',
      images: [
        '/side-view-woman-holding-flashlight.jpg',
        '/side-view-woman-with-head-lantern.jpg',
        '/portrait-scuba-diver-sea-water-with-marine-life.jpg'
      ],
      description: 'Emergency lighting for rescue operations'
    },
    {
      id: 6,
      name: 'Wilderness Survival Torch',
      category: 'torches',
      images: [
        '/camping.jpg',
        '/hero-section-image.jpg',
        '/hero-section-image-2.jpg'
      ],
      description: 'Durable torch for wilderness survival'
    }
  ]
}

// Calculate category counts
galleryData.categories.forEach(category => {
  if (category.id === 'all') {
    category.count = galleryData.products.length
  } else {
    category.count = galleryData.products.filter(product => product.category === category.id).length
  }
})

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { data: productImages, isLoading, error, refetch } = useGetProductImagesForGalleryQuery(undefined)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el
  }

  useEffect(() => {
    console.log(productImages)
   !isLoading && setCategories(productImages?.categories)
    if (selectedCategory === 'all') {
     !isLoading && setFilteredProducts(productImages?.data)
    } else {
      !isLoading && setFilteredProducts(productImages?.data.filter((product: any) => product.category === selectedCategory))
    }
  }, [selectedCategory, isLoading])

  const openLightbox = (image: string, product: any, imageIndex: number) => {
    setLightboxImage(image)
    setCurrentProduct(product)
    setLightboxIndex(imageIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage('')
    setCurrentProduct(null)
  }

  const nextImage = () => {
    if (currentProduct) {
      const nextIndex = (lightboxIndex + 1) % currentProduct.images.length
      setLightboxImage(currentProduct.images[nextIndex])
      setLightboxIndex(nextIndex)
    }
  }

  const prevImage = () => {
    if (currentProduct) {
      const prevIndex = lightboxIndex === 0 ? currentProduct.images.length - 1 : lightboxIndex - 1
      setLightboxImage(currentProduct.images[prevIndex])
      setLightboxIndex(prevIndex)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxOpen) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxIndex, currentProduct])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-200 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/hero-section-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce mb-8">
            <FaSearch className="h-20 w-20 text-yellow-400 mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Product Gallery
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Explore our comprehensive collection of high-quality lighting solutions and outdoor equipment.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="categories" ref={setRef('categories')} className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Filter through our products to find exactly what you're looking for.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${isVisible['categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <button onClick={() => setSelectedCategory('all')} className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === 'all'
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-300'
                }`}>
                <span className="font-semibold">All</span>
               
            </button>
            {categories.map((category: any, index: number) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-300'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
               
                <span className="font-semibold">{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-white text-yellow-500'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section id="gallery" ref={setRef('gallery')} className="py-16 bg-gradient-to-r from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible['gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredProducts.map((product: any, productIndex: number) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden"
                style={{ animationDelay: `${productIndex * 150}ms` }}
              >
                {/* Product Images Grid */}
                <div className="relative h-64 overflow-hidden">
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {product.images.slice(0, 4).map((image: any, imageIndex: number) => (
                      <div
                        key={imageIndex}
                        className={`relative overflow-hidden cursor-pointer ${
                          imageIndex === 0 ? 'col-span-2 row-span-2' : 'col-span-1'
                        }`}
                        onClick={() => openLightbox(image, product, imageIndex)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - Image ${imageIndex + 1}`}
                          
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        {imageIndex === 3 && product.images.length > 4 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{product.images.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Overlay with product info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      {/* <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{product.description}</p> */}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }}>
                   
                  </p>
                  
                  {/* Image Count and View Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {product.images.length} images
                    </span>
                    <button
                      onClick={() => openLightbox(product.images[0], product, 0)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors transform hover:scale-105"
                    >
                      View Gallery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <FaSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new products.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-yellow-400 transition-colors"
            >
              <FaTimes className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-yellow-400 transition-colors"
            >
              <FaChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-yellow-400 transition-colors"
            >
              <FaChevronRight className="h-8 w-8" />
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={lightboxImage}
                alt={`${currentProduct?.name} - Image ${lightboxIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Product Info */}
            {currentProduct && (
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{currentProduct.name}</h3>
                <p
                  className={`text-lg opacity-90 ${isVisible[`desc-${currentProduct.id}`] ? '' : 'line-clamp-2'}`}
                  dangerouslySetInnerHTML={{ __html: currentProduct.description }}
                  id={`desc-${currentProduct.id}`}
                />
                {currentProduct.description && currentProduct.description.length > 0 && (
                  <button
                    className="mt-2 text-yellow-400 hover:underline text-sm font-semibold"
                    onClick={() =>
                      setIsVisible((prev) => ({
                        ...prev,
                        [`desc-${currentProduct.id}`]: !prev[`desc-${currentProduct.id}`],
                      }))
                    }
                    aria-expanded={!!isVisible[`desc-${currentProduct.id}`]}
                    aria-controls={`desc-${currentProduct.id}`}
                  >
                    {isVisible[`desc-${currentProduct.id}`] ? 'Read less' : 'Read more'}
                  </button>
                )}
                <p className="text-sm opacity-75 mt-2">
                  Image {lightboxIndex + 1} of {currentProduct.images.length}
                </p>
              </div>
            )}

            {/* Thumbnail Navigation */}
            {currentProduct && (
              <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex space-x-2">
                {currentProduct.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setLightboxImage(image)
                      setLightboxIndex(index)
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === lightboxIndex
                        ? 'border-yellow-400 scale-110'
                        : 'border-white/50 hover:border-white'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  )
}

export default GalleryPage
