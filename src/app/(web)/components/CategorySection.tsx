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
    // if (isLoading) {
    //     return (
    //         <div className="wrapper mt-20">
    //             <div className="grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    //                 {Array.from({ length: 5 }).map((_, idx) => (
    //                     <div
    //                         key={idx}
    //                         className="flex flex-col items-center bg-white rounded-[25px] shadow-md p-4"
    //                     >
    //                         <div className="w-full h-[300px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 rounded-[20px] mb-6 animate-pulse" />
    //                         <div className="w-2/3 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
    //                         <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    if (error) {
        return (
            <div className="flex justify-center mt-20">
                <p className="text-lg text-red-600">Failed to load categories</p>
            </div>
        )
    }

    return (    
        <div suppressHydrationWarning className='min-h-[100vh]'>
            <div className='wrapper'>
                  <p className='flex mt-20 text-[50px] font-bold '>OUR COLLECTION</p>
            <p className='flex text-gray-500  text-[13px]'>
                Discover our extensive collection of premium lighting solutions, thoughtfully designed to illuminate every aspect of your journey. 
            </p>
            </div>
          
{isLoading ? (
    <div className="wrapper mt-20">
                <div className="grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center bg-white rounded-[25px] shadow-md p-4"
                        >
                            <div className="w-full h-[300px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 rounded-[20px] mb-6 animate-pulse" />
                            <div className="w-2/3 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                            <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
):(
    <div className='grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 wrapper mb-10 gap-5 mt-20'>
            {mainCategories?.data?.map((category: any) => (
                <Link href={`/collection/${category.id}`} key={category.id}>
                <div
                    key={category.id}
                    className="relative cursor-pointer"
                >
                   
                       
                    {category.image && (
                        <img 
                            src={category.image}
                            alt={category.name}
                            className=" object-cover  object-center h-[400px] rounded-[25px]"
                            width={400}
                            height={400}
                        />
                    )}
                    
                    
                     <div className=' ' >
                        <div className=' '>
                            <p className=' w-full mt-5 text-[25px] font-bold transition-all duration-300 flex '>{category.name}</p>
                        <p className='text-[14px] text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit accusamus voluptate sapiente laboriosam suscipit.</p>

                        </div> 
                       
                    </div>
                </div>
                </Link>
            ))}
            </div>
)}

            

        </div>
  
)}

export default CategorySection