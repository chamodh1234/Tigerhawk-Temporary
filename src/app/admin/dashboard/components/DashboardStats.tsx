'use client'
import React, { useEffect, useMemo, useState } from 'react'
import type { DashboardStats } from '../hooks/useDashboardData'
import { useGetDashboardDataQuery, useGetDashboardTopProductsQuery } from '@/lib/redux/apiSlice'

interface Props {
  stats: DashboardStats
}
interface TopProduct {
  products: any[]
  total_sales: number
}

function formatGrowth(growth: number) {
  return (
    <span className={
      `inline-flex items-center font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`
    }>
      {growth >= 0 ? (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      ) : (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      )}
      {Math.abs(growth)}%
    </span>
  )
}

export function DashboardStats({ stats }: Props) {

  const { data: dashboardData, isLoading, error } = useGetDashboardDataQuery(undefined)
  const { data: topProducts, isLoading: topProductsLoading, error: topProductsError } = useGetDashboardTopProductsQuery(undefined)
  const [topSellingProducts, setTopSellingProducts] = useState<any>({
    products: [{
      name: '',
      total_sales: 0,
    }],
    totalSales: 0,
  })



  const topProductsData = !topProductsLoading ? topProducts?.data : []

  console.log(topProductsData)

  useEffect(() => {
    if (topProductsData.length > 0 && !topProductsLoading) {
      const products = topProductsData.map((p: any) => ({
        name: p.name,
        total_sales: p.total_sales,
      }))
      const totalSales = topProductsData.reduce(
        (sum: number, p: any) => sum + p.total_sales,
        0
      )
      setTopSellingProducts({
        products: products,
        totalSales: totalSales,
      });
    }
  }, [topProductsData, topProductsLoading]);

  console.log(dashboardData)
  if (isLoading || topProductsLoading) return <div>Loading...</div>
  if (error || topProductsError) return <div>Error: {error as any}</div>
console.log(topSellingProducts)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center group relative cursor-pointer">
          <span className="text-2xl font-bold">{dashboardData?.data?.sales}</span>
          <span className="text-gray-500">Total Sales</span>
          <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">All-time sales</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center group relative cursor-pointer">
            <span className="text-2xl font-bold">{formatGrowth(stats.monthlyGrowth)}</span>
            <span className="text-gray-500">Monthly Growth</span>
            <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Compared to last month</span>
          </div>

        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center group relative cursor-pointer">
          <span className="text-2xl font-bold">${dashboardData?.data?.revenue}</span>
          <span className="text-gray-500">Revenue</span>
          <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Gross revenue</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center group relative cursor-pointer">
          <span className="text-2xl font-bold">{dashboardData?.data?.orders}</span>
          <span className="text-gray-500">Orders</span>
          <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Total orders placed</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center group relative cursor-pointer">
          <span className="text-2xl font-bold">{dashboardData?.data?.customers}</span>
          <span className="text-gray-500">Customers</span>
          <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Unique customers</span>
        </div>
      </div>
      {/* Growth & Active Users */}

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
        <span className="text-lg font-semibold mb-2">Top Products</span>
        <ul className="flex-1 flex flex-col gap-2">
          {topSellingProducts.products.map((p: any, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-4 text-xs text-gray-500">{i + 1}</span>
              <span className="flex-1 text-sm font-medium truncate">{p.name}</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-24 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{ width: `${(p.total_sales / topSellingProducts.totalSales) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-700 ml-2">{p.total_sales}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 