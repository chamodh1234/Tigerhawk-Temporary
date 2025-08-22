'use client'
import React, { useState } from 'react'
import { useDashboardData } from './hooks/useDashboardData'
import { DashboardStats } from './components/DashboardStats'
import { SalesTrendsChart } from './components/SalesTrendsChart'
import { RecentSales } from './components/RecentSales'
import { Modal } from '@/components/ui/Modal'

const DashboardPage = () => {
  const { stats, salesTrends,} = useDashboardData()
  const [selectedSale, setSelectedSale] = useState<any>(null)

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>
      <DashboardStats stats={stats} />
      {/* <SalesTrendsChart trends={salesTrends} /> */}
      <RecentSales />
      <Modal open={!!selectedSale} onClose={() => setSelectedSale(null)}>
        {selectedSale && (
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sale Details</h4>
            <div className="flex flex-col gap-2">
              <div><span className="font-semibold text-gray-700 dark:text-gray-200">Customer:</span> {selectedSale.customer}</div>
              <div><span className="font-semibold text-gray-700 dark:text-gray-200">Amount:</span> ${selectedSale.amount}</div>
              <div><span className="font-semibold text-gray-700 dark:text-gray-200">Date:</span> {new Date(selectedSale.date).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</div>
              <div><span className="font-semibold text-gray-700 dark:text-gray-200">Status:</span> <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedSale.status === 'paid' ? 'bg-green-100 text-green-700' : selectedSale.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{selectedSale.status}</span></div>
              <div><span className="font-semibold text-gray-700 dark:text-gray-200">Sale ID:</span> {selectedSale.id}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DashboardPage