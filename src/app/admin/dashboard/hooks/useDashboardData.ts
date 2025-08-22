import { useMemo } from 'react'

export interface DashboardStats {
  totalSales: number
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  monthlyGrowth: number
  activeUsers: number
  topProducts: Array<{
    id: string
    name: string
    sales: number
  }>
}

export interface SalesTrend {
  date: string
  sales: number
}

export interface RecentSale {
  id: string
  customer: string
  amount: number
  date: string // ISO string with time
  status: 'paid' | 'pending' | 'refunded'
  quantity: number
}

export interface ActivityItem {
  id: string
  type: 'login' | 'purchase' | 'update' | 'delete'
  description: string
  timestamp: string
  userId: string
  userName: string
}

export function useDashboardData() {
  // Mock stats
  const stats: DashboardStats = {
    totalSales: 1200,
    totalRevenue: 54000,
    totalOrders: 320,
    totalCustomers: 210,
    monthlyGrowth: 12.5,
    activeUsers: 45,
    topProducts: [
      { id: 'p1', name: 'Tigerhawk Pro Headlamp', sales: 320 },
      { id: 'p2', name: 'Eco Lantern', sales: 210 },
      { id: 'p3', name: 'Adventure Flashlight', sales: 180 },
    ],
  }

  // Mock sales trends (last 7 days)
  const salesTrends: SalesTrend[] = [
    { date: '2024-06-01', sales: 120 },
    { date: '2024-06-02', sales: 150 },
    { date: '2024-06-03', sales: 180 },
    { date: '2024-06-04', sales: 200 },
    { date: '2024-06-05', sales: 170 },
    { date: '2024-06-06', sales: 210 },
    { date: '2024-06-07', sales: 170 },
  ]

  // Mock recent sales (20+ entries, ISO date with time)
  const recentSales: RecentSale[] = [
    { id: '1', customer: 'Alice', amount: 120, date: '2024-06-07T14:32:00Z', status: 'paid', quantity: 1 },
    { id: '2', customer: 'Bob', amount: 80, date: '2024-06-07T13:15:00Z', status: 'pending', quantity: 1 },
    { id: '3', customer: 'Charlie', amount: 200, date: '2024-06-07T12:50:00Z', status: 'paid', quantity: 1 },
    { id: '4', customer: 'Diana', amount: 150, date: '2024-06-07T11:20:00Z', status: 'refunded', quantity: 1 },
    { id: '5', customer: 'Eve', amount: 90, date: '2024-06-07T10:05:00Z', status: 'paid', quantity: 1 },
    { id: '6', customer: 'Frank', amount: 110, date: '2024-06-06T18:45:00Z', status: 'paid', quantity: 1 },
    { id: '7', customer: 'Grace', amount: 75, date: '2024-06-06T17:30:00Z', status: 'pending', quantity: 1 },
    { id: '8', customer: 'Heidi', amount: 130, date: '2024-06-06T16:10:00Z', status: 'paid', quantity: 1 },
    { id: '9', customer: 'Ivan', amount: 95, date: '2024-06-06T15:00:00Z', status: 'paid', quantity: 1 },
    { id: '10', customer: 'Judy', amount: 160, date: '2024-06-06T14:20:00Z', status: 'refunded', quantity: 1 },
    { id: '11', customer: 'Karl', amount: 140, date: '2024-06-05T19:40:00Z', status: 'paid', quantity: 1 },
    { id: '12', customer: 'Liam', amount: 100, date: '2024-06-05T18:25:00Z', status: 'pending', quantity: 1 },
    { id: '13', customer: 'Mallory', amount: 180, date: '2024-06-05T17:10:00Z', status: 'paid', quantity: 1 },
    { id: '14', customer: 'Niaj', amount: 120, date: '2024-06-05T16:00:00Z', status: 'paid', quantity: 1 },
    { id: '15', customer: 'Olivia', amount: 105, date: '2024-06-05T15:30:00Z', status: 'refunded', quantity: 1 },
    { id: '16', customer: 'Peggy', amount: 115, date: '2024-06-04T20:10:00Z', status: 'paid', quantity: 1 },
    { id: '17', customer: 'Quentin', amount: 125, date: '2024-06-04T19:00:00Z', status: 'paid', quantity: 1 },
    { id: '18', customer: 'Rupert', amount: 135, date: '2024-06-04T18:15:00Z', status: 'pending', quantity: 1 },
    { id: '19', customer: 'Sybil', amount: 145, date: '2024-06-04T17:05:00Z', status: 'paid', quantity: 1 },
    { id: '20', customer: 'Trent', amount: 155, date: '2024-06-04T16:45:00Z', status: 'paid', quantity: 1 },
    { id: '21', customer: 'Uma', amount: 165, date: '2024-06-03T21:30:00Z', status: 'paid', quantity: 1 },
    { id: '22', customer: 'Victor', amount: 175, date: '2024-06-03T20:20:00Z', status: 'pending', quantity: 1 },
    { id: '23', customer: 'Wendy', amount: 185, date: '2024-06-03T19:10:00Z', status: 'paid', quantity: 1 },
    { id: '24', customer: 'Xavier', amount: 195, date: '2024-06-03T18:00:00Z', status: 'paid', quantity: 1 },
    { id: '25', customer: 'Yvonne', amount: 205, date: '2024-06-03T17:00:00Z', status: 'refunded', quantity: 1 },
  ]

  // Mock recent activity
  const recentActivity: ActivityItem[] = [
    { id: 'a1', type: 'login', description: 'Admin Jane logged in', timestamp: '2024-06-07T09:00:00Z', userId: 'u1', userName: 'Jane' },
    { id: 'a2', type: 'purchase', description: 'Order #1234 placed by Alice', timestamp: '2024-06-07T08:45:00Z', userId: 'u2', userName: 'Alice' },
    { id: 'a3', type: 'update', description: 'Product Adventure Flashlight updated', timestamp: '2024-06-07T08:30:00Z', userId: 'u1', userName: 'Jane' },
    { id: 'a4', type: 'delete', description: 'Order #1229 deleted by Bob', timestamp: '2024-06-06T17:00:00Z', userId: 'u3', userName: 'Bob' },
  ]

  return useMemo(() => ({ stats, salesTrends, recentSales, recentActivity }), [])
} 