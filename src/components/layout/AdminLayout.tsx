import React from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar currentPath={pathname} />
      <main className="flex-1 ml-[260px] p-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout 