'use client'
import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useCreateMessageMutation } from '@/lib/redux/apiSlice'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // API mutation for submitting contact form
  const [createMessage, { isLoading: isCreatingMessage }] = useCreateMessageMutation()

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+1 234 567 8900', '+1 234 567 8901'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@tigerhawk.com', 'support@tigerhawk.com'],
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['123 Adventure St', 'Outdoor City, OC 12345', 'United States'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/tigerhawk', color: 'text-blue-600 hover:text-blue-700' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/tigerhawk', color: 'text-sky-500 hover:text-sky-600' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/tigerhawk', color: 'text-pink-600 hover:text-pink-700' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/tigerhawk', color: 'text-blue-700 hover:text-blue-800' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/1234567890', color: 'text-green-600 hover:text-green-700' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        toast.error('Please fill in all required fields.')
        return
      }

      // Submit message using API mutation
      const response = await createMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      }).unwrap()

      if (response.success) {
        toast.success('Thank you for your message! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        toast.error(response.message || 'Failed to send message. Please try again.')
      }
    } catch (error: any) {
      console.error('Contact form submission error:', error)
      toast.error(error?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get in touch with our team. We're here to help with any questions about our products, 
            support, or business inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Choose your preferred way to reach us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${info.bgColor} mb-4`}>
                  <info.icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="sales">Sales Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isCreatingMessage}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isCreatingMessage ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                After you send the message, we will contact you through email or phone.
              </p>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Visit Our Office
                </h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">123 Adventure St, Outdoor City, OC 12345</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-blue-600 mr-3" />
                    <a href="tel:+12345678900" className="text-gray-700 hover:text-blue-600">
                      +1 234 567 8900
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="h-5 w-5 text-green-600 mr-3" />
                    <a href="mailto:info@tigerhawk.com" className="text-gray-700 hover:text-green-600">
                      info@tigerhawk.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FaWhatsapp className="h-5 w-5 text-green-600 mr-3" />
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600">
                      WhatsApp Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What are your shipping options?
                </h3>
                <p className="text-gray-600">
                  We offer standard (3-5 days), express (1-2 days), and overnight shipping. 
                  Free shipping on orders over $50.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer international shipping?
                </h3>
                <p className="text-gray-600">
                  Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is your return policy?
                </h3>
                <p className="text-gray-600">
                  We accept returns within 30 days of purchase. Items must be in original condition and packaging.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How can I get technical support?
                </h3>
                <p className="text-gray-600">
                  Contact our technical support team via email, phone, or live chat. 
                  We typically respond within 24 hours.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer bulk discounts?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer special pricing for bulk orders and business customers. 
                  Contact our sales team for a quote.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are your products covered by warranty?
                </h3>
                <p className="text-gray-600">
                  All our products come with a minimum 1-year warranty. 
                  Extended warranty options are available for select items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our products or get in touch with our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </a>
            <a
              href="tel:+12345678900"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUsPage
