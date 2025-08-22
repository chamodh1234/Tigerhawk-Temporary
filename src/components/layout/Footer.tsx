'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Logo from '@/public/logo.png'
import { useGetMainCategoriesQuery } from '@/lib/redux/apiSlice'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  // Fetch main categories
  const { data: mainCategoriesData } = useGetMainCategoriesQuery(undefined)

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    services: [
      { name: 'Custom Solutions', href: '/services/custom' },
      { name: 'Bulk Orders', href: '/services/bulk' },
      { name: 'Rental Services', href: '/services/rental' },
      { name: 'Maintenance', href: '/services/maintenance' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Returns', href: '/returns' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-[#fffb002c] text-black">
      <div className="wrapper py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
          <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 ">
                            <Image
                                src={Logo}
                                alt="Tiger Hawk Logo"
                                width={60}
                                height={60}
                              style={{paddingTop: '4px'}}
                                className=" bg-black"
                            />
                            {/* <span className="text-xl font-bold text-gray-900">TIGER HAWK</span> */}
                        </Link>
                    </div>
            <p className=" mb-4 max-w-md mt-4">
              Trusted Performance in Every Step. Tiger Hawk is your companion for all things bright and safe, 
              whether you're camping, hiking, or facing an emergency.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 ">
                <Mail size={16} />
                <span>info@tigerhawk.com</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <Phone size={16} />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-2 ">
                <MapPin size={16} />
                <span>123 Adventure St, Outdoor City, OC 12345</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="  transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {mainCategoriesData?.data?.map((category: any) => (
                <li key={category.id}>
                  <Link 
                    href={`/collection/${category.id}`}
                    className="  transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              )) || (
                // Fallback to loading state or empty state
                <li className="text-gray-500">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Services & Support */}
          <div>
            {/* <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="  transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul> */}
            
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="  transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className=" text-sm">
              © {currentYear} Tiger Hawk. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="  transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link href="/policies/privacy-policy" className="  transition-colors">
                Privacy Policy
              </Link>
              <Link href="/policies/terms-conditions" className="  transition-colors">
                Terms of Service
              </Link>
              {/* <Link href="/cookies" className="  transition-colors">
                Cookie Policy
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 