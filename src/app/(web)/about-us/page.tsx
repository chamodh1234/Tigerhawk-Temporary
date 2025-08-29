'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FaLightbulb, FaShieldAlt, FaUsers, FaGlobe, FaAward, FaHeart, FaLeaf, FaRocket } from 'react-icons/fa'
import Logo from '@/public/logo.png'

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const stats = [
    { number: '10+', label: 'Years of Experience', icon: FaAward },
    { number: '50K+', label: 'Happy Customers', icon: FaHeart },
    { number: '100+', label: 'Products', icon: FaLightbulb },
    { number: '25+', label: 'Countries Served', icon: FaGlobe },
  ]

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of lighting technology to create cutting-edge solutions that meet the evolving needs of our customers.',
      color: 'text-blue-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Quality',
      description: 'Every product we create undergoes rigorous testing to ensure it meets our high standards for durability, performance, and safety.',
      color: 'text-green-600'
    },
    {
      icon: FaUsers,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.',
      color: 'text-purple-600'
    },
    {
      icon: FaLeaf,
      title: 'Sustainability',
      description: 'We\'re committed to environmental responsibility, using eco-friendly materials and energy-efficient technologies in all our products.',
      color: 'text-emerald-600'
    }
  ]

  const team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: '/optometry-consultation-medical-office-with-indian-expert.jpg',
      bio: 'Visionary leader with 15+ years in lighting technology and outdoor equipment industry.'
    },
    {
      name: 'Sarah Johnson',
      position: 'Head of Product Development',
      image: '/security-guard-workspace.jpg',
      bio: 'Expert in product innovation and design, leading our R&D team to create breakthrough solutions.'
    },
    {
      name: 'Michael Chen',
      position: 'Operations Director',
      image: '/photorealistic-scene-with-warehouse-logistics-operations(1).jpg',
      bio: 'Ensures seamless operations and maintains our commitment to quality across all processes.'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-200 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/about-us-hero-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-bounce mb-8">
              <FaLightbulb className="h-20 w-20 text-yellow-400 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              About Tiger Hawk
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Trusted Performance in Every Step. We are your companion for all things bright and safe,
              whether you're camping, hiking, or facing an emergency.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section id="stats" ref={setRef('stats')} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Story Section */}
      <section id="story" ref={setRef('story')} className="py-20 bg-gradient-to-r from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible['story'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="border-l-4 border-blue-600 pl-6">
                  Founded in 2014, Tiger Hawk began with a simple mission: to provide reliable,
                  high-quality lighting solutions for outdoor enthusiasts and professionals who
                  depend on their equipment in challenging environments.
                </p>
                <p>
                  What started as a small workshop crafting custom lanterns for local hikers
                  has grown into a trusted brand serving customers worldwide. Our journey has
                  been driven by a passion for innovation and an unwavering commitment to quality.
                </p>
                <p>
                  Today, Tiger Hawk continues to lead the industry with cutting-edge technology,
                  sustainable practices, and products that customers can rely on in any situation.
                </p>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${isVisible['story'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero-section-image.jpg"
                    alt="Tiger Hawk Workshop"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      {/* <section id="mission" ref={setRef('mission')} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're dedicated to illuminating the world with innovative, reliable, and sustainable lighting solutions.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible['mission'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600 rounded-full mr-4">
                  <FaRocket className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide innovative, reliable, and sustainable lighting solutions that enhance 
                safety, productivity, and enjoyment for outdoor enthusiasts, professionals, and 
                emergency responders worldwide.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-600 rounded-full mr-4">
                  <FaGlobe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the global leader in advanced lighting technology, setting industry standards 
                for innovation, quality, and environmental responsibility while empowering people 
                to explore, work, and live safely in any environment.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section id="values" ref={setRef('values')} className="py-20 bg-gradient-to-r from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and shape the products we create.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible['values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {values.map((value, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" ref={setRef('team')} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The passionate individuals driving innovation and excellence at Tiger Hawk.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ${isVisible['team'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={224}
                      height={224}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">
                  {member.position}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" ref={setRef('why-choose')} className="py-20 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
        {/* Logo Watermark Background */}

        <div className="px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Tiger Hawk?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what sets us apart in the lighting industry.
            </p>
          </div>
          <div className='flex justify-between items-center gap-5'>
            <div className={`grid grid-cols-1 w-2/3 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible['why-choose'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-yellow-500 rounded-full mr-4">
                  <FaAward className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Proven Quality</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our products undergo rigorous testing and meet the highest industry standards
                  for durability and performance.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-blue-500 rounded-full mr-4">
                  <FaLightbulb className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Innovation First</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We continuously invest in research and development to bring you the latest
                  lighting technology and features.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-red-500 rounded-full mr-4">
                  <FaHeart className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Customer Support</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our dedicated support team is here to help you find the perfect lighting
                  solution for your needs.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-green-500 rounded-full mr-4">
                  <FaLeaf className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Eco-Friendly</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We're committed to sustainability, using energy-efficient technologies
                  and environmentally responsible practices.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-purple-500 rounded-full mr-4">
                  <FaShieldAlt className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Safety Focus</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Every product is designed with safety in mind, ensuring reliable performance
                  in critical situations.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  {/* <div className="p-3 bg-indigo-500 rounded-full mr-4">
                  <FaGlobe className="h-6 w-6 text-white" />
                </div> */}
                  <h3 className="text-xl font-bold text-gray-900">Global Reach</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Serving customers worldwide with reliable shipping and local support
                  in multiple countries.
                </p>
              </div>
            </div>
            <div className='flex items-center bg-black'>
              <Image src={Logo} alt="Tiger Hawk Logo" className=" " />
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-200 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/about-us-cta-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Experience Tiger Hawk?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover our range of innovative lighting solutions and join thousands of
            satisfied customers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-semibold rounded-full text-blue-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-lg font-semibold rounded-full text-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

export default AboutUsPage
