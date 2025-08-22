'use client'
import React, { useState, useEffect } from 'react'
import { useGetProductsForInquiryQuery, useSubmitInquiryMutation } from '@/lib/redux/apiSlice'
import type { InquiryFormData, ProductForInquiry } from '@/lib/types/inquiry'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Inquiry = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    contactNumber: '',
    product: '',
    message: ''
  })

  // API hooks
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsForInquiryQuery(undefined)
  const [submitInquiry, { isLoading: submitting }] = useSubmitInquiryMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.contactNumber.trim() || !formData.product || !formData.message.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }

    try {
      const inquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.contactNumber,
        product_id: parseInt(formData.product),
        message: formData.message
      }
        
      const result = await submitInquiry(inquiryData).unwrap()
      
            if (result.success) {
        console.log('Showing success toast:', result.message)
        toast.success(result.message)
        console.log(result)
        // Reset form
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          product: '',
          message: ''
        })
      } else {
        console.log('Showing error toast:', result.message)
        toast.error(result.message || 'Failed to submit inquiry')
      }
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error)
      console.log('Showing catch error toast:', error?.data?.message)
      toast.error(error?.data?.message || 'Failed to submit inquiry. Please try again.')
    }
  }

  return (
    <>
      <section className="wrapper mt-[250px] mb-[250px] ">
        {/* Header */}
        <div className="">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[60px] font-black text-center mb-4 tracking-tight">
              MAKE AN INQUIRY
            </h2>
            
          </div>
        </div>

        {/* Main Content - Form and Info Side by Side */}
        <div className="bg-white text-black">
          <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
              {/* Left Side - Information */}
              <div className="p-12 md:p-20 bg-gray-50 lg:flex lg:flex-col lg:justify-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
                      Why Make an Inquiry?
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our expert team is here to help you find the perfect lighting solution for your specific needs. Whether you're looking for professional equipment or personal use, we provide personalized recommendations.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Expert Consultation</h4>
                        <p className="text-gray-700">Get personalized advice from our lighting specialists who understand your requirements.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Product Recommendations</h4>
                        <p className="text-gray-700">Receive tailored suggestions based on your specific use case and environment.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Technical Support</h4>
                        <p className="text-gray-700">Access detailed specifications, compatibility information, and technical guidance.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Pricing & Availability</h4>
                        <p className="text-gray-700">Get current pricing, stock availability, and delivery timeframes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600 p-6 text-white">
                    <h4 className="text-xl font-bold mb-3">Response Time</h4>
                    <p className="text-blue-100">
                      We typically respond to all inquiries within 24 hours during business days. For urgent requests, please call us directly.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">Contact Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-semibold">Email:</span> info@tigerhawk.com</p>
                      <p className="text-gray-700"><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
                      <p className="text-gray-700"><span className="font-semibold">Hours:</span> Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-20  lg:flex lg:flex-col  ">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className='text-2xl font-bold text-gray-900 mb-6'>
                    Inquire Form
                  </p>
                  
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg focus:border-blue-600 focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg focus:border-blue-600 focus:outline-none"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Contact Number and Product Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactNumber" className="block text-lg font-bold text-gray-900 mb-3">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg focus:border-blue-600 focus:outline-none"
                        placeholder="Enter your contact number"
                      />
                    </div>
                    <div>
                      <label htmlFor="product" className="block text-lg font-bold text-gray-900 mb-3">
                        Select Product *
                      </label>
                      <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        disabled={productsLoading}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg focus:border-blue-600 focus:outline-none disabled:opacity-50"
                      >
                        <option value="">
                          {productsLoading ? 'Loading products...' : 'Choose a product'}
                        </option>
                        {productsData?.data?.map((product: ProductForInquiry) => (
                          <option key={product.id} value={product.id.toString()}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      {productsError && (
                        <p className="text-red-500 text-sm mt-1">Failed to load products. Please try again.</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-lg font-bold text-gray-900 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-300 text-gray-900 text-lg focus:border-blue-600 focus:outline-none resize-none"
                      placeholder="Tell us about your inquiry, requirements, or any specific questions you have about our products..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-12 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        
      </section>
    </>
  )
}

export default Inquiry 