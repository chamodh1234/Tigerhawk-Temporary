'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { canAccessAdmin, logout } from '@/lib/utils/auth'
import { useCheckValidUserQuery } from '@/lib/redux/apiSlice'

interface AdminProtectedProps {
  children: React.ReactNode
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const { data: validUser, isLoading } = useCheckValidUserQuery(undefined)
  
  console.log(validUser?.success)


  useEffect(() => {
    console.log(validUser)
    if(validUser?.success && !isLoading){
      setIsAuthorized(true)
    }
    // Check if user can access admin routes
    //const canAccess = canAccessAdmin()
    
    if (!validUser?.success && !isLoading) {
      console.log('AdminProtected: User not authorized, redirecting to login')
      logout()
      return
    }

    setIsAuthorized(true)
  }, [isLoading])

  // Show loading while checking authorization
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authorization...</p>
        </div>
      </div>
    )
  }

  // Show children if authorized
  if (isAuthorized) {
    return <>{children}</>
  }

  // This should not be reached due to logout redirect
  return null
}

export default AdminProtected 