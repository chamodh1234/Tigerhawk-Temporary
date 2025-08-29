'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { 
  useAddToCartMutation, 
  useRemoveFromCartMutation, 
  useCreateFavouriteMutation, 
  useRemoveFromFavouritesMutation,
  useGetCartQuery,
  useGetFavouritesQuery
} from '@/lib/redux/apiSlice'

interface ProductCardProps {
  product: {
    id: string
    product_id: string
    name: string
    description: string
    price: number
    mainCategory?: string | number
    subCategory?: string | number
    main_category?: { id: string; name: string }
    sub_category?: { id: string; name: string }
    images: Array<{ url: string }>
    discount: number
    product_features: any[]
    additional_features: string[]
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // RTK Query mutations
  const [addToCart] = useAddToCartMutation()
  const [removeFromCart] = useRemoveFromCartMutation()
  const [createFavourite] = useCreateFavouriteMutation()
  const [removeFromFavourites] = useRemoveFromFavouritesMutation()
  
  // Get cart and favourites data
  const { data: cartData } = useGetCartQuery(undefined)
  const { data: favouritesData } = useGetFavouritesQuery(undefined)
  
  // Check if product is in cart and favourites
  const isInCart = cartData?.data?.cart_items?.some((item: any) => item.product.id === product.id)
  const isInFavourites = favouritesData?.data?.favorites?.some((item: any) => item.product.id === product.id)
 
  
  // Get cart item ID for removal
  const cartItem = cartData?.data?.cart_items?.find((item: any) => item.product.id === product.id)
  const favouriteItem = favouritesData?.data?.favorites?.find((item: any) => item.product.id === product.id)

  // Calculate discounted price
  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      if (isInCart && cartItem) {
        await removeFromCart(cartItem.id).unwrap()
        toast.success('Removed from cart')
      } else {
        await addToCart({
          product_id: product.id,
          quantity: 1,
          price_at_time: product.price
        }).unwrap()
        toast.success('Added to cart')
      }
    } catch (error) {
      toast.error('Failed to update cart')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToFavourites = async () => {
    setIsLoading(true)
    try {
      if (isInFavourites && favouriteItem) {
        await removeFromFavourites(favouriteItem.id).unwrap()
        toast.success('Removed from favourites')
      } else {
        await createFavourite(product.id).unwrap()
        toast.success('Added to favourites')
      }
    } catch (error) {
      toast.error('Failed to update favourites')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyNow = async () => {
    // Add to cart first, then redirect to checkout
    if (!isInCart) {
      try {
        await addToCart({
          product_id: product.id,
          quantity: 1,
          price_at_time: product.price
        }).unwrap()
      } catch (error) {
        toast.error('Failed to add to cart')
        return
      }
    }
    router.push('/cart')
  }

  const handleViewProduct = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <div className="flex rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 w-48 bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaEye size={48} />
          </div>
        )}
        
        {/* Discount Badge */}
        {/* {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{product.discount}%
          </div>
        )} */}
        
        {/* Favourites Button */}
        <button
          onClick={handleAddToFavourites}
          disabled={isLoading}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isInFavourites 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <FaHeart size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex w-full gap-4 justify-between">
        <div>
           <h3 className="text-[25px] font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-[5]">
          {product.description}
        </p>
        </div>
       

        {/* Price */}
        {/* <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${Number(discountedPrice).toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${Number(product.price).toFixed(2)}
            </span>
          )}
        </div> */}

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Add to Cart Button */}
          {/* <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`w-full py-2 px-4 font-medium transition-colors ${
              isInCart
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } disabled:opacity-50`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaShoppingCart size={16} className="mr-2" />
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </div>
            )}
          </button> */}

          {/* Buy Now Button */}
          {/* <button
            onClick={handleBuyNow}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Buy Now
          </button> */}

          {/* View Details Button */}
          <button
            onClick={handleViewProduct}
            className="w-full py-2 px-4 border h-full rounded-lg border-gray-300 text-gray-700 font-medium hover:bg-yellow-300 transition-colors"
          >
            <div className="flex items-center justify-center">
              {/* <FaEye size={16} className="mr-2" /> */}
              View Details
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 