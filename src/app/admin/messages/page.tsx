'use client'
import { useGetMessagesQuery, useReplyToMessageMutation, useUpdateMessageStatusMutation } from '@/lib/redux/apiSlice'
import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaUser, FaCalendar, FaEye, FaReply, FaTrash, FaFilter, FaSearch, FaSort, FaEnvelopeOpen } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied' | 'archived'
  createdAt: string
  repliedAt?: string
}

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyData, setReplyData] = useState({
    subject: '',
    message: ''
  })
  const [isSendingReply, setIsSendingReply] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'subject'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const { data: messages, isLoading, error , refetch} = useGetMessagesQuery()
  const [updateMessageStatus] = useUpdateMessageStatusMutation()
  const [replyToMessage] = useReplyToMessageMutation()

  // Dummy data
  var dummyMessages: any[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 234 567 8901',
      subject: 'Product Inquiry',
      message: 'I\'m interested in your camping lanterns. Can you provide more information about the battery life and waterproof rating? Also, do you offer bulk discounts for outdoor clubs?',
      status: 'unread',
      createdAt: '2024-12-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234 567 8902',
      subject: 'Technical Support',
      message: 'I purchased the Tiger Hawk Pro flashlight last month and it\'s not charging properly. The LED indicator shows red but never turns green. Can you help me troubleshoot this issue?',
      status: 'read',
      createdAt: '2024-12-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 234 567 8903',
      subject: 'Bulk Order Request',
      message: 'I represent a security company and we\'re looking to purchase 50 headlamps for our night shift workers. Can you provide a quote and information about delivery times?',
      status: 'replied',
      createdAt: '2024-12-13T09:15:00Z',
      repliedAt: '2024-12-13T14:30:00Z'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 234 567 8904',
      subject: 'Partnership Inquiry',
      message: 'I run an outdoor adventure blog and would love to feature your products. Do you have a partnership program or would you be interested in sending samples for review?',
      status: 'unread',
      createdAt: '2024-12-12T16:20:00Z'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 234 567 8905',
      subject: 'Warranty Claim',
      message: 'My flashlight stopped working after 3 months of use. I have the receipt and would like to process a warranty claim. What information do you need from me?',
      status: 'read',
      createdAt: '2024-12-11T11:10:00Z'
    },
    {
      id: 6,
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '+1 234 567 8906',
      subject: 'General Inquiry',
      message: 'I love your products! Do you have any plans to release new colors for the camping lanterns? I\'d love to see some earth tones or camouflage options.',
      status: 'archived',
      createdAt: '2024-12-10T13:25:00Z'
    }
  ]

  console.log(messages)
  dummyMessages = !isLoading && messages?.data ? messages?.data : []

  // Filter and sort messages
  const filteredMessages = React.useMemo(() => {
    let filtered = dummyMessages

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(message => message.status === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort messages
    filtered = [...filtered].sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'name':
          aValue = a.message_record.name.toLowerCase()
          bValue = b.message_record.name.toLowerCase()
          break
        case 'subject':
          aValue = a.subject.toLowerCase()
          bValue = b.subject.toLowerCase()
          break
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [dummyMessages, filterStatus, searchTerm, sortBy, sortOrder])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800'
      case 'read':
        return 'bg-blue-100 text-blue-800'
      case 'replied':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }



  const markAsRead = (messageId: number) => {
    // TODO: Add API call to mark message as read
    toast.success('Message marked as read')
  }

  const markAsReplied = (messageId: number) => {
    // TODO: Add API call to mark message as replied
    toast.success('Message marked as replied')
  }

  const archiveMessage = (messageId: number) => {
    // TODO: Add API call to archive message
    toast.success('Message archived')
  }

  const deleteMessage = (messageId: number) => {
    // TODO: Add API call to delete message
    toast.success('Message deleted')
  }

  const openMessageModal = async (message: Message) => {
    const respond = await updateMessageStatus({
      id: message.id,
    }).unwrap()

    if(respond.status){
      refetch()
    }
    setSelectedMessage(message)
    setShowModal(true)
    if (message.status === 'unread') {
      markAsRead(message.id)
    }
  }

  const openReplyModal = (message: any) => {
    setSelectedMessage(message)
    setReplyData({
      subject: `Re: ${message.message_record?.subject || 'Your Inquiry'}`,
      message: ''
    })
    setShowReplyModal(true)
  }

  const handleReplyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReplyData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSendReply = async () => { 
    setIsSendingReply(true)
    if (!replyData.subject.trim() || !replyData.message.trim()) {
      toast.error('Please fill in both subject and message')
      return
    }

    const respond = await replyToMessage({
      id: selectedMessage.id,
      message: replyData.message
    }).unwrap()

    if(respond.status){
      refetch()
    }
   
    try {
      // Simulate API call for sending reply
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update message status to replied
      await updateMessageStatus({
        id: selectedMessage.id,
      }).unwrap()

      toast.success('Reply sent successfully!')
      setShowReplyModal(false)
      setReplyData({ subject: '', message: '' })
      setSelectedMessage(null)
    } catch (error) {
      toast.error('Failed to send reply. Please try again.')
    } finally {
      setIsSendingReply(false)
    }
  }

  const stats = {
    total: dummyMessages.length,
    unread: dummyMessages.filter(m => m.status === 'unread').length,
    replied: dummyMessages.filter(m => m.status === 'replied').length,
    archived: dummyMessages.filter(m => m.status === 'archived').length
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Manage contact form submissions and customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-gray-900">{stats.replied}</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FaEnvelope className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            
            </select>



            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="subject">Sort by Subject</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-center"
            >
              <FaSort className={`h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Messages ({filteredMessages.length})
            </h2>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <FaEnvelope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No messages have been received yet.'
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
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className={`hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{message.message_record.name}</div>
                            <div className="text-sm text-gray-500">{message.message_record.email}</div>
                            {message.message_record.phone && (
                              <div className="text-sm text-gray-500">{message.message_record.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(message.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openMessageModal(message)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="View Details"
                          >
                            <FaEye className="h-4 w-4" />
                          </button>
                          {message.status !== 'replied' && (
                            <button
                              onClick={() => openReplyModal(message)}
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Reply to Message"
                            >
                              <FaReply className="h-4 w-4" />
                            </button>
                          )}
                          {/* {message.status !== 'archived' && (
                            <button
                              onClick={() => archiveMessage(message.id)}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                              title="Archive"
                            >
                              <FaEnvelopeOpen className="h-4 w-4" />
                            </button>
                          )} */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message Detail Modal */}
        {showModal && selectedMessage && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedMessage(null)
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                      <p className="text-sm text-gray-900">{selectedMessage.message_record.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <p className="text-sm text-gray-900">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-sm text-gray-900">{selectedMessage.message_record.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-sm text-gray-900">{selectedMessage.message_record.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMessage.status)}`}>
                        {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Received</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>

                  {selectedMessage.repliedAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Replied At</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedMessage.repliedAt)}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedMessage(null)
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => {
                        markAsReplied(selectedMessage.id)
                        setShowModal(false)
                        setSelectedMessage(null)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Mark as Replied
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedMessage && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reply to Message</h3>
                  <button
                    onClick={() => {
                      setShowReplyModal(false)
                      setSelectedMessage(null)
                      setReplyData({ subject: '', message: '' })
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Original Message Info */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-md font-bold text-gray-700 mb-2">Original Message</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-black font-bold">From:</span> {selectedMessage.message_record.name}
                      </div>
                      <div>
                        <span className="text-black font-bold">Subject:</span> {selectedMessage.subject}
                      </div>
                      <div>
                        <span className="text-black font-bold">Email:</span> {selectedMessage.message_record.email}
                      </div>
                      <div>
                        <span className="text-black font-bold">Date:</span> {formatDate(selectedMessage.created_at)}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-black font-bold">Message:</span>
                      <p className="text-gray-900 mt-1">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Reply Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                      disabled={true}
                        type="text"
                        name="subject"
                        value={selectedMessage.subject}
                        onChange={handleReplyInputChange}
                        className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter subject..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reply Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={replyData.message}
                        onChange={handleReplyInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your reply message..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowReplyModal(false)
                      setSelectedMessage(null)
                      setReplyData({ subject: '', message: '' })
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    disabled={isSendingReply}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    disabled={isSendingReply || !replyData.subject.trim() || !replyData.message.trim() || isLoading} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingReply ? 'Sending...' : 'Send Reply'}
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

export default MessagesPage