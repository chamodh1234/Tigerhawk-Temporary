'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import ProfileNavigation from './components/ProfileNavigation'
import Orders from './components/Orders'
import Pending from './components/Pending'
import Fulfilled from './components/Fulfilled'
import OrderTracking from './components/OrderTracking'
import ProfileSettings from './components/ProfileSettings'

type TabType = 'orders' | 'pending' | 'fulfilled' | 'tracking' | 'settings'

const ProfilePage = () => {
  const params = useParams()
  const userId = params.id as string
  const [activeTab, setActiveTab] = useState<TabType>('orders')

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'fulfilled', label: 'Fulfilled' },
    { id: 'tracking', label: 'Order Tracking' },
    { id: 'settings', label: 'Profile Settings' }
  ]

  const renderComponent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders userId={userId} />
      case 'pending':
        return <Pending userId={userId} />
      case 'fulfilled':
        return <Fulfilled userId={userId} />
      case 'tracking':
        return <OrderTracking userId={userId} />
      case 'settings':
        return <ProfileSettings userId={userId} />
      default:
        return <Orders userId={userId} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">Manage your orders and profile settings</p>
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