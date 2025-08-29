'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useCreateMessageMutation } from '@/lib/redux/apiSlice'
import Image from 'next/image'
import Logo from '@/public/logo.png'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-200 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/hero-section-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce mb-8">
            <FaPhone className="h-20 w-20 text-yellow-400 mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Get in touch with our team. We're here to help with any questions about our products, 
            support, or business inquiries.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact-info" ref={setRef('contact-info')} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Choose your preferred way to reach us.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactInfo.map((info, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${info.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className={`h-10 w-10 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
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
      <section id="contact-form" ref={setRef('contact-form')} className="py-20 bg-gradient-to-r from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isCreatingMessage}
                  className="w-full primary-color-bg text-black py-4 px-8 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting || isCreatingMessage ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
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
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h3>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Interactive Map</p>
                    <p className="text-sm text-gray-500">123 Adventure St, Outdoor City, OC 12345</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center group">
                    <div className="p-3 bg-blue-100 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FaPhone className="h-5 w-5 text-blue-600" />
                    </div>
                    <a href="tel:+12345678900" className="text-gray-700 hover:text-blue-600 transition-colors">
                      +1 234 567 8900
                    </a>
                  </div>
                  <div className="flex items-center group">
                    <div className="p-3 bg-green-100 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FaEnvelope className="h-5 w-5 text-green-600" />
                    </div>
                    <a href="mailto:info@tigerhawk.com" className="text-gray-700 hover:text-green-600 transition-colors">
                      info@tigerhawk.com
                    </a>
                  </div>
                  <div className="flex items-center group">
                    <div className="p-3 bg-green-100 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FaWhatsapp className="h-5 w-5 text-green-600" />
                    </div>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600 transition-colors">
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
      <section id="faq" ref={setRef('faq')} className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-8">
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What are your shipping options?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer standard (3-5 days), express (1-2 days), and overnight shipping. 
                  Free shipping on orders over $50.
                </p>
              </div>
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Do you offer international shipping?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What is your return policy?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We accept returns within 30 days of purchase. Items must be in original condition and packaging.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How can I get technical support?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Contact our technical support team via email, phone, or live chat. 
                  We typically respond within 24 hours.
                </p>
              </div>
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Do you offer bulk discounts?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we offer special pricing for bulk orders and business customers. 
                  Contact our sales team for a quote.
                </p>
              </div>
              <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Are your products covered by warranty?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All our products come with a minimum 1-year warranty. 
                  Extended warranty options are available for select items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-200 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/hero-section-image-2.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our products or get in touch with our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-semibold rounded-full text-yellow-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Products
            </a>
            <a
              href="tel:+12345678900"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-lg font-semibold rounded-full text-white hover:bg-white hover:text-yellow-900 transition-all duration-300 transform hover:scale-105"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  )
}

export default ContactUsPage
