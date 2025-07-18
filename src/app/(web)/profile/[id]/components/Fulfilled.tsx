'use client'
import React, { useState, useEffect } from 'react'

interface FulfilledOrder {
  id: string
  orderNumber: string
  date: string
  deliveredDate: string
  total: number
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    reviewed: boolean
  }>
}

interface FulfilledProps {
  userId: string
}

const Fulfilled = ({ userId }: FulfilledProps) => {
  const [fulfilledOrders, setFulfilledOrders] = useState<FulfilledOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFulfilledOrders = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const mockFulfilledOrders: FulfilledOrder[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: '2024-01-15',
          deliveredDate: '2024-01-20',
          total: 299.99,
          items: [
            {
              id: '1',
              name: 'Tiger Hawk Pro Headlamp',
              quantity: 1,
              price: 299.99,
              reviewed: true
            }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: '2024-01-20',
          deliveredDate: '2024-01-25',
          total: 159.98,
          items: [
            {
              id: '2',
              name: 'Outdoor Adventure Flashlight',
              quantity: 2,
              price: 79.99,
              reviewed: false
            }
          ]
        }
      ]
      
      setFulfilledOrders(mockFulfilledOrders)
      setLoading(false)
    }

    fetchFulfilledOrders()
  }, [userId])

  const handleReview = (orderId: string, itemId: string) => {
    // Handle review functionality
    console.log('Review requested for order:', orderId, 'item:', itemId)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Fulfilled Orders</h2>
        <p className="text-sm text-gray-600 mt-1">Orders that have been delivered</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {fulfilledOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fulfilled orders</h3>
            <p className="text-gray-600">You haven't received any orders yet.</p>
          </div>
        ) : (
          fulfilledOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">
                    Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800">
                    Delivered
                  </span>
                  <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">
                    Order successfully delivered
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                      {item.reviewed ? (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                          Reviewed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReview(order.id, item.id)}
                          className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-500 border border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Write Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-500">
                  Reorder
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Fulfilled 