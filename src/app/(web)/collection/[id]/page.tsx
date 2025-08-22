'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { useGetMainCategoriesQuery, useGetSubCategoriesQuery } from '@/lib/redux/apiSlice'
import { setMainCategories, setSubCategories } from '@/lib/redux/slices/categorySlice'
import Image from 'next/image'
import ProductList from './components/ProductList'
import GallerySection from '../../components/GallerySection'
import VideoSection from '../../components/VideoSection'

const CollectionPage = () => {
  const params = useParams()
  const categoryId = params.id as string
  const dispatch = useDispatch()

  console.log("categoryId",categoryId)
  // Get categories from Redux store
  const { mainCategories, subCategories } = useSelector((state: any) => state.category)
  
  // Fetch categories if not in store
  const { data: categoriesData, isLoading: mainCategoriesLoading } = useGetMainCategoriesQuery(undefined)
  
  // Fetch subcategories for the current main category
  const { data: subCategoriesData, isLoading: subCategoriesLoading } = useGetSubCategoriesQuery(undefined)

  // Update Redux store when main categories data is fetched
  useEffect(() => {
    if (categoriesData?.data && mainCategories.length === 0) {
      dispatch(setMainCategories(categoriesData.data))
    }
  }, [categoriesData, mainCategories, dispatch])

  // Update Redux store when subcategories data is fetched
  useEffect(() => {
  console.log("subCategoriesData",subCategoriesData?.data)
    if (subCategoriesData?.data && subCategories.length === 0) {
      dispatch(setSubCategories(subCategoriesData?.data))
    }
  }, [subCategoriesData, subCategories, dispatch])

  // Find the current category
  const currentCategory = mainCategories?.find((cat: any) => cat.id.toString() === categoryId)

  console.log("currentCategory",mainCategories)
  // Filter subcategories for the current main category
  const currentSubCategories = subCategories?.filter((sub: any) => 
    sub.main_category_id.toString() === categoryId
  ) || []
console.log("currentSubCategories",currentSubCategories)  
  // Category data
  const categoryData = {
    id: categoryId,
    name: currentCategory?.name || 'COLLECTION',
    image: currentCategory?.image || '/hero-section-image.jpg',
    description: 'Explore our premium collection of lighting solutions designed for professionals and enthusiasts alike.',
    banner: currentCategory?.banner || '/hero-section-image.jpg'
  }

  if (mainCategoriesLoading || subCategoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading category...</p>
      </div>
    )
  }

  return (
    <>
      <section className=" text-white">
        {/* Banner Section */}
        <div className="relative w-full h-[300px] overflow-hidden ">
          <img
            src={categoryData.banner}
            alt={categoryData.name}
            className="object-center"
            
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Category Name - Left Center */}
          <div className="absolute  w-full top-1/2 transform -translate-y-1/2">
            <h1 className="text-4xl wrapper  md:text-[60px] font-black tracking-tight text-white">{categoryData.name}
            </h1>
            <p className='text-white text-[15px] wrapper'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        {/* Subcategories Section */}
        <div className=" text-black">
          <div className="wrapper py-16">
            <h2 className="text-[40px] font-bold  mb-12">USAGE</h2>
            
            <div className="grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentSubCategories.map((subcategory: any) => (
                <div
                  key={subcategory.id}
                  className="relative cursor-pointer"
                >
                  <div className="absolute bottom-5 text-black font-bold flex justify-center w-full text-center py-3">
                    <div className="relative flex justify-center items-center opacity-60 bg-white w-full h-[50px]">
                    </div>
                    <p className="absolute w-full h-[50px] transition-all duration-300 flex items-center justify-center hover:bg-blue-800 hover:text-white">
                      {subcategory.name}
                    </p>
                  </div>
                  
                  {subcategory.image && (
                    <img 
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="object-cover object-center h-[400px] w-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <ProductList categoryId={categoryId} />

        
      </section>
      <GallerySection/>
        <VideoSection/>
    </>
  )
}

export default CollectionPage
