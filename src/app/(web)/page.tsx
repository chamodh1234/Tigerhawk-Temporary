import React from 'react'
import HeroSection from './components/HeroSection'
import TigerhawkSection from './components/TigerhawkSection'
import CategorySection from './components/CategorySection'
import BeniftsSection from './components/BenifitsSection'
import GallerySection from './components/GallerySection'
import VideoSection from './components/VideoSection'
import Responsible from './components/Responsible'
import Inquiry from './components/Inquiry'

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      
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
      <Responsible/>
      <Inquiry/>
      </main>

    
    </div>
  )
}

export default Page