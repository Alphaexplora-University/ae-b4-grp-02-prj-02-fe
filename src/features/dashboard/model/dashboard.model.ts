// Model layer — pure TypeScript types only
// ZERO functions, ZERO hooks

export interface Vendor {
  id: string
  business_name: string
  owner_name: string
  email: string
}

export interface Booking {
  id: string
  tracking_token: string
  vendor_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  service_requested: string
  notes: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

export interface NotificationItem {
  id: string
  type:  'activity'
  customer_name: string
  service_requested: string
  booking_id: string
  read: boolean
  created_at: string
}

export interface DashboardMetrics {
  todayVolume: number
  weeklyVelocity: number
  activeBacklog: number
}
