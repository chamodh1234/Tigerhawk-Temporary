'use client'
import React, { useEffect } from 'react'
import { useGetMainCategoriesQuery } from '@/lib/redux/apiSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setMainCategories } from '@/lib/redux/slices/categorySlice'

const CategorySection = () => {
    const { data: mainCategories, isLoading, error } = useGetMainCategoriesQuery(undefined)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMainCategories(mainCategories?.data))
    }, [mainCategories])
    if (isLoading) {
        return (
            <div className="flex justify-center mt-20">
                <p className="text-lg">Loading categories...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center mt-20">
                <p className="text-lg text-red-600">Failed to load categories</p>
            </div>
        )
    }

    return (    
        <>
            <p className='flex justify-center mt-20 text-[40px] font-bold'>THE PURPOSE OF US</p>

            <div className='grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 wrapper mb-10 gap-3 mt-20'>
            {mainCategories?.data?.map((category: any) => (
                <Link href={`/collection/${category.id}`} key={category.id}>
                <div
                    key={category.id}
                    className="relative cursor-pointer"
                >
                    <div className='absolute bottom-5 text-black font-bold flex justify-center w-full text-center py-3' >
                        <div className='relative flex justify-center items-center opacity-60 bg-white w-full h-[50px]  cursor-pointer'>
                           
                        </div> 
                        <p className='absolute w-full h-[50px] transition-all duration-300 flex items-center justify-center hover:bg-blue-800 hover:text-white '>{category.name}</p>

                    </div>
                       
                    {category.image && (
                        <img 
                            src={category.image}
                            alt={category.name}
                            className=" object-cover  object-center h-[400px]"
                            width={400}
                            height={400}
                        />
                    )}
                    
                    
                    
                </div>
                </Link>
            ))}
            </div>

        </>
  
)}

export default CategorySection