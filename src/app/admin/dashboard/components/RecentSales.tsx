import React, { useMemo, useState } from 'react'
import type { RecentSale } from '../hooks/useDashboardData'
import { useGetDashboardResentSalesQuery } from '@/lib/redux/apiSlice'

interface Props {
  sales?: RecentSale[]
  onView: (sale: RecentSale) => void
}

const statusStyle: Record<RecentSale['status'], string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-red-100 text-red-700',
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  })
}

const PAGE_SIZE = 10

export function RecentSales() {
  const [page, setPage] = useState(1)
  const { data: recentSales, isLoading, error } = useGetDashboardResentSalesQuery(undefined)

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error as any}</div>

 
 const sales = recentSales?.data
  // Sort descending by date/time
  const sorted =  sales && [...sales].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) 
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 overflow-x-auto hover:shadow-2xl transition-all duration-300 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white z-10 relative">Recent Sales</h3>
      <table className="min-w-full text-sm z-10 relative">
        <thead>
          <tr>
            <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-300">Order Id</th>
            <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-300">Amount</th>
            <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-300">Qty</th>
            <th className="text-left py-2 px-3 font-medium text-gray-500 dark:text-gray-300">Date</th>
            <th className="py-2 px-3" />
          </tr>
        </thead>
        <tbody>
          {paged.map( (sale: any) => (
            <tr key={sale.id} className="transition-colors duration-200 hover:bg-blue-50/40 dark:hover:bg-blue-900/20">
              <td className="py-2 px-3 text-gray-900 dark:text-white font-medium">{sale.order_id}</td>
              <td className="py-2 px-3 text-blue-700 dark:text-blue-300 font-semibold">${sale.total_price}</td>  
              <td className="py-2 px-3 text-gray-900 dark:text-white">{sale.total_sales}</td>
              <td className="py-2 px-3 text-gray-500 dark:text-gray-300">{formatDateTime(sale.created_at)}</td>
            
              
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 mt-4 z-10 relative">
        <button
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
} 