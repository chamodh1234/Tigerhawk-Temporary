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
      <section className="relative bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-200 text-white py-10 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/hero-section-image-2.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce mb-8">
            <svg className="h-20 w-20 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            MY FAVOURITES
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Your saved products and preferred items
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
                <div key={product.id} className="bg-white border rounded-[32px] relative h-[350px]  border-gray-200 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="relative h-full">
                    <Link href={`/product/${product.id}`}>
                      <div className="relative h-full overflow-hidden rounded-[30px]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Product Details Overlay - Appears on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-full group-hover:translate-y-0 p-4">
                          <div className="text-center pb-[70px]">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }} />
                           
                           
                            <div>
                              <p className="text-xs text-gray-500">
                                Added {new Date(product.addedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
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

                  {/* Product Name Only - Always Visible */}
                 

                  <div className=" absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <button className="w-full rounded-full primary-color-bg font-bold py-3 px-4 transition-colors duration-300">
                      Read More
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

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  )
}

export default FavouritesPage
