import Image from 'next/image'
import React from 'react'
import Tumbnail from '@/public/4443594 1.png'
import PlayButton from '@/public/play-button.png'

const VideoSection = () => {
  return (
   <>
   <div className='wrapper p-0 my-[100px]  w-full  h-full relative'>
    
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
           <Image src={PlayButton} alt='Play Button'className='w-[70px] h-[70px] opacity-60  top-1/2 right-1/2'/>
 
    </div>
    <div className='absolute  w-full h-full left-0 top-0 bg-white opacity-20'>

    </div>
    <Image src={Tumbnail} alt='Video thumbnail' className='w-full h-full object-cover'/>
   </div>
   </>
  )
}

export default VideoSection