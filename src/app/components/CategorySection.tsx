import React from 'react'
import Camping from '@/public/camping.jpg'
import Security from '@/public/security-guard-workspace.jpg'
import Emergency from '@/public/side-view-woman-holding-flashlight.jpg'
import Construction from '@/public/photorealistic-scene-with-warehouse-logistics-operations(1).jpg'
import Riding from '@/public/Bike_Lights_On_Mountain_Mobile_3024x.png'
import Diving from '@/public/portrait-scuba-diver-sea-water-with-marine-life.jpg'
import Medical from '@/public/optometry-consultation-medical-office-with-indian-expert.jpg'
import Repairs from '@/public/s-l1200.jpg'
import Fishing from '@/public/Ledlenser-HF8R-SIGNATURE-Rechargeable-Head-Torch-2.png'
import NightSearch from '@/public/seeking-your-input-for-our-upcoming-ec500-long-range-v0-o2otujj0c6zc1.png'
import Image from 'next/image'

const Categories = [
    {
        name: 'Camping',
        image: Camping,
    },
    {
        name: 'Security',
        image: Security,
    },
    {
        name: 'Emergency',
        image: Emergency,
    },
    {
        name: 'Construction',
        image: Construction,
    },
    {
        name: 'Riding',
        image: Riding,
    },
    {
        name: 'Diving',
        image: Diving,
    }, 
    {
        name: 'Medical',
        image: Medical,
    },
    {
        name: 'Repairs',
        image: Repairs,
    },
    {
        name: 'Fishing',
        image: Fishing,
    },
    {
        name: 'Night Search',
        image: NightSearch,
    },
    
    
    
    
]

const CategorySection = () => {
    return (    
        <>
            <p className='flex justify-center mt-20 text-[40px] font-bold'>THE PURPOSE OF US</p>

            <div className='grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 wrapper mb-10 gap-3 mt-20'>
            {Categories.map((category) => (
                <div
                    key={category.name}
                    className="relative"
                >
                    <div className='absolute bottom-5 text-black font-bold flex justify-center w-full text-center py-3' >
                        <div className='relative flex justify-center items-center opacity-60 bg-white w-full h-[50px]  cursor-pointer'>
                           
                        </div> 
                        <p className='absolute w-full h-[50px] transition-all duration-300 flex items-center justify-center hover:bg-blue-800 hover:text-white '>{category.name}</p>

                    </div>
                       
                    {category.image && (
                        <Image 
                     src={category?.image}
                   
                       
                        alt={category.name}
                        className=" object-cover  object-center h-[400px]"
                    />
                    )}
                    
                    
                    
                </div>
            ))}
            </div>

        </>
  
)}

export default CategorySection