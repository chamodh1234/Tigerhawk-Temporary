'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { FaShieldAlt, FaFileContract, FaTruck, FaUndo, FaUserShield, FaCreditCard } from 'react-icons/fa'

interface PolicyContent {
  title: string
  icon: React.ReactNode
  lastUpdated: string
  content: React.ReactNode
}

const PoliciesPage = () => {
  const params = useParams()
  const policyId = params.id as string

  // Policy content mapping
  const policies: Record<string, PolicyContent> = {
    'privacy-policy': {
      title: 'Privacy Policy',
      icon: <FaUserShield className="text-blue-600" />,
      lastUpdated: 'December 15, 2024',
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
            <p className="text-gray-700 mb-3">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
            <p className="text-gray-700 mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h3>
            <p className="text-gray-700">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except as described in this policy. We may share information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-3">
              <li>Payment processors to complete transactions</li>
              <li>Shipping partners to deliver your orders</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h3>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
            <p className="text-gray-700 mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </section>
        </div>
      )
    },
    'terms-conditions': {
      title: 'Terms & Conditions',
      icon: <FaFileContract className="text-green-600" />,
      lastUpdated: 'December 15, 2024',
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h3>
            <p className="text-gray-700">
              By accessing and using our website and services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use License</h3>
            <p className="text-gray-700 mb-3">
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on Tiger Hawk's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-700 mb-3">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Information</h3>
            <p className="text-gray-700 mb-3">
              We strive to provide accurate product information, including descriptions, prices, and availability. 
              However, we do not warrant that product descriptions or other content is accurate, complete, 
              reliable, current, or error-free.
            </p>
            <p className="text-gray-700">
              Product images are for illustrative purposes only and may not reflect the exact appearance 
              of the product received.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Pricing and Payment</h3>
            <p className="text-gray-700 mb-3">
              All prices are subject to change without notice. We reserve the right to modify or discontinue 
              any product at any time.
            </p>
            <p className="text-gray-700 mb-3">
              Payment must be made at the time of order placement. We accept various payment methods 
              as indicated on our checkout page.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700">
              In no event shall Tiger Hawk or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or 
              inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Governing Law</h3>
            <p className="text-gray-700">
              These terms and conditions are governed by and construed in accordance with the laws of 
              [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts 
              in that location.
            </p>
          </section>
        </div>
      )
    },
    'shipping-policy': {
      title: 'Shipping Policy',
      icon: <FaTruck className="text-orange-600" />,
      lastUpdated: 'December 15, 2024',
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Processing Time</h3>
            <p className="text-gray-700 mb-3">
              Orders are typically processed within 1-2 business days after payment confirmation. 
              Processing times may be longer during peak seasons or sales events.
            </p>
            <p className="text-gray-700">
              Orders placed after 2:00 PM EST will be processed the next business day.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Methods</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Standard Shipping (3-5 business days)</h4>
                <p className="text-gray-700">Free on orders over $50, $5.99 for orders under $50</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">Express Shipping (1-2 business days)</h4>
                <p className="text-gray-700">$12.99 for all orders</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">Overnight Shipping</h4>
                <p className="text-gray-700">$24.99 for all orders (order by 12:00 PM EST)</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Destinations</h3>
            <p className="text-gray-700 mb-3">
              We currently ship to all 50 US states and territories. International shipping is not 
              available at this time.
            </p>
            <p className="text-gray-700">
              Shipping to Alaska, Hawaii, and US territories may require additional time and cost.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Tracking</h3>
            <p className="text-gray-700 mb-3">
              Once your order ships, you will receive a confirmation email with tracking information. 
              You can also track your order through your account dashboard.
            </p>
            <p className="text-gray-700">
              Tracking information is typically available within 24 hours of shipment.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Delivery Issues</h3>
            <p className="text-gray-700 mb-3">
              If you experience any issues with delivery, please contact our customer service team 
              within 30 days of the expected delivery date.
            </p>
            <p className="text-gray-700">
              We are not responsible for delays caused by weather, natural disasters, or other 
              circumstances beyond our control.
            </p>
          </section>
        </div>
      )
    },
    'return-policy': {
      title: 'Return Policy',
      icon: <FaUndo className="text-red-600" />,
      lastUpdated: 'December 15, 2024',
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Window</h3>
            <p className="text-gray-700 mb-3">
              We accept returns within 30 days of the original purchase date. Items must be in 
              their original condition, unused, and in the original packaging.
            </p>
            <p className="text-gray-700">
              Returns initiated after 30 days will not be accepted.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Process</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>Contact our customer service team to initiate a return</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive a return authorization number (RMA)</li>
              <li>Package the item securely with the RMA number visible</li>
              <li>Ship the item back using a trackable shipping method</li>
              <li>Wait for processing and refund (5-10 business days)</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Non-Returnable Items</h3>
            <p className="text-gray-700 mb-3">The following items cannot be returned:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Personalized or custom items</li>
              <li>Items marked as "Final Sale"</li>
              <li>Damaged or used items</li>
              <li>Items without original packaging</li>
              <li>Gift cards</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Information</h3>
            <p className="text-gray-700 mb-3">
              Refunds will be processed within 5-10 business days of receiving your return. 
              The refund will be issued to the original payment method.
            </p>
            <p className="text-gray-700 mb-3">
              Shipping costs are non-refundable unless the return is due to our error.
            </p>
            <p className="text-gray-700">
              Restocking fees may apply to certain items.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Exchanges</h3>
            <p className="text-gray-700 mb-3">
              We offer exchanges for items of equal or greater value. If the new item costs more, 
              you will be charged the difference. If it costs less, you will receive a refund for the difference.
            </p>
            <p className="text-gray-700">
              Exchanges follow the same process as returns and are subject to the same conditions.
            </p>
          </section>
        </div>
      )
    },
    'payment-policy': {
      title: 'Payment Policy',
      icon: <FaCreditCard className="text-purple-600" />,
      lastUpdated: 'December 15, 2024',
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Accepted Payment Methods</h3>
            <p className="text-gray-700 mb-3">We accept the following payment methods:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Credit cards (Visa, MasterCard, American Express, Discover)</li>
              <li>Debit cards</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Security</h3>
            <p className="text-gray-700 mb-3">
              All payments are processed securely through our trusted payment partners. 
              We do not store your credit card information on our servers.
            </p>
            <p className="text-gray-700">
              Our website uses SSL encryption to protect your personal and payment information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing Information</h3>
            <p className="text-gray-700 mb-3">
              The billing address must match the address associated with your payment method. 
              Orders with mismatched billing information may be delayed or cancelled.
            </p>
            <p className="text-gray-700">
              We may request additional verification for high-value orders.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Processing</h3>
            <p className="text-gray-700 mb-3">
              Payment is processed at the time of order placement. Your card will be charged 
              immediately upon successful order confirmation.
            </p>
            <p className="text-gray-700">
              Failed payments will result in order cancellation.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Currency</h3>
            <p className="text-gray-700">
              All prices are displayed in US Dollars (USD). International customers will see 
              prices converted to their local currency at checkout, but the final charge will be in USD.
            </p>
          </section>
        </div>
      )
    }
  }

  // Get the policy content based on ID
  const policy = policies[policyId]

  // If policy not found, show 404
  if (!policy) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaShieldAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Policy Not Found</h1>
            <p className="text-gray-600 mb-8">
              The policy you're looking for doesn't exist.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl">
              {policy.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{policy.title}</h1>
              <p className="text-gray-600">Last updated: {policy.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {policy.content}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            If you have any questions about this policy, please contact us at{' '}
            <a href="mailto:support@tigerhawk.com" className="text-blue-600 hover:text-blue-700">
              support@tigerhawk.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage