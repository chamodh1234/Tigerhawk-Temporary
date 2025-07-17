import React from 'react'
import Trusted from '@/public/trust.png'
import RenewableEnergy from "@/public/renewable-energy.png"
import UserFriendlyProduct from '@/public/new-product.png'
import Premium from '@/public/diamond.png'
import Calendar from '@/public/calendar.png'
import Image from 'next/image'

const TigerhawkSection = () => {
  return (
    <>
       <section className="py-16 bg-gray-50">
          <div className="wrapper">
            <h2 className="text-[60px] font-bold text-center mb-12">TIGER HAWK</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-400  flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl"><Image src={Trusted} alt='Trusted Performance, Every Time' className='w-[50px] h-[50px]'/></span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted Performance, Every Time</h3>
                <p className="text-gray-600">Our torches are built to deliver consistent brightness and reliability, even in extreme conditions. Whether you’re on a trail, in a blackout, or at work — Tiger Hawk torches shine when others fail.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-fuchsia-400  flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl"><Image src={Calendar} alt='Engineered for Everyday & Emergency Use' className='w-[50px] h-[50px]'/></span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Engineered for Everyday & Emergency Use</h3>
                <p className="text-gray-600"> From casual dog walks to critical rescue situations, Tiger Hawk designs each product with durability and versatility in mind. One torch, endless uses — no compromises.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-400  flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl"><Image src={Premium} alt='Premium Build Quality That Lasts' className='w-[50px] h-[50px]'/></span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Build Quality That Lasts</h3>
                <p className="text-gray-600">Crafted with aerospace-grade aluminum and water-resistant sealing, our torches are made to endure years of heavy use without losing performance or comfort.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-400  flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl"><Image src={UserFriendlyProduct} alt='Smart, User-Friendly Design' className='w-[50px] h-[50px]'/></span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart, User-Friendly Design</h3>
                <p className="text-gray-600">Simple interfaces, ergonomic grips, and handy modes (like zoom or SOS) make Tiger Hawk torches incredibly easy to use, even for beginners or in high-stress moments.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-red-400  flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl"><Image src={RenewableEnergy} alt='Rechargeable & Cost-Effective' className='w-[50px] h-[50px]'/></span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rechargeable & Cost-Effective</h3>
                <p className="text-gray-600"> Say goodbye to constant battery purchases. Our energy-efficient rechargeable models reduce long-term costs and are eco-friendly too.</p>
              </div>
              
            </div>
          </div>
        </section>
    </>
  )
}

export default TigerhawkSection