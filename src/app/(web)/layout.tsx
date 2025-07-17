import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import type { ReactNode } from 'react'

interface WebLayoutProps {
	children: ReactNode
}

export function WebLayout ({ children }: WebLayoutProps) {
	return (
		<>
        <Navbar/>
        {children}
        <Footer/>
        </>
	)
}

export default WebLayout