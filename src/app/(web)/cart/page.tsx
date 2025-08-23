'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from '@/lib/redux/apiSlice'
import { useAppSelector, useAppDispatch } from '@/lib/redux/store'
import { setCartItems } from '@/lib/redux/slices/cartSlice'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    description: string
    image: string
    price: number
    category: string
  }
  quantity: number
  addedDate: string
}

const CartPage = () => {
  const router = useRouter()
  const [user,setUser] = useState({
    user_id: false,
    token: false,
  })

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

const dispatch = useAppDispatch()
  const { data: cartData, isLoading, error } = user.token && user.user_id ? useGetCartQuery({}) : {data:null,isLoading:false,error:false}
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation()
  const [removeFromCartMutation, { isLoading: isRemoving }] = useRemoveFromCartMutation()
  // Store cart items in Redux when data is fetched
  React.useEffect(() => {
    if (cartData?.data?.cart_items) {
      dispatch(setCartItems(cartData.data.cart_items))
    }
  }, [cartData, dispatch])

  // Get cart items from Redux store
  const { cartItems } = useAppSelector((state) => state.cart)

  // Transform API data to match component interface
  const transformedCartItems: any[] = cartItems.map((item: any) => ({
    id: item.id,
    product: {
      id: item.product_id,
      name: item.product?.name || 'Product',
      description: item.product?.description || 'Product description',
      image: item.product?.images?.[0]?.url || '/hero-section-image.jpg',
      price: item.price_at_time || item.product?.price || 0,
      category: item.product?.main_category?.name || 'Uncategorized',
      discount: item.product?.discount || 0
    },
    quantity: item.quantity,
    addedDate: item.created_at || new Date().toISOString().split('T')[0]
  }))

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    try {
      await updateCartItem({ cartItemId: itemId, quantity: newQuantity }).unwrap()
      toast.success('Quantity updated successfully!')
    } catch (error) {
      toast.error('Failed to update quantity. Please try again.')
      console.error('Error updating quantity:', error)
    }
  }

  const handleRemoveFromCart = async (itemId: string, productName: string) => {
    try {
      await removeFromCartMutation(itemId).unwrap()
      toast.success(`${productName} removed from cart!`)
    } catch (error) {
      toast.error('Failed to remove item from cart. Please try again.')
      console.error('Error removing from cart:', error)
    }
  }

  // Calculate totals
  const subtotal = transformedCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = 0 // 8% tax
  const discount = transformedCartItems.reduce((acc, item) => acc + ((item.product.price * (item.product.discount/100)) * item.quantity), 0)// 5% discount
  const total = subtotal + shipping + tax - discount
  const itemCount = transformedCartItems.reduce((sum, item) => sum + item.quantity, 0)

  console.log("discount",discount)
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="wrapper py-16">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading cart...</p>
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
            <p className="text-red-500 text-lg">Error loading cart. Please try again.</p>
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

  if (transformedCartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="text-white">
          <div className="relative w-full h-[300px] overflow-hidden">
            <img
              src="/hero-section-image-2.jpg"
              alt="Shopping Cart"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="absolute w-full top-1/2 transform -translate-y-1/2">
              <h1 className="text-4xl wrapper md:text-[60px] font-black tracking-tight text-white">
                SHOPPING CART
              </h1>
              <p className='text-white text-[15px] wrapper'>
                Your selected products and checkout
              </p>
            </div>
          </div>
        </section>

        {/* Empty Cart */}
        <section className="text-black">
          <div className="wrapper py-16">
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.96a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Start shopping to add items to your cart.</p>
              <Link 
                href="/collection/1"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
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


  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="text-white">
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src="/hero-section-image-2.jpg"
            alt="Shopping Cart"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute w-full top-1/2 transform -translate-y-1/2">
            <h1 className="text-4xl wrapper md:text-[60px] font-black tracking-tight text-white">
              SHOPPING CART
            </h1>
            <p className='text-white text-[15px] wrapper'>
              Your selected products and checkout
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="text-black">
        <div className="wrapper py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Cart Items */}
            <div className="flex-1">
              <h2 className="text-[40px] font-bold mb-8">Cart Items</h2>
              
              <div className="space-y-6">
                {transformedCartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200  p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover "
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.product.description}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                                {item.product.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              Added {new Date(item.addedDate).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col items-end gap-3">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">
                                LKR {(item.product.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                LKR {Number(item.product.price)?.toFixed(2)} each
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={isUpdating}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isUpdating ? '...' : '-'}
                              </button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={isUpdating}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isUpdating ? '...' : '+'}
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveFromCart(item.id, item.product.name)}
                              disabled={isRemoving}
                              className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRemoving ? 'Removing...' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:w-96">
              <div className="bg-gray-50 p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({itemCount})</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Discount </span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4  transition-colors duration-300">
                    Proceed to Checkout
                  </button>
                  <Link 
                    href="/collection/1"
                    className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4  transition-colors duration-300 text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• Free shipping on orders over $100</p>
                    <p>• 30-day return policy</p>
                    <p>• Secure checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default CartPage
