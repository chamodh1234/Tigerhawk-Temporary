'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart, ShoppingCart, User, User2 } from 'lucide-react'
import Logo from '@/public/logo.png'
import Sidenav from './Sidenav'
import { useAppSelector, useAppDispatch } from '@/lib/redux/store'
import { useGetFavouritesQuery, useGetCartQuery, useGetProductsQuery } from '@/lib/redux/apiSlice'
import { setFavourites } from '@/lib/redux/slices/favouritesSlice'
import { setCartItems } from '@/lib/redux/slices/cartSlice'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const User = useAppSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const dispatch = useAppDispatch()
    const { data: favouritesData } = useGetFavouritesQuery({})
    const { data: cartData } = useGetCartQuery({})
    const { data: productsData } = useGetProductsQuery({})
    
    // Store favourites in Redux when data is fetched
    useEffect(() => {
        if (favouritesData?.data?.favorites) {
            dispatch(setFavourites(favouritesData.data.favorites))
        }
    }, [favouritesData, dispatch])
    
    // Store cart items in Redux when data is fetched
    useEffect(() => {
        if (cartData?.data?.cart_items) {
            dispatch(setCartItems(cartData?.data?.cart_items))
        }
    }, [cartData, dispatch])
    
    // Get favourites count from Redux store
    const { favourites } = useAppSelector((state) => state.favourites)
    const favouritesCount = favourites.length
    
    // Get cart count from Redux store
    const { cartItems } = useAppSelector((state) => state.cart)
    const cartCount = cartItems.length

    // Filter products based on search query
    const filteredProducts = React.useMemo(() => {
        if (!searchQuery.trim() || !productsData?.data) return []
        
        return productsData.data.filter((product: any) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 10) // Limit to 10 results for better UX
    }, [searchQuery, productsData?.data])

    // Show dropdown when typing
    useEffect(() => {
        setShowSearchDropdown(searchQuery.length > 0 && filteredProducts.length > 0)
    }, [searchQuery, filteredProducts.length])
    
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Gallery', href: '/gallery' },
    ]

    useEffect(() => {
        setUserName(localStorage.getItem('un') || '')
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery)
    }

    const handleProductClick = (productId: string) => {
        setSearchQuery('')
        setShowSearchDropdown(false)
        // Navigate to product page
        window.location.href = `/product/${productId}`
    }

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchInputBlur = () => {
        // Delay hiding dropdown to allow clicking on items
        setTimeout(() => {
            setShowSearchDropdown(false)
        }, 200)
    }

    return (
        <nav className="  top-0 left-0 right-0  z-50 h-[70px] flex items-center">
                <div className="grid grid-cols-3 items-center h-full ps-4  w-full">
                    {/* Logo - Left Column */}
                    <div className="flex items-center justify-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src={Logo}
                                alt="Tiger Hawk Logo"
                                width={60}
                                height={60}
                                className="bg-black"
                            />
                            {/* <span className="text-xl font-bold text-gray-900">TIGER HAWK</span> */}
                        </Link>
                    </div>

                    {/* Global Search Bar - Middle Column */}
                    <div className="flex items-center justify-center">
                        <div className="hidden lg:flex items-center relative">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onBlur={handleSearchInputBlur}
                                    onFocus={() => searchQuery.length > 0 && setShowSearchDropdown(true)}
                                    className="w-[300px] h-[40px] px-4 border border-black focus:outline-none rounded-full"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <Search size={20} />
                                </button>
                            </form>

                            {/* Search Dropdown */}
                            {showSearchDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-md max-h-80 overflow-y-auto z-50">
                                    {filteredProducts.map((product: any) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleProductClick(product.id)}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                {product.images && product.images.length > 0 && (
                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {product.name}
                                                    </p>
                                                    {/* <p className="text-xs text-gray-500">
                                                        ID: {product.id}
                                                    </p>
                                                    <p className="text-xs text-gray-600 truncate">
                                                        ${Number(product.price).toFixed(2)}
                                                    </p> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredProducts.length === 0 && searchQuery.length > 0 && (
                                        <div className="px-4 py-3 text-sm text-gray-500">
                                            No products found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                           {/* Favorites */}
                           <Link href="/favourites" className="p-2 hidden md:flex text-gray-600 cursor-pointer hover:text-red-500 transition-colors relative">
                                <Heart size={20} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {favouritesCount}
                                </span>
                            </Link>
                    </div>

                    {/* Navigation Links - Right Column */}
                    <div
                        className="flex items-center justify-end h-full relative overflow-hidden"
                        style={{ zIndex: 1 }}
                    >
                        {/* Animated background with left curve using div, animating width from right to left */}
                        <div
                            className="absolute hidden md:flex inset-0 pointer-events-none  items-stretch justify-end"
                            aria-hidden="true"
                        >
                            <div
                                className="navbar-anim-bg primary-color-bg h-full"
                                style={{
                                    maxWidth: '500px',
                                }}
                            />
                        </div>
                        <style jsx>{`
                            .navbar-anim-bg {
                                width: 0%;
                                max-width: 500px;
                                transition: border-top-left-radius 0.6s cubic-bezier(0.4,0,0.2,1), border-bottom-left-radius 0.6s cubic-bezier(0.4,0,0.2,1);
                                animation: navbarAnimBgGrow 1.4s cubic-bezier(0.4,0,0.2,1) forwards;
                            }
                            @keyframes navbarAnimBgGrow {
                                0% {
                                    width: 0%;
                                    border-top-left-radius: 0px;
                                    border-bottom-left-radius: 0px;
                                }
                                80% {
                                    width: 85%;
                                    border-top-left-radius: 48px;
                                    border-bottom-left-radius: 48px;
                                }
                                100% {
                                    width: 100%;
                                    border-top-left-radius: 9999px;
                                    border-bottom-left-radius: 9999px;
                                }
                            }
                        `}</style>
                        <div className="hidden md:flex items-center z-10 space-x-4 pe-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-blue-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                         
                            {/* Mobile Search Button */}
                            <button className="lg:hidden p-2 md:flex hidden text-gray-600 hover:text-blue-600 transition-colors">
                                <Search size={20} />
                            </button>

                            {/* Mobile Menu */}
                            <div className="md:hidden">
                                <Sidenav/>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar 