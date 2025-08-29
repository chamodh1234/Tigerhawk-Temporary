'use client'
import React, { useState, useEffect } from 'react'
import Trusted from '@/public/trust.png'
import RenewableEnergy from "@/public/renewable-energy.png"
import UserFriendlyProduct from '@/public/new-product.png'
import Premium from '@/public/diamond.png'
import Calendar from '@/public/calendar.png'
import Image from 'next/image'
import Vision from '@/public/vision.jpg'
import Responsibility from '@/public/855.jpg'
import logo from '@/public/logo.png'

const Responsible = () => {
  const [selectedMetric, setSelectedMetric] = useState('years')
  const [counts, setCounts] = useState({
    years: 0,
    products: 0,
    customers: 0,
    countries: 0
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSectionInView, setIsSectionInView] = useState(false)
  const [isGrowthSectionInView, setIsGrowthSectionInView] = useState(false)
  const [hasGrowthAnimated, setHasGrowthAnimated] = useState(false)

  const metrics = [
    { id: 'years', name: 'Years of Excellence', target: 25, icon: Calendar },
    { id: 'products', name: 'Products Launched', target: 150, icon: UserFriendlyProduct },
    { id: 'customers', name: 'Happy Customers', target: 10000, icon: Premium },
    { id: 'countries', name: 'Countries Served', target: 45, icon: RenewableEnergy }
  ]

  const selectedMetricData = metrics.find(m => m.id === selectedMetric)

  // Function to animate counting for a specific metric
  const animateMetric = (metricId: string) => {
    const target = metrics.find(m => m.id === metricId)?.target || 0
    setCounts(prev => ({ ...prev, [metricId]: 0 }))
    setIsAnimating(true)

    let currentCount = 0
    const increment = Math.ceil(target / 100)
    const interval = setInterval(() => {
      currentCount += increment
      if (currentCount >= target) {
        currentCount = target
        clearInterval(interval)
        setIsAnimating(false)
      }
      setCounts(prev => ({ ...prev, [metricId]: currentCount }))
    }, 50)
  }

  // Initial animation on component mount
  useEffect(() => {
    animateMetric(selectedMetric)
  }, [])

  // Animate when metric changes
  useEffect(() => {
    if (!isAnimating) {
      animateMetric(selectedMetric)
    }
  }, [selectedMetric])

  // Intersection Observer and Scroll Handler for orbital animation
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('responsible-section')
          if (!section) return

          const rect = section.getBoundingClientRect()
          const windowHeight = window.innerHeight

          // Check if section is in view
          const isInView = rect.top < windowHeight && rect.bottom > 0
          setIsSectionInView(isInView)

          if (isInView) {
            // Calculate scroll progress within the section
            const sectionHeight = rect.height
            const scrollDistance = windowHeight - rect.top
            const progress = Math.max(0, Math.min(1, scrollDistance / (sectionHeight + windowHeight)))

            // Smooth progress calculation
            let adjustedProgress = progress

            // When section bottom approaches viewport bottom, move circles to right side
            if (rect.bottom < windowHeight * 0.8) {
              // Calculate how close we are to the bottom
              const bottomProgress = (windowHeight * 0.8 - rect.bottom) / (windowHeight * 0.8)
              adjustedProgress = 0.5 + (bottomProgress * 0.5) // Move from 0.5 to 1.0
            }

            setScrollProgress(adjustedProgress)
          }

          ticking = false
        })

        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionInView(true)
          } else {
            setIsSectionInView(false)
            setScrollProgress(0)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const section = document.getElementById('responsible-section')
    if (section) {
      observer.observe(section)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  // Separate Intersection Observer for Growth Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasGrowthAnimated) {
            setIsGrowthSectionInView(true)
            setHasGrowthAnimated(true)
            // Trigger counting animation for all metrics
            metrics.forEach(metric => {
              animateMetric(metric.id)
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const growthSection = document.getElementById('growth-section')
    if (growthSection) {
      observer.observe(growthSection)
    }

    return () => {
      if (growthSection) {
        observer.unobserve(growthSection)
      }
    }
  }, [hasGrowthAnimated])

  return (
    <>
      <section className="text-white mt-[150px]">
        {/* Hero Header */}
        <div className="text-black p-12 md:p-20">
          <div className=" mx-auto">
            <h2 className="text-5xl text-black md:text-[55px] font-bold mb-4 tracking-tight">
              ONE GLOBE INDUSTRIES (PVT) LTD
            </h2>
            <p className="text-xl md:text-[14px] text-gray-500  mx-auto">
              We are the passionate team behind Tiger Hawk, dedicated to illuminating your world with innovative lighting solutions.
            </p>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className=" text-black">
          <div className=" mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Mission Box */}

          <div className='rounded-r-full w-[735px] h-[735px] bg-black'>
            <div className='w-[725px] h-[725px] rounded-r-full bg-amber-400 '>
              <Image
              src={Vision}
              alt="Mission Visual"

              className="object-cover rounded-r-full w-[700px] h-[700px]"

            />
            </div>
            
          </div>
            
            <div className="flex flex-col justify-center p-10 md:p-20">
              <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight ">Our Mission</h3>
              <p className="text-lg  text-gray-500 text-[15px] leading-relaxed mb-4">
                We are dedicated to providing innovative lighting solutions that enhance safety and reliability in every situation. Our commitment to quality and performance drives everything we do.
              </p>
              <button className='  mt-10 px-4 py-2 rounded-full w-[250px] border-[1px] border-gray-400'>Read More</button>
            </div>
          </div>
          {/* Vision Box */}
          <div className="justify-between  grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Mission Box */}
            <div className="flex flex-col justify-center p-10 md:p-20">
              <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight ">Our Mission</h3>
              <p className="text-lg  text-gray-500 text-[15px] leading-relaxed mb-4">
                We are dedicated to providing innovative lighting solutions that enhance safety and reliability in every situation. Our commitment to quality and performance drives everything we do.
              </p>
              <button className='  mt-10 px-4 py-2 rounded-full w-[250px] border-[1px] border-gray-400'>Read More</button>
            </div>
            <div className='flex justify-end'>
            <div className='rounded-l-full w-[735px] h-[735px] bg-black flex justify-end'>
            <div className='w-[725px] h-[725px] rounded-l-full bg-amber-400 flex justify-end'>
              <Image
              src={Vision}
              alt="Mission Visual"

              className="object-cover rounded-l-full w-[700px] h-[700px]"

            />
            </div>
            
          </div>
            </div>

          </div>
        </div>

        {/* New Layout: Values on Left, Counting Circle on Right */}
        <div id="responsible-section" className="text-black mt-10">
          <div className="mx-auto">
            <div className="grid relative grid-cols-1 sm:grid-cols-2 items-center justify-center px-5 lg:mx-30">
              {/* Left Side - Values, Commitment, Future */}
              <div className="space-y-8 wrapper gap-6 flex xl:justify-center items-center ">
                <div className=" h-[200px]  w-full xl:w-1/2 rounded-lg">
                  <div className="w-14 h-14 rounded-none flex items-center justify-center mb-6">
                    {/* <Image src={Premium} alt='Our Values' className='w-8 h-8'/> */}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
                  <p className="text-[14px] w-full text-gray-500">
                    Integrity, innovation, and customer satisfaction are at the core of our business. We believe in creating products that not only meet but exceed the highest standards of quality.
                  </p>
                </div>




              </div>

              {/* Right Side - Dynamic Counting Circle */}
              <div className="sm:flex hidden justify-center items-center  z-30 ">
                <div className="relative w-[700px] h-[700px]">
                  {/* Main Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-64 h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl"
                    >
                      <div className="text-center text-white">
                        <div className="text-5xl font-bold mb-2">
                          {counts[selectedMetric as keyof typeof counts].toLocaleString()}+
                        </div>
                        <div className="text-lg font-medium">
                          {selectedMetricData?.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Non-selected Metric Options - Aligned with Main Circle Circumference */}
                  {metrics
                    .filter(metric => metric.id !== selectedMetric)
                    .map((metric, index) => {
                      const mainCircleRadius = 148 // Half of main circle width (256/2)
                      const smallCircleRadius = 32 // Half of small circle width (64/2)
                      const totalRadius = mainCircleRadius + smallCircleRadius + 70 // 20px gap

                      // Calculate positions to align with main circle circumference
                      const angle = (index * 60 - 30) * (Math.PI / 180) // Spread from -30° to +90°
                      const x = Math.cos(angle) * totalRadius
                      const y = Math.sin(angle) * totalRadius

                      return (
                        <div
                          key={metric.id}
                          className="absolute w-[200px] h-[200px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-white hover:bg-blue-50 hover:scale-110 shadow-lg border-2 border-gray-200 hover:border-blue-300"
                          style={{
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center',
                            transform: isSectionInView
                              ? `rotate(${scrollProgress * 360 + (index * 60 + 150)}deg) translateX(${totalRadius}px) rotate(-${scrollProgress * 360 + (index * 60 + 150)}deg)`
                              : `rotate(${index * 60 + 150}deg) translateX(${totalRadius}px) rotate(-${index * 60 + 150}deg)`,
                            transition: 'transform 0.3s linear',
                            marginLeft: '-100px', // Center the circle (half of 200px width)
                            marginTop: '-100px', // Center the circle (half of 200px height)
                          } as React.CSSProperties}
                          onClick={() => setSelectedMetric(metric.id)}
                        >
                          <div className='flex flex-col items-center justify-center'>
                            <Image
                              src={metric.icon}
                              alt={metric.name}
                              className="w-8 h-8 opacity-80"
                            />
                            <p>{metric.name}</p>
                          </div>

                        </div>
                      )
                    })}

                  {/* Metric Names - Positioned near their respective circles */}
                  {metrics
                    .filter(metric => metric.id !== selectedMetric)
                    .map((metric, index) => {
                      const mainCircleRadius = 128
                      const smallCircleRadius = 40 // Updated for larger circles
                      const totalRadius = mainCircleRadius + smallCircleRadius + 70

                      const angle = (index * 60 - 30) * (Math.PI / 180)
                      const x = Math.cos(angle) * totalRadius
                      const y = Math.sin(angle) * totalRadius

                      // Position text slightly outside the circle
                      const textRadius = totalRadius + 70
                      const textX = Math.cos(angle) * textRadius
                      const textY = Math.sin(angle) * textRadius

                      return (
                        <div
                          key={`text-${metric.id}`}
                          className="absolute text-center transition-all duration-300 text-gray-600"
                          style={{
                            left: `calc(50% + ${textX}px - 60px)`,
                            top: `calc(50% + ${textY}px - 20px)`,
                            width: '120px'
                          }}
                        >
                          {/* <div className="text-sm font-medium">{metric.name}</div>
                          <div className="text-lg font-bold">
                            {counts[metric.id as keyof typeof counts].toLocaleString()}+
                          </div> */}
                        </div>
                      )
                    })}
                </div>
              </div>

              <div id="growth-section" className="mt-16 flex md:hidden flex-col items-center">

                <div className="grid grid-cols-2 items-center justify-center md:grid-cols-4 gap-8 w-full max-w-4xl">
                  {metrics.map(metric => (
                    <div key={metric.id} className='flex items-center justify-center'>
                      <div

                        className="flex flex-col items-center  justify-center bg-primary-color rounded-lg w-[200px] h-[200px] shadow-md p-6 transition-all duration-300 hover:scale-105"
                      >
                        <Image
                          src={metric.icon}
                          alt={metric.name}
                          className="w-12 h-12 mb-3 opacity-90"
                        />
                        <div className="text-3xl font-extrabold text-yellow-500 mb-1" aria-live="polite">
                          {counts[metric.id as keyof typeof counts].toLocaleString()}+
                        </div>
                        <div className="text-sm text-gray-700 font-medium text-center">{metric.name}</div>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
                
            {/* Watermark Logo Background */}
            {/* <div className='flex justify-center items-center w-full absolute'>
               <div
              aria-hidden="true"
              className="pointer-events-none w-[610px] h-[610px] bg-black bottom-[-350px]  inset-0 flex items-end  justify-center z-0"
              style={{
                opacity: 0.5,
                
                userSelect: 'none',
              }}
            >
              <Image
                src={logo}
                alt="Watermark Logo"
                className="w-[600px] h-[600px] object-contain select-none"
                draggable={false}
                priority={false}
              />
            </div>
            </div> */}
           

            </div>
          </div>
        </div>

        {/* Responsibility Section */}
        <div
          className="mt-[100px] bg-gradient-to-r from-yellow-300 to-white px-10 lg:px-0 pt-10 lg:py-0"
        >
          <div className="   justify-between items-center grid grid-cols-1 lg:flex  ">
            <div className=" lg:w-1/2 w-full flex flex-col justify-center items-center">
            <div className='lg:w-2/3 w-full'>
               <h3 className="text-5xl md:text-6xl text-black font-black mb-8 tracking-tight">Our Responsibility</h3>
              <p className=" text-[14px] text-black  pe-10  w-full">
                As industry leaders, we take responsibility for setting standards in quality, safety, and environmental sustainability.
                We're accountable to our customers, employees, and the communities we serve.
              </p>
            </div>
             
            </div>
            <div className='mt-10 lg:mt-0  lg:h-[500px] lg:w-[700px]'>
              <Image src={Responsibility} alt='Our Responsibility' className=' w-full h-full  object-cover lg:rounded-lg' />
            </div>

          </div>
        </div>
      </section>


    </>
  )
}

export default Responsible 