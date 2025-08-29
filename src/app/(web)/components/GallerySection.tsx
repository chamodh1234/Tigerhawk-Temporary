import React from 'react'
import Image from 'next/image'
import Image1 from '@/public/hero-section-image.jpg'
import Image2 from '@/public/camping.jpg'
import Image3 from '@/public/man-walking-with-lantern-woods.jpg'
import Image4 from '@/public/seeking-your-input-for-our-upcoming-ec500-long-range-v0-o2otujj0c6zc1.png'
import Image5 from '@/public/side-view-woman-holding-flashlight.jpg'
import Image6 from '@/public/s-l1200.jpg'
import Image7 from '@/public/closeup-gas-lamp-tent-nature.jpg'
import Image8 from '@/public/side-view-woman-with-head-lantern.jpg'

const images = [Image1, Image2, Image4, Image5, Image3, Image6]

// Responsive cell styles: simple stacking on mobile, custom grid on md+
const cellStyles = [
  // mobile: default (auto), md+: custom
  'md:row-start-1 md:row-end-6 md:col-start-1 md:col-end-3 row-start-1 row-end-6', // large vertical
  'md:row-start-1 md:row-end-6 md:col-start-4 md:col-end-5 row-start-1 row-end-6', // tall right
  'md:row-start-1 md:row-end-6 md:col-start-3 md:col-end-4 row-start-6 row-end-12 ', // center
  'md:row-start-6 md:row-end-11 md:col-start-1 md:col-end-2 row-start-6 row-end-12', // bottom left
  'md:row-start-6 md:row-end-11 md:col-start-3 md:col-end-5 row-start-12 row-end-20', // bottom right
  'md:row-start-6 md:row-end-11 md:col-start-2 md:col-end-3 row-start-12 row-end-20', // bottom center
]

const GallerySection = () => {
  return (
    <div
      className="
        wrapper
        
        mt-[150px]
        
        w-full
        h-[100vh]
      "
    >
      <div
        className="
          grid
          grid-cols-2
          grid-rows-20
          md:grid-cols-4
          md:grid-rows-10
          w-full
          h-[100vh]
        "
        
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`
              relative
              ${cellStyles[idx]}
              
            `}
          >
            <Image
              src={img}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover object-center"
              
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GallerySection