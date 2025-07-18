'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo.png'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Logo and branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-black text-white p-8 relative">
        <div className="flex flex-col  mt-20 items-center w-full">
          <Image
            src={Logo}
            alt="Tigerhawk Logo"
            width={300}
            height={300}
            priority
            className="mb-8 object-contain"
          />        
        </div>
        
      </div>
      {/* Right Side - Auth form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-md p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
