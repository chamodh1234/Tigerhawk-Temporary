import React from 'react'
import Trusted from '@/public/trust.png'
import RenewableEnergy from "@/public/renewable-energy.png"
import UserFriendlyProduct from '@/public/new-product.png'
import Premium from '@/public/diamond.png'
import Calendar from '@/public/calendar.png'
import Image from 'next/image'

const Responsible = () => {
  return (
    <>
      <section className="bg-black text-white">
        {/* Hero Header */}
        <div className="bg-black p-12 md:p-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-[60px] font-black text-center mb-4 tracking-tight">
              WHO RESPONSIBLE FOR TIGER HAWK
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 text-center max-w-4xl mx-auto font-light">
              We are the passionate team behind Tiger Hawk, dedicated to illuminating your world with innovative lighting solutions.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 bg-black text-white">
                <div className="w-16 h-16 bg-white/20 rounded-none flex items-center justify-center mb-8">
                  <Image src={Trusted} alt='Our Mission' className='w-10 h-10'/>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Our Mission</h3>
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                  We are dedicated to providing innovative lighting solutions that enhance safety and reliability in every situation. Our commitment to quality and performance drives everything we do.
                </p>
              </div>
              <div className="p-12 md:p-20 bg-gray-50">
                <h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Lighting the Way Forward</h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Every product we create is designed with a purpose - to make your world brighter, safer, and more reliable. We push the boundaries of what's possible in lighting technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 bg-gray-50 text-black">
                <h4 className="text-2xl md:text-3xl font-bold mb-6">Expert Craftsmanship</h4>
                <p className="text-black text-lg leading-relaxed">
                  Our diverse team brings together decades of experience in lighting technology, design, and engineering. We're united by a passion for excellence.
                </p>
              </div>
              <div className="p-12 md:p-20 bg-black">
                <div className="w-16 h-16 bg-white/20 rounded-none flex items-center justify-center mb-8">
                  <Image src={Calendar} alt='Our Team' className='w-10 h-10'/>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Our Team</h3>
                <p className="text-lg md:text-xl text-green-100 leading-relaxed">
                  A passionate group of engineers, designers, and lighting experts who work tirelessly to create products that exceed expectations and deliver exceptional value to our customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-12 md:p-16 bg-gray-50 border-r border-gray-200">
                <div className="w-14 h-14 bg-purple-500 rounded-none flex items-center justify-center mb-6">
                  <Image src={Premium} alt='Our Values' className='w-8 h-8'/>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-700 text-lg">
                  Integrity, innovation, and customer satisfaction are at the core of our business. We believe in creating products that not only meet but exceed the highest standards of quality.
                </p>
              </div>

              <div className="p-12 md:p-16 bg-white border-r border-gray-200">
                <div className="w-14 h-14 bg-orange-500 rounded-none flex items-center justify-center mb-6">
                  <Image src={UserFriendlyProduct} alt='Our Commitment' className='w-8 h-8'/>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Commitment</h3>
                <p className="text-gray-700 text-lg">
                  We are committed to continuous improvement and innovation. Every product we create is designed with the user in mind, ensuring reliability, durability, and ease of use.
                </p>
              </div>

              <div className="p-12 md:p-16 bg-gray-50">
                <div className="w-14 h-14 bg-red-500 rounded-none flex items-center justify-center mb-6">
                  <Image src={RenewableEnergy} alt='Our Future' className='w-8 h-8'/>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Future</h3>
                <p className="text-gray-700 text-lg">
                  We envision a future where our lighting solutions contribute to a safer, more sustainable world. We're constantly exploring new technologies and possibilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsibility Section */}
        <div className="bg-indigo-700 text-white">
          <div className="max-w-7xl mx-auto p-12 md:p-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-none flex items-center justify-center mx-auto mb-8">
                <Image src={Trusted} alt='Our Responsibility' className='w-12 h-12'/>
              </div>
              <h3 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">Our Responsibility</h3>
              <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed max-w-4xl mx-auto font-light">
                As industry leaders, we take responsibility for setting standards in quality, safety, and environmental sustainability. 
                We're accountable to our customers, employees, and the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Responsible 