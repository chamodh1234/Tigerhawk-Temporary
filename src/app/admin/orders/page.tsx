'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/lib/redux/apiSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { setOrders, setSelectedOrder, updateOrderStatus } from '@/lib/redux/slices/ordersSlice'
import type { Order, OrderItem } from '@/lib/types/order'
import { FaEye } from 'react-icons/fa'

const PAGE_SIZE = 8

export default function AdminOrdersPage() {
  const dispatch = useAppDispatch()
  const { orders, selectedOrder } = useAppSelector((state) => state.orders)
  const [page, setPage] = useState(1)
  
  // Fetch orders from backend
  const { data: ordersData, isLoading, error } = useGetOrdersQuery()
  const [updateStatus] = useUpdateOrderStatusMutation()

  // Update local state when data is fetched
  useEffect(() => {
    if (ordersData) {
      dispatch(setOrders(ordersData?.data || []))
    }
  }, [ordersData, dispatch])

  console.log("ordersData", ordersData)
  const totalPages = Math.ceil(orders.length / PAGE_SIZE)
  const paginatedOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  async function handleStatusChange(orderId: string, status: string) {
    try {
      const confirm = window.confirm("Are you sure you want to update the order status?")
      if (!confirm) return
      await updateStatus({ orderId, status }).unwrap()
      dispatch(updateOrderStatus({ orderId, status }))
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  function handleView(order: Order) {
    dispatch(setSelectedOrder(order))
  }

  function handleCloseModal() {
    dispatch(setSelectedOrder(null))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading orders...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> Failed to load orders. Please try again.
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 ">Order ID</th>
              <th className="px-4 py-2 ">Customer</th>
              <th className="px-4 py-2 ">Date</th>
              <th className="px-4 py-2 ">Total</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No orders found.</td>
              </tr>
            ) : (
              paginatedOrders.map(order => (
                <tr key={order.id} className={` ${order.status === 'pending' ? 'bg-orange-500' : order.status === 'delivered' ? 'bg-green-500' : 'bg-green-100'}`}>
                  <td className="px-4 py-2  text-center">{order.order_id}</td>
                  <td className="px-4 py-2 text-center">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-2 text-center">{new Date(order.ordered_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center">${order.total_price}</td>
                  <td className="px-4 py-2 text-center">
                    <select
                      className="border rounded px-2 py-1"
                      value={order.status}
                      onChange={e => handleStatusChange(order.id.toString(), e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleView(order)}
                    >
                      <FaEye size={25} className='text-black cursor-pointer' />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}
      
      {/* Pagination */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* Order Details Modal */}
      <Modal open={!!selectedOrder} onClose={handleCloseModal}>
        {selectedOrder && (
          <div className={`space-y-4 `}>
            <h2 className="text-xl font-bold mb-2">Order Details</h2>
            <div><span className="font-semibold">Order ID:</span> {selectedOrder.order_id}</div>
            <div><span className="font-semibold">Customer:</span> {selectedOrder.user?.name || 'N/A'}</div>
            <div><span className="font-semibold">Email:</span> {selectedOrder.user?.email || 'N/A'}</div>
            <div><span className="font-semibold">Address:</span> {selectedOrder.delivery_address}</div>
            <div><span className="font-semibold">Date:</span> {new Date(selectedOrder.ordered_date).toLocaleDateString()}</div>
            <div><span className="font-semibold">Total Price:</span> ${selectedOrder.total_price}</div>
            <div><span className="font-semibold">Total Quantity:</span> {selectedOrder.total_quantity}</div>
            <div><span className="font-semibold">Status:</span> {selectedOrder.status}</div>
            <div>
              <span className="font-semibold">Order Items:</span>
              <ul className="list-disc ml-6 mt-1">
                {selectedOrder.order_items?.map((item: any, idx: number) => (
                  <li key={idx}>{item?.product?.name}: {item.quantity} - Price: ${item.price}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 