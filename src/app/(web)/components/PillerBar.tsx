import React from 'react'
import Fisherman from '@/public/fishing.png'
import Security from '@/public/policeman.png'
import Home from '@/public/house.png'
import Farmers from '@/public/farmer.png'
import Image from 'next/image'

const PillerBar = () => {
  return (
    <nav
      aria-label="Company Sectors"
      className="w-full flex justify-center mb-[150px]"
    >
      <ul className="flex flex-wrap gap-[80px] primary-color-bg w-full dark:bg-card   justify-center px-8 py-4">
        <li className="flex flex-col justify-center items-center">
           <Image src={Fisherman} alt='Fisherman' className='w-[70px] h-[70px]' />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2">Fishermen</span>
        </li>
        <li className="flex flex-col items-center">
          <Image src={Security} alt='Security' className='w-[70px] h-[70px]' /> 
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2">Security</span>
        </li>
        <li className="flex flex-col items-center">
            <Image src={Home} alt='Home' className='w-[70px] h-[70px]' />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2">Home/Personal</span>
        </li>
        <li className="flex flex-col items-center">
          <Image src={Farmers} alt='Farmers' className='w-[70px] h-[70px]' />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-2">Farmers</span>
        </li>
      </ul>
    </nav>
  )
}

export default PillerBar