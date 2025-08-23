'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetFavouritesQuery, useRemoveFromFavouritesMutation } from '@/lib/redux/apiSlice'
import { useRouter } from 'next/navigation'

interface FavouriteProduct {
  id: string
  name: string
  description: string
  image: string
  price: string
  category: string
  addedDate: string
}

const FavouritesPage = () => {
const [user,setUser] = useState({
    user_id: false,
    token: false,
  })
  const [removeFromFavourites, { isLoading: isRemoving }] = useRemoveFromFavouritesMutation()
  const { data: apiFavourites, isLoading, error ,refetch:refetchFavourites} = useGetFavouritesQuery({})
 const router = useRouter()
  
  // Transform API data to match component interface
 useEffect(() => {
    const token = localStorage?.getItem('token')
    const user_id = localStorage?.getItem('uid')
    if (token) {
      setUser({...user,token:true})
    }
    if(user_id){
      setUser({...user,user_id:true})
    }
   
   
  }, [])
  console.log("favourites",user)
 


console.log("apiFavourites",apiFavourites)
  const favourites: FavouriteProduct[] = !isLoading && apiFavourites.data ? apiFavourites.data.favorites.map((item: any) => ({
    id: item.id || item.product_id,
    name: item.product.name,
    description: item.product.description,
    image: item.product.images?.[0].url || '/hero-section-image.jpg',
    price: `$${item.product.price}`,
    category: item.product.main_category?.name || 'Uncategorized',
    addedDate: item.created_at || new Date().toISOString().split('T')[0]
  })) : []

  const handleRemoveFromFavourites = async (favouriteId: string, productName: string) => {
    try {
      await removeFromFavourites(favouriteId).unwrap()
      toast.success(`${productName} removed from favourites!`)
    } catch (error) {
      toast.error('Failed to remove from favourites. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="wrapper py-16">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading favourites...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="wrapper py-16">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading favourites. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  if(!user.token && !user.user_id){
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
        <div className="wrapper max-w-lg w-full mx-auto py-20">
          <div className="bg-white rounded-3xl shadow-xl px-8 py-14 flex flex-col items-center">
            <div className="mb-6 flex items-center justify-center">
              <svg
                aria-hidden="true"
                focusable="false"
                className="w-16 h-16 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Login Icon</title>
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Sign In Required</h2>
            <p className="text-lg text-gray-600 mb-6 text-center">
              Please <span className="text-blue-600 font-semibold">sign in</span> to view your favourites and access your saved products.
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="text-white">
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src="/hero-section-image-2.jpg"
            alt="Favourites"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute w-full top-1/2 transform -translate-y-1/2">
            <h1 className="text-4xl wrapper md:text-[60px] font-black tracking-tight text-white">
              MY FAVOURITES
            </h1>
            <p className='text-white text-[15px] wrapper'>
              Your saved products and preferred items
            </p>
          </div>
        </div>
      </section>

      {/* Favourites Content */}
      <section className="text-black">
        <div className="wrapper py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-[40px] font-bold mb-2">Favourites</h2>
              <p className="text-gray-600">
                {favourites.length} {favourites.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {favourites.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No favourites yet</h3>
              <p className="text-gray-600 mb-6">Start adding products to your favourites to see them here.</p>
              <Link 
                href="/collection/1"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 transition-colors duration-300"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favourites.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200  flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    
                    {/* Heart Icon Button - Top Right */}
                    <button 
                      onClick={() => handleRemoveFromFavourites(product.id, product.name)}
                      disabled={isRemoving}
                      className="absolute top-2 right-2 w-8 h-8 bg-white hover:bg-red-50 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5 fill-red-500" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <Link href={`/product/${product.id}`}>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mb-4">
                        <span className="text-xl font-bold text-blue-600">
                          {product.price}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-500">
                          Added {new Date(product.addedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 transition-colors duration-300">
                      BUY NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  )
}

export default FavouritesPage
