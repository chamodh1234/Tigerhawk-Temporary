import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from './components/HeroSection'
import TigerhawkSection from './components/TigerhawkSection'
import CategorySection from './components/CategorySection'
import BeniftsSection from './components/BenifitsSection'
import GallerySection from './components/GallerySection'
import VideoSection from './components/VideoSection'

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection/>

        {/* Features Section */}
     <TigerhawkSection/>
     <CategorySection/>
      <BeniftsSection/>
      <GallerySection/>
      <VideoSection/>
      </main>

      <Footer />
    </div>
  )
}

export default Page