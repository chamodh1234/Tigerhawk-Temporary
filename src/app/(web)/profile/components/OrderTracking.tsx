'use client'
import React, { useState } from 'react'

interface TrackingStep {
  id: string
  title: string
  description: string
  status: 'completed' | 'current' | 'pending'
  date?: string
  time?: string
}

interface TrackingOrder {
  id: string
  orderNumber: string
  trackingNumber: string
  status: 'in-transit' | 'out-for-delivery' | 'delivered' | 'pending'
  estimatedDelivery: string
  currentLocation?: string
  steps: TrackingStep[]
}

interface OrderTrackingProps {
  userId: string
}

const OrderTracking = ({ userId }: OrderTrackingProps) => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [searching, setSearching] = useState(false)
  const [trackingData, setTrackingData] = useState<TrackingOrder | null>(null)

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return
    
    setSearching(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock tracking data
    const mockTrackingData: TrackingOrder = {
      id: '1',
      orderNumber: 'ORD-2024-003',
      trackingNumber: trackingNumber,
      status: 'in-transit',
      estimatedDelivery: '2024-02-05',
      currentLocation: 'Distribution Center, New York',
      steps: [
        {
          id: '1',
          title: 'Order Placed',
          description: 'Your order has been confirmed',
          status: 'completed',
          date: '2024-01-25',
          time: '10:30 AM'
        },
        {
          id: '2',
          title: 'Order Processed',
          description: 'Your order is being prepared for shipment',
          status: 'completed',
          date: '2024-01-26',
          time: '2:15 PM'
        },
        {
          id: '3',
          title: 'Shipped',
          description: 'Your order is on its way',
          status: 'completed',
          date: '2024-01-27',
          time: '9:45 AM'
        },
        {
          id: '4',
          title: 'In Transit',
          description: 'Package is being transported to your location',
          status: 'current',
          date: '2024-01-28',
          time: '11:20 AM'
        },
        {
          id: '5',
          title: 'Out for Delivery',
          description: 'Package is out for delivery',
          status: 'pending'
        },
        {
          id: '6',
          title: 'Delivered',
          description: 'Package has been delivered',
          status: 'pending'
        }
      ]
    }
    
    setTrackingData(mockTrackingData)
    setSearching(false)
  }

  const getStepIcon = (status: TrackingStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'current':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'pending':
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Your Order</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={searching || !trackingNumber.trim()}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {searching ? 'Searching...' : 'Track'}
          </button>
        </div>
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tracking: {trackingData.trackingNumber}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order Number:</span>
                <p className="font-medium">{trackingData.orderNumber}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-medium capitalize">{trackingData.status.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="text-gray-600">Estimated Delivery:</span>
                <p className="font-medium">{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            </div>
            {trackingData.currentLocation && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Current Location:</span> {trackingData.currentLocation}
                </p>
              </div>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Tracking Timeline</h4>
            <div className="relative">
              {trackingData.steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    {getStepIcon(step.status)}
                    {index < trackingData.steps.length - 1 && (
                      <div className={`w-0.5 h-8 mt-2 ${
                        step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900">{step.title}</h5>
                      {step.date && (
                        <span className="text-sm text-gray-500">
                          {new Date(step.date).toLocaleDateString()} {step.time}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!trackingData && !searching && (
        <div className="bg-white shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Track Your Order</h3>
          <p className="text-gray-600">Enter your tracking number above to see the latest updates.</p>
        </div>
      )}
    </div>
  )
}

export default OrderTracking 