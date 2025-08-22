'use client'
import React from 'react'
import type { Order } from '@/lib/types/order'

interface FulfilledProps {
  orders: Order[]
  isLoading: boolean
  error: any
}

const Fulfilled = ({orders, isLoading, error }: FulfilledProps) => {
  const handleReview = (orderId: string, itemId: string) => {
    // Handle review functionality
    console.log('Review requested for order:', orderId, 'item:', itemId)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> Failed to load orders. Please try again.
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
        {orders.length === 0 ? (
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
          orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{order.order_id}</h3>
                  <p className="text-sm text-gray-600">
                    Delivered on {new Date(order.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800">
                    Delivered
                  </span>
                  <span className="text-lg font-semibold text-gray-900">${order.total_price.toFixed(2)}</span>
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
                {order.order_items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product?.name || 'Product'}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900">${parseFloat(item.price).toFixed(2)}</span>
                      <button
                        onClick={() => handleReview(order.id.toString(), index.toString())}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-500 border border-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Write Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
            
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Fulfilled 