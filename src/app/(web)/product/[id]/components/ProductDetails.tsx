'use client'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useCreateFavouriteMutation, useRemoveFromFavouritesMutation, useAddToCartMutation, useRemoveFromCartMutation, useGetProductReviewsQuery } from '@/lib/redux/apiSlice'
import { useAppSelector, useAppDispatch } from '@/lib/redux/store'
import { addFavourite, removeFavourite } from '@/lib/redux/slices/favouritesSlice'
import { addCartItem, removeCartItem } from '@/lib/redux/slices/cartSlice'
import { get } from 'http'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  sku: string
  brand: string
  inStock: boolean
  stockCount: number
}

interface ProductDetailsProps {
  product: Product
}

/**
 * Component for displaying product details and action buttons
 * Uses product prop for data
 * 
 * Debugging:
 * - Check console for component render logs
 */
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()
  const { favourites } = useAppSelector((state) => state.favourites)
  const { cartItems } = useAppSelector((state) => state.cart)
  const [createFavourite, { isLoading: isCreatingFavourite }] = useCreateFavouriteMutation()
  const [removeFromFavourites, { isLoading: isRemovingFavourite }] = useRemoveFromFavouritesMutation()
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation()
  const [removeFromCart, { isLoading: isRemovingFromCart }] = useRemoveFromCartMutation()
  const {data:getProductReviews} = useGetProductReviewsQuery(product.id)
  const [user,setUser] = useState({
    user_id: false,
    token: false,
  })


  useEffect(() => {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('uid')
    if (token) {
      setUser({...user,token:true})
    }
    if(user_id){
      setUser({...user,user_id:true})
    }
  }, [])

  // Check if product is already in favourites
  const isFavorite = favourites.some(fav => fav.product.id === product.id)
  const favouriteItem = favourites.find(fav => fav.product.id === product.id)

  // Check if product is already in cart
  console.log("cart items",cartItems)
  const isInCart = cartItems.length > 0 && cartItems.some(item => item?.product_id === product.id)
  const cartItem = cartItems.length > 0 && cartItems.find(item => item?.product_id === product.id)

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.stockCount, quantity + value))
    setQuantity(newQuantity)
  }

  const handleToggleCart = async () => {
    if(!user.token && !user.user_id){
      toast.error('Please sign in to add to cart')
      return
    }
    try {
      if (isInCart && cartItem) {
        // Remove from cart
        await removeFromCart(cartItem.id).unwrap()
        dispatch(removeCartItem(cartItem.id))
        toast.success('Product removed from cart!')
      } else {
        // Add to cart
        const result = await addToCart({
          product_id: product.id,
          quantity: quantity,
          price_at_time: product.price
        }).unwrap()
        dispatch(addCartItem(result.data))
        toast.success('Product added to cart!')
      }
    } catch (error) {
      console.log(error)
      toast.error(isInCart ? 'Failed to remove from cart. Please try again.' : 'Failed to add to cart. Please try again.')
    }
  }
  const handleToggleFavourite = async () => {

    if(!user.token && !user.user_id){
      toast.error('Please sign in to add to favourites')
      return
    }

    try {
      if (isFavorite && favouriteItem) {
        // Remove from favourites
        await removeFromFavourites(favouriteItem.id).unwrap()
        dispatch(removeFavourite(favouriteItem.id))
        toast.success('Removed from favourites!')
      } else {
        // Add to favourites
        const result = await createFavourite(product.id).unwrap()
        dispatch(addFavourite(result.data))
        toast.success('Added to favourites!')
      }
    } catch (error) {
      console.log(error)
      toast.error(isFavorite ? 'Failed to remove from favourites. Please try again.' : 'Failed to add to favourites. Please try again.')
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 tracking-tight">
          {product.name}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">SKU: {product.sku} | Brand: {product.brand}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i <=   Math.round(getProductReviews?.summary?.average_rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-600 text-sm sm:text-base">({getProductReviews?.summary?.total_reviews} reviews)</span>
      </div>

      {/* Price and Favorite */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl font-black text-gray-900">${Number(product?.price - (product?.price * product?.discount / 100))?.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xl sm:text-2xl text-gray-400 line-through">${Number(product?.price)?.toFixed(2)}</span>
                <span className="bg-red-600 text-white px-2 py-1 text-xs sm:text-sm font-bold">
                  -{Number(product?.discount)?.toFixed(2)}%
                </span>
              </>
            )}
          </div>
      
        </div>
        {/* <p className="text-green-600 font-semibold text-sm sm:text-base">
          {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
        </p> */}
      </div>

      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <label className="text-sm font-semibold text-gray-700">Quantity:</label>
          <div className="flex items-center border border-gray-300">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 sm:px-3 py-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 sm:px-4 py-2 border-x border-gray-300 min-w-[50px] sm:min-w-[60px] text-center text-sm sm:text-base">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-2 sm:px-3 py-2 hover:bg-gray-100 transition-colors"
              disabled={quantity >= product.stockCount}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <button onClick={handleToggleCart} disabled={isAddingToCart || isRemovingFromCart} className={`flex items-center justify-center gap-2 flex-1 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded transition-colors duration-300 text-sm sm:text-base ${isInCart ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}>
            {isInCart ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6v12m6-12v12M6 6v12m12-12v12" />
                </svg>
                Remove from Cart
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.96a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded transition-colors duration-300 text-sm sm:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Buy Now
          </button>
          <button
            onClick={handleToggleFavourite}
            disabled={isCreatingFavourite || isRemovingFavourite}
            className={`flex items-center justify-center gap-2 flex-1 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded transition-colors duration-300 text-sm sm:text-base ${isFavorite ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-white border border-pink-600 text-pink-600 hover:bg-pink-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'fill-current text-white' : 'text-pink-600'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isFavorite ? 'Remove from Favourite' : 'Add to Favourite'}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default ProductDetails 