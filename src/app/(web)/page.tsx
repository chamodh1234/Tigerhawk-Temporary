import React from 'react'
import HeroSection from './components/HeroSection'
import TigerhawkSection from './components/TigerhawkSection'
import CategorySection from './components/CategorySection'
import BeniftsSection from './components/BenifitsSection'
import GallerySection from './components/GallerySection'
import VideoSection from './components/VideoSection'
import Responsible from './components/Responsible'
import Inquiry from './components/Inquiry'
import PillerBar from './components/PillerBar'

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>


      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        <PillerBar/>
        {/* Features Section */}

        <CategorySection />
        <BeniftsSection />
        <GallerySection />
        <VideoSection />
        <TigerhawkSection />
        <Responsible />
        <Inquiry />
      </main>


    </div>
  )
}

export default Page