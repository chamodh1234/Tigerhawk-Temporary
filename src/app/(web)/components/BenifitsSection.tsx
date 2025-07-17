import React from 'react'
import Image1 from '@/public/hero-section-image.jpg'
import Image2 from '@/public/camping.jpg'
import Image3 from '@/public/man-walking-with-lantern-woods.jpg'
import Image4 from '@/public/seeking-your-input-for-our-upcoming-ec500-long-range-v0-o2otujj0c6zc1.png'
import Image5 from '@/public/side-view-woman-holding-flashlight.jpg'
import Image6 from '@/public/s-l1200.jpg'
import Image from 'next/image'

const Categories = [
    {
        name: 'Camping',
        image: Image1,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image2,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image3,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image4,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image5,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
    {
        name: 'Camping',
        image: Image6,
        description: "Tiger Hawk torches are built to outlast the cheap ones — not just in battery life, but in total lifespan. When you buy from us, you’re investing in a product that won’t let you down a few months in. You save money in the long run because you’re not constantly replacing broken lights or spending on batteries. You’re choosing quality, reliability, and peace of mind — all backed by a warranty. It's one smart buy that keeps delivering value every time you switch it on.",
    },
   
   
    
    
    
    
]

const BeniftsSection = () => {
    return (    
        <>
            <p className='flex justify-center mt-20 text-[40px] font-bold'>BENIFITS THAT YOU GET</p>

            <div className='grid w-full xl:max-w-[1200px] xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 wrapper mb-10 gap-3 mt-20 '>
            {Categories.map((category) => (
                <div
                    key={category.name}
                    className="relative group w-full h-[600px] overflow-hidden"
                >
                    {category.image && (
                        <Image 
                            src={category?.image}
                            alt={category.name}
                            className="object-cover object-top w-full h-full"
                            fill
                            
                        />
                    )}
                    <div className="absolute bottom-0 left-0 w-full">
                        <div
                            className="
                                relative
                                flex
                                justify-center
                                items-end
                                bg-white
                                opacity-60
                                w-full
                                h-[70px]
                                group-hover:h-[600px]
                                transition-all
                                duration-700
                                cursor-pointer
                                overflow-hidden
                            "
                        >
                            <p
                                className="
                                    w-full
                                    text-[20px]
                                    font-bold
                                    text-black
                                    opacity-100
                                    group-hover:text-white
                                    group-hover:bg-blue-800
                                    transition-all
                                    duration-300
                                    flex
                                    items-center
                                    justify-center
                                    h-full
                                "
                            >
                                {category.name}
                            </p>
                            <span
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    w-full
                                    px-4
                                    py-6
                                    text-[16px]
                                    text-black
                                    opacity-0
                                    group-hover:opacity-100
                                    group-hover:text-black
                                    group-hover:bg-white
                                    transition-all
                                    duration-500
                                    h-full
                                    flex
                                   items-center
                                    justify-center
                                    text-justify
                                    
                                "
                            >
                                {category.description}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        </>
  
)}

export default BeniftsSection