import React from 'react'
import HeroImage from '@/public/hero-section-image-2.jpg'
import TigerImage from '@/public/amazing-bengal-tiger-nature(1).jpg'
import Image from 'next/image'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const HeroSection = () => {
    return (
        <>
            <section className=" text-black flex h-[100vh] justify-center overflow-hidden">
                {/* <Image src={HeroImage} alt='Hero-section Background Image' className='h-[85vh] object-cover   [object-position:0px_-60px] ' /> */}
                <div className="wrapper flex w-full justify-center md:mt-[200px] mt-[100px] ">
                    <div className='warpper  flex flex-col items-center md:items-start'>
                        <h1 className="text-4xl hidden md:text-[80px] text-[60px]  font-bold mb-6 md:flex flex-col justify-center md:justify-start text-center md:text-start">
                            Light Your Path  <br /> <span className='text-yellow-500 text-center'>with Precision</span>
                        </h1>
                        <h1 className="text-4xl  text-[60px]  font-bold mb-6 md:hidden flex flex-col justify-center md:justify-start text-center md:text-start">
                            Light Your Path with <span className="text-yellow-500">Precision</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-lg md:max-w-xl text-center md:text-center flex justify-center  text-[15px]">
                            Illuminate your adventures with Tiger Hawk's advanced lighting solutions.
                            Trusted performance for every step of your journey.
                        </p>
                        <div className="flex flex-col w-full justify-center sm:flex-row gap-4 ">
                            <button className="px-8 py-3 text-gray-600  justify-center flex items-center gap-2 cursor-pointer duration-300 font-semibold  transition-colors">
                               <FaMagnifyingGlass size={20} className='me-3'  /> Search more
                            </button>

                        </div>
                    </div>
                </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
                <span
                    aria-label="Scroll down"
                    role="img"
                    className="animate-bounce"
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-700 dark:text-gray-200"
                        aria-hidden="true"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
                <span className="sr-only">Scroll down</span>
            </div>
            </section>
        </>
    )
}

export default HeroSection