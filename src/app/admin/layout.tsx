'use client'
import React from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import AdminProtected from '@/components/auth/AdminProtected'
import { useCheckValidUserQuery } from '@/lib/redux/apiSlice'
import { useRouter } from 'next/navigation'

export default function AdminRootLayout ({ children }: { children: React.ReactNode }) {
	return (
		<AdminProtected>
			<AdminLayout>{children}</AdminLayout>
    </AdminProtected>
  )
  
} 