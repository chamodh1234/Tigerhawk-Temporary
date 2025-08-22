'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetOrdersQuery, useLogoutMutation } from '@/lib/redux/apiSlice'
import { useAppDispatch } from '@/lib/redux/store'
import { logout } from '@/lib/redux/slices/authSlice'
import ProfileNavigation from './components/ProfileNavigation'
import Orders from './components/Orders'
import Pending from './components/Pending'
import Fulfilled from './components/Fulfilled'
import OrderTracking from './components/OrderTracking'
import ProfileSettings from './components/ProfileSettings'
import type { Order } from '@/lib/types/order'
import { FaSignOutAlt } from 'react-icons/fa'

type TabType = 'orders' | 'pending' | 'delivered' | 'tracking' | 'settings'

const ProfilePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<TabType>('orders')
  const [userOrders, setUserOrders] = useState<Order[]>([])
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Fetch orders from backend
  const { data: ordersData, isLoading, error } = useGetOrdersQuery()
  const [logoutMutation] = useLogoutMutation()

  console.log("ordersData", ordersData)
  // Filter orders for the current user and update state
  useEffect(() => {
    if (ordersData?.data) {
    
      setUserOrders(ordersData.data)
    }
  }, [ordersData])

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'delivered', label: 'Delivered' },
    // { id: 'tracking', label: 'Order Tracking' },
    { id: 'settings', label: 'Profile Settings' }
  ]

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?')
    if (!confirmLogout) return

    setIsLoggingOut(true)
    try {
      await logoutMutation({}).unwrap()
      dispatch(logout())
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Logout failed:', error)
      // Even if API call fails, clear local state and redirect
      dispatch(logout())
      localStorage.removeItem('token')
      router.push('/auth/signin')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const renderComponent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders  orders={userOrders} isLoading={isLoading} error={error} />
      case 'pending':
        return <Pending  orders={userOrders.filter(order => order.status === 'pending')} isLoading={isLoading} error={error} />
      case 'delivered':
        return <Fulfilled  orders={userOrders.filter(order => order.status === 'delivered')} isLoading={isLoading} error={error} />
      // case 'tracking':
      //   return <OrderTracking  />
      case 'settings':
        return <ProfileSettings  />
      default:
        return <Orders  orders={userOrders} isLoading={isLoading} error={error} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-2">Manage your orders and profile settings</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md"
          >
            <FaSignOutAlt size={16} />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <ProfileNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as TabType)}
        />

        {/* Content Area */}
        <div className="mt-8">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage