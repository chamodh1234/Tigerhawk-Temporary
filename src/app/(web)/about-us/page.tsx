'use client'
import React from 'react'
import Image from 'next/image'
import { FaLightbulb, FaShieldAlt, FaUsers, FaGlobe, FaAward, FaHeart, FaLeaf, FaRocket } from 'react-icons/fa'

const AboutUsPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Tiger Hawk
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Trusted Performance in Every Step. We are your companion for all things bright and safe, 
              whether you're camping, hiking, or facing an emergency.
            </p>
            <div className="flex justify-center">
              <FaLightbulb className="h-16 w-16 text-yellow-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
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
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/hero-section-image.jpg"
                  alt="Tiger Hawk Workshop"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to illuminating the world with innovative, reliable, and sustainable lighting solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <FaRocket className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To provide innovative, reliable, and sustainable lighting solutions that enhance 
                safety, productivity, and enjoyment for outdoor enthusiasts, professionals, and 
                emergency responders worldwide.
              </p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <FaGlobe className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To be the global leader in advanced lighting technology, setting industry standards 
                for innovation, quality, and environmental responsibility while empowering people 
                to explore, work, and live safely in any environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the products we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <value.icon className={`h-12 w-12 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals driving innovation and excellence at Tiger Hawk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={192}
                      height={192}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-700">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tiger Hawk?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in the lighting industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaAward className="h-8 w-8 text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Proven Quality</h3>
              </div>
              <p className="text-gray-700">
                Our products undergo rigorous testing and meet the highest industry standards 
                for durability and performance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaLightbulb className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Innovation First</h3>
              </div>
              <p className="text-gray-700">
                We continuously invest in research and development to bring you the latest 
                lighting technology and features.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaHeart className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Customer Support</h3>
              </div>
              <p className="text-gray-700">
                Our dedicated support team is here to help you find the perfect lighting 
                solution for your needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaLeaf className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Eco-Friendly</h3>
              </div>
              <p className="text-gray-700">
                We're committed to sustainability, using energy-efficient technologies 
                and environmentally responsible practices.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Safety Focus</h3>
              </div>
              <p className="text-gray-700">
                Every product is designed with safety in mind, ensuring reliable performance 
                in critical situations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaGlobe className="h-8 w-8 text-indigo-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Global Reach</h3>
              </div>
              <p className="text-gray-700">
                Serving customers worldwide with reliable shipping and local support 
                in multiple countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Tiger Hawk?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover our range of innovative lighting solutions and join thousands of 
            satisfied customers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsPage
