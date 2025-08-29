'use client'
import React, { useState } from 'react'
import { useGetInquiriesQuery, useGetProductsForInquiryQuery, useUpdateInquiryMutation } from '@/lib/redux/apiSlice'
import { FaEye, FaCheck, FaClock, FaUser, FaEnvelope, FaPhone, FaComments, FaCalendar, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Inquiry {
  id: number
  product_id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  marked?: boolean
}

const InquiriesPage = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'responded'>('all')
  const [updateInquiry] = useUpdateInquiryMutation()
  


  const { data: inquiriesData, isLoading, error, refetch } = useGetInquiriesQuery(undefined)

  const markAsResponded = async (inquiryId: number , con: boolean = true) => {
   
    try {
        const confirm = con ? window.confirm('Are you sure you want to mark this inquiry as responded?') : window.confirm('Are you sure you want to unmark this inquiry as responded?')
        if(!confirm) return
        const response = await updateInquiry({id: inquiryId, marked: true}).unwrap()
        
        if(response.success){   console.log(response) 
            toast.success('Inquiry marked as responded')
        }else{
            toast.error('Failed to mark inquiry as responded')
        }
      refetch()
    } catch (error) {
      toast.error('Failed to mark inquiry as responded')
    }
  }

  const filteredInquiries = React.useMemo(() => {
    if (!inquiriesData?.data) return []
    
    let inquiries = inquiriesData.data
    
    if (filterStatus === 'pending') {
      inquiries = inquiries.filter((inquiry: Inquiry) => !inquiry.marked)
    } else if (filterStatus === 'responded') {
      inquiries = inquiries.filter((inquiry: Inquiry) => inquiry.marked)
    }
    
    return [...inquiries].sort((a: Inquiry, b: Inquiry) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }, [inquiriesData?.data, filterStatus])

  console.log(filteredInquiries)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Inquiries</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries Management</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaComments className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiriesData?.data?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FaClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiriesData?.data?.filter((inquiry: Inquiry) => !inquiry.marked).length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Responded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiriesData?.data?.filter((inquiry: Inquiry) => inquiry.marked).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'responded')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Inquiries</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Inquiries</h2>
          </div>
          
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12">
              <FaComments className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
              <p className="text-gray-600">
                {filterStatus === 'all' 
                  ? 'There are no inquiries yet.' 
                  : `No ${filterStatus} inquiries found.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                  
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry: Inquiry) => (
                    <tr key={inquiry.id} className={` ${inquiry.marked ? 'bg-green-500' : 'bg-white'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                            <div className="text-sm text-gray-500">Product ID: {inquiry.product_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{inquiry.email}</div>
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          inquiry.marked 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {inquiry.marked ? 'Responded' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inquiry)
                              setShowModal(true)
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <FaEye className="h-4 w-4" />
                          </button>
                          {!inquiry.marked ? (
                            <button
                              onClick={() => markAsResponded(inquiry.id)}
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Mark as responded"
                            >
                              <FaCheck className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsResponded(inquiry.id, false)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Unmark as responded"
                            >
                              <FaTimes className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && selectedInquiry && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Inquiry Details</h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedInquiry(null)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Customer Name</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Product ID</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.product_id}</p>
                    </div>
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Email</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Phone</label>
                      <p className="text-sm text-gray-900">{selectedInquiry.phone}</p>
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm  text-gray-700 font-bold mb-1">Message</label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Created At</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedInquiry.created_at)}</p>
                    </div>
                    <div>
                      <label className="block text-sm  text-gray-700 font-bold mb-1">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedInquiry.marked 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedInquiry.marked ? 'Responded' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  {!selectedInquiry.marked ? (
                    <button
                      onClick={() => {
                        markAsResponded(selectedInquiry.id)
                        setShowModal(false)
                        setSelectedInquiry(null)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark as Responded
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                    markAsResponded(selectedInquiry.id, false)
                        setShowModal(false)
                        setSelectedInquiry(null)
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                     Unmark as Responded
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedInquiry(null)
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InquiriesPage