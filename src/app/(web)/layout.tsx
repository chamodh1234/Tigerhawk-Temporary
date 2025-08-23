import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Suspense, type ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './profile/loading'

interface WebLayoutProps {
  children: ReactNode
}

export function WebLayout({ children }: WebLayoutProps) {
  return (
    <>
      <Navbar />
      <main className=''>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default WebLayout