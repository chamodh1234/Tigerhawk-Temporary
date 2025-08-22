import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo.png'
import { Home, Package, ShoppingCart, Archive, Image as ImageIcon, Users, Settings, LogOut, ChevronLeft, ChevronRight, MessageCircle,MessageCircleReply, Mail } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  {name : 'Inquiries', href: '/admin/inquiries', icon: Mail},
  { name: 'Inventory', href: '/admin/inventory', icon: Archive },
  { name: 'Messages', href: '/admin/messages', icon: MessageCircleReply },
  { name: 'Content', href: '/admin/content', icon: ImageIcon },
  { name: 'Roles', href: '/admin/roles', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

const sampleUser = {
  name: 'Jane Doe',
  role: 'Administrator',
  avatar: '/4443594 1.png',
}

interface AdminSidebarProps {
  currentPath: string
}

export function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col justify-between  shadow-xl z-40 bg-white transition-all duration-300
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
      aria-label="Admin sidebar"
    >
      <div>
{/* Top: Logo & Toggle */}
      <div className="relative">
        {/* Logo & Brand (centered, unaffected by toggle button) */}
        <div className="flex flex-col items-center py-6">
          <Image
            src={Logo}
            alt="Tiger Hawk Logo"
            width={collapsed ? 36 : 48}
            height={collapsed ? 36 : 48}
            className="rounded-full bg-black transition-all duration-300"
          />
          {!collapsed && (
            <span className="mt-2 text-lg font-bold tracking-wide text-black">Tiger Hawk</span>
          )}
        </div>
        {/* Collapse/Expand Button (absolute, top-right, above border, with left margin) */}
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed((v) => !v)}
          className="absolute top-4 right-0 mr-[-18px] z-10 p-2 rounded-full bg-white  shadow hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {/* Navigation */}
      <nav className="mt-4">
        <ul className="flex flex-col gap-1 px-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = currentPath === href
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`group flex items-center gap-3 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-150 border-l-4
                    ${isActive
                      ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                      : 'text-black border-transparent hover:border-blue-400 hover:bg-gray-100'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'} style={{ minWidth: 20, minHeight: 20, maxWidth: 20, maxHeight: 20 }} />
                  {!collapsed && <span>{name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
      
      {/* Bottom: Logout */}
      <div className={`p-6 transition-all duration-300 ${collapsed ? 'flex justify-center p-2' : ''}`}>
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-black hover:text-white text-sm font-medium shadow
            ${collapsed ? 'justify-center px-0' : ''}`}
          // TODO: Add logout logic
        >
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar 