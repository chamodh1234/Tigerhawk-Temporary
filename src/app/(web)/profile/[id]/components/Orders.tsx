'use client'
import React, { useState, useEffect } from 'react'

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }>
}

interface OrdersProps {
  userId: string
}

const Orders = ({ userId }: OrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchOrders = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 299.99,
          items: [
            {
              id: '1',
              name: 'Tiger Hawk Pro Headlamp',
              quantity: 1,
              price: 299.99,
              image: '/hero-section-image.jpg'
            }
          ]
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 159.98,
          items: [
            {
              id: '2',
              name: 'Outdoor Adventure Flashlight',
              quantity: 2,
              price: 79.99,
              image: '/hero-section-image-2.jpg'
            }
          ]
        }
      ]
      
      setOrders(mockOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [userId])

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
        <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
        <p className="text-sm text-gray-600 mt-1">View and manage your order history</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {orders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50">
                    <div className="w-16 h-16 bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1">
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
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders 