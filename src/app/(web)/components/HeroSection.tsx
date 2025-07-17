import React from 'react'
import HeroImage from '@/public/hero-section-image-2.jpg'
import TigerImage from '@/public/amazing-bengal-tiger-nature(1).jpg'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <>
            <section className=" text-white flex justify-center overflow-hidden">
                <Image src={HeroImage} alt='Hero-section Background Image' className='h-[85vh] object-cover   [object-position:0px_-60px] ' />
                <div className="wrapper flex w-full absolute md:mt-[200px] mt-[100px] ">
                    <div className='warpper w-full flex flex-col items-center md:items-start'>
                        <h1 className="text-4xl md:text-[80px] text-[60px]  font-bold mb-6 flex justify-center md:justify-start text-center md:text-start">
                            Light Your Path  <br />with Precision
                        </h1>
                        <p className="text-xl mb-8 max-w-lg md:max-w-xl text-center md:text-start flex justify-center  text-[15px]">
                            Illuminate your adventures with Tiger Hawk's advanced lighting solutions.
                            Trusted performance for every step of your journey.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 ">
                            <button className="px-8 py-3 text-white bg-blue-600 cursor-pointer hover:bg-emerald-400  duration-300 font-semibold  transition-colors">
                                Shop Now
                            </button>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection