'use client'
import React, { useState, useEffect } from 'react'

interface PendingOrder {
  id: string
  orderNumber: string
  date: string
  estimatedDelivery: string
  total: number
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

interface PendingProps {
  userId: string
}

const Pending = ({ userId }: PendingProps) => {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockPendingOrders: PendingOrder[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-003',
          date: '2024-01-25',
          estimatedDelivery: '2024-02-05',
          total: 199.99,
          items: [
            {
              id: '1',
              name: 'Tactical LED Torch',
              quantity: 1,
              price: 199.99
            }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-004',
          date: '2024-01-28',
          estimatedDelivery: '2024-02-08',
          total: 89.97,
          items: [
            {
              id: '2',
              name: 'Emergency Backup Light',
              quantity: 3,
              price: 29.99
            }
          ]
        }
      ]
      
      setPendingOrders(mockPendingOrders)
      setLoading(false)
    }

    fetchPendingOrders()
  }, [userId])

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
        <h2 className="text-xl font-semibold text-gray-900">Pending Orders</h2>
        <p className="text-sm text-gray-600 mt-1">Orders that are being processed</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {pendingOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
            <p className="text-gray-600">All your orders have been processed or delivered.</p>
          </div>
        ) : (
          pendingOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                  <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-yellow-800">
                    Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-500">
                  Contact Support
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Pending 