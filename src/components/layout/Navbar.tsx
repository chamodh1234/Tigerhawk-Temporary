'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart, ShoppingCart, User } from 'lucide-react'
import Logo from '@/public/logo.png'
import Sidenav from './Sidenav'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isNavOpen, setIsNavOpen] = useState(true);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
    ]

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery)
    }

    return (
        <nav className="bg-white shadow-lg border-b h-[70px] flex  items-center">
            <div className="wrapper w-full">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 ">
                            <Image
                                src={Logo}
                                alt="Tiger Hawk Logo"
                                width={60}
                                height={60}
                                className=" bg-black"
                            />
                            {/* <span className="text-xl font-bold text-gray-900">TIGER HAWK</span> */}
                        </Link>
                    </div>
                    <div className='md:flex hidden'>
                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-4 xl:me-[100px] lg:me-[20px]">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className='flex'>
                            {/* Global Search Bar */}
                            <div className="hidden lg:flex items-center">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-[250px] h-[40px] px-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Search size={20} />
                                    </button>
                                </form>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center">
                                {/* Mobile Search Button */}
                                <button className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <Search size={20} />
                                </button>

                                {/* Favorites */}
                                <button className="p-2 text-gray-600 cursor-pointer hover:text-red-500 transition-colors relative">
                                    <Heart size={20} />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        0
                                    </span>
                                </button>

                                {/* Cart */}
                                <button className="p-2 text-gray-600 cursor-pointer hover:text-green-600 transition-colors relative">
                                    <ShoppingCart size={20} />
                                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        0
                                    </span>
                                </button>

                                {/* Sign In */}
                                <button className="px-4 py-2 cursor-pointer  rounded-md transition-colors flex items-center space-x-2">
                                    <User size={16} />
                                    <span className="hidden sm:inline">Sign In</span>
                                </button>
                            </div>
                        </div>
                    </div>



                    
                    {/* Mobile Menu (simplified) */}
                    <div className="md:hidden z-20">
                        <Sidenav/>
                    </div>

                </div>


            </div>
        </nav>
    )
}

export default Navbar 