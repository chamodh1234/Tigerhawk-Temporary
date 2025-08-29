'use client'
import React, { useRef, useState } from 'react'
import Trusted from '@/public/trust.png'
import RenewableEnergy from '@/public/renewable-energy.png'
import UserFriendlyProduct from '@/public/new-product.png'
import Premium from '@/public/diamond.png'
import Calendar from '@/public/calendar.png'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface Feature {
  image: any
  title: string
  description: string
  alt: string
}

const features: Feature[] = [
  {
    image: Trusted,
    title: 'Trusted Performance, Every Time',
    description:
      'Our torches are built to deliver consistent brightness and reliability, even in extreme conditions. Whether you’re on a trail, in a blackout, or at work — Tiger Hawk torches shine when others fail.',
    alt: 'Trusted Performance, Every Time',
  },
  {
    image: Calendar,
    title: 'Engineered for Everyday & Emergency Use',
    description:
      'From casual dog walks to critical rescue situations, Tiger Hawk designs each product with durability and versatility in mind. One torch, endless uses — no compromises.',
    alt: 'Engineered for Everyday & Emergency Use',
  },
  {
    image: Premium,
    title: 'Premium Build Quality That Lasts',
    description:
      'Crafted with aerospace-grade aluminum and water-resistant sealing, our torches are made to endure years of heavy use without losing performance or comfort.',
    alt: 'Premium Build Quality That Lasts',
  },
  {
    image: UserFriendlyProduct,
    title: 'Smart, User-Friendly Design',
    description:
      'Simple interfaces, ergonomic grips, and handy modes (like zoom or SOS) make Tiger Hawk torches incredibly easy to use, even for beginners or in high-stress moments.',
    alt: 'Smart, User-Friendly Design',
  },
  {
    image: RenewableEnergy,
    title: 'Rechargeable & Cost-Effective',
    description:
      'Say goodbye to constant battery purchases. Our energy-efficient rechargeable models reduce long-term costs and are eco-friendly too.',
    alt: 'Rechargeable & Cost-Effective',
  },
]

const TigerhawkSection = () => {
  const [current, setCurrent] = useState(0)
  const visibleCount = 3

  function handlePrev() {
    if (current > 0) setCurrent(current - 1)
  }

  function handleNext() {
    if (current < features.length - visibleCount) setCurrent(current + 1)
  }

  return (
    <section className='py-16  relative overflow-hidden'>
      <h2 className='text-[60px] font-bold text-center'>TIGER HAWK</h2>
      <div className='flex items-center justify-center'>
        <p className='text-center text-gray-500 text-[14px] mb-12 w-1/2'>
          Tiger Hawk is a brand that offers a range of products, including torches, flashlights, and other outdoor gear. The company is known for its high-quality products and its commitment to sustainability.
        </p>
      </div>

      <div className='flex items-center justify-center w-full'>
        <div className='relative w-full px-10 flex items-center'>
          <Carousel className='w-full'>
            {/* Carousel Arrows - always visible, balanced left/right */}
            <div className='absolute left-0 ms-10 top-1/2 -translate-y-1/2 z-20 flex items-center'>
              <CarouselPrevious />
            </div>
            <div className='absolute right-0 me-10 top-1/2 -translate-y-1/2 z-20 flex items-center'>
              <CarouselNext className='' />
            </div>
            <div className='px-2 sm:px-6 md:px-10  lg:px-16 w-full'>
              <CarouselContent className='flex gap-2 w-full'>
                {features.map((feature, idx) => (
                  <CarouselItem
                    key={feature.title}
                    className={`
                      p-3 h-[400px]
                      basis-full
                      sm:basis-1/2
                      lg:basis-1/3
                      flex-shrink-0
                      transition-all
                      px-10
                      
                    `}
                  >
                    <div className='relative border-2 border-gray-200 text-center rounded-xl justify-center shadow-md p-6 h-full flex flex-col items-center overflow-hidden bg-gradient-to-t from-yellow-300 via-white to-transparent'>
                      {/* <Image src={feature.image} alt={feature.alt} className='w-[50px] h-[50px]' /> */}
                      <h3 className='text-xl font-semibold mb-2 z-20'>{feature.title}</h3>
                      <p className='text-gray-500 text-[14px] mt-5 z-20'>{feature.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default TigerhawkSection