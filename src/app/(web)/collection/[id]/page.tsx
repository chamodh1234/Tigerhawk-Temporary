'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
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
import ProductList from './components/ProductList'
import GallerySection from '../../components/GallerySection'
import VideoSection from '../../components/VideoSection'

const CollectionPage = () => {
  const params = useParams()
  const categoryId = params.id as string

  // Mock data - replace with actual data fetching
  const categoryData = {
    id: categoryId,
    name: getCategoryName(categoryId),
    image: '/hero-section-image.jpg', // Replace with actual category image
    description: 'Explore our premium collection of lighting solutions designed for professionals and enthusiasts alike.'
  }

  // Subcategories data based on main category
  const getSubcategories = (categoryId: string) => {
    const subcategoriesMap: { [key: string]: Array<{name: string, image: any}> } = {
      'headlamp': [
        { name: 'Indoor', image: Camping },
        { name: 'Outdoor', image: Security },
        { name: 'Handheld', image: Emergency },
        { name: 'Rechargeable', image: Construction },
        { name: 'Tactical', image: Riding }
      ],
      'flashlight': [
        { name: 'Compact', image: Diving },
        { name: 'High Power', image: Medical },
        { name: 'Waterproof', image: Repairs },
        { name: 'Professional', image: Fishing },
        { name: 'Emergency', image: NightSearch }
      ],
      'lantern': [
        { name: 'Camping', image: Camping },
        { name: 'Emergency', image: Emergency },
        { name: 'Portable', image: Security },
        { name: 'Rechargeable', image: Construction },
        { name: 'LED', image: Riding }
      ],
      'tactical': [
        { name: 'Military Grade', image: Diving },
        { name: 'Law Enforcement', image: Medical },
        { name: 'Search & Rescue', image: Repairs },
        { name: 'Professional', image: Fishing },
        { name: 'Heavy Duty', image: NightSearch }
      ],
      'emergency': [
        { name: 'First Responder', image: Camping },
        { name: 'Disaster Relief', image: Emergency },
        { name: 'Medical', image: Security },
        { name: 'Safety', image: Construction },
        { name: 'Backup', image: Riding }
      ],
      'outdoor': [
        { name: 'Hiking', image: Diving },
        { name: 'Camping', image: Medical },
        { name: 'Fishing', image: Repairs },
        { name: 'Hunting', image: Fishing },
        { name: 'Adventure', image: NightSearch }
      ],
      'professional': [
        { name: 'Construction', image: Camping },
        { name: 'Industrial', image: Emergency },
        { name: 'Security', image: Security },
        { name: 'Maintenance', image: Construction },
        { name: 'Commercial', image: Riding }
      ]
    }
    return subcategoriesMap[categoryId] || [
      { name: 'General', image: Camping },
      { name: 'Standard', image: Emergency },
      { name: 'Premium', image: Security }
    ]
  }

  function getCategoryName(id: string): string {
    const categories: { [key: string]: string } = {
      'headlamp': 'HEADLAMP SERIES',
      'flashlight': 'FLASHLIGHT COLLECTION',
      'lantern': 'LANTERN MODELS',
      'tactical': 'TACTICAL LIGHTING',
      'emergency': 'EMERGENCY LIGHTING',
      'outdoor': 'OUTDOOR ADVENTURE',
      'professional': 'PROFESSIONAL SERIES'
    }
    return categories[id] || 'COLLECTION'
  }

  const subcategories = getSubcategories(categoryId)

  return (
    <>
      <section className=" text-white">
        {/* Banner Section */}
        <div className="relative w-full h-[300px] overflow-hidden ">
          <Image
            src={categoryData.image}
            alt={categoryData.name}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Category Name - Left Center */}
          <div className="absolute  w-full top-1/2 transform -translate-y-1/2">
            <h1 className="text-4xl wrapper  md:text-[60px] font-black tracking-tight text-white">{categoryData.name}
            </h1>
            <p className='text-white text-[15px] wrapper'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        {/* Subcategories Section */}
        <div className=" text-black">
          <div className="wrapper py-16">
            <h2 className="text-[40px] font-bold  mb-12">USAGE</h2>
            
            <div className="grid xl:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="relative cursor-pointer"
                >
                  <div className="absolute bottom-5 text-black font-bold flex justify-center w-full text-center py-3">
                    <div className="relative flex justify-center items-center opacity-60 bg-white w-full h-[50px]">
                    </div>
                    <p className="absolute w-full h-[50px] transition-all duration-300 flex items-center justify-center hover:bg-blue-800 hover:text-white">
                      {subcategory.name}
                    </p>
                  </div>
                  
                  {subcategory.image && (
                    <Image 
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="object-cover object-center h-[400px] w-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <ProductList categoryId={categoryId} />

        
      </section>
      <GallerySection/>
        <VideoSection/>
    </>
  )
}

export default CollectionPage
