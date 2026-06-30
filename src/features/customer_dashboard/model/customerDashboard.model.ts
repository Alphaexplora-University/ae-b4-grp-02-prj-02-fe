// Model layer — pure TypeScript types only
// ZERO functions, ZERO hooks

export interface Customer {
  id: string
  name: string
  email: string
}

export interface Vendor {
  id: string
  business_name: string
  owner_name?: string
  email?: string
}
export interface Booking {
  id: string
  tracking_token: string
  vendor_id: string
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  service_requested: string
  notes: string
  status: 'pending' | 'accepted' | 'rejected'   // ← removed capitalized variants
  created_at: string
  updated_at: string
}

export interface CustomerNotification {
  id: string
  booking_id: string
  tracking_token: string
  vendor_name: string
  service_requested: string
  old_status: 'pending' | 'accepted' | 'rejected' | 'Pending' | 'Accepted' | 'Rejected'
  new_status: 'pending' | 'accepted' | 'rejected' | 'Pending' | 'Accepted' | 'Rejected'
  read: boolean
  created_at: string
}

export interface BookingForm {
  vendor_id: string
  service_requested: string
  customer_phone: string
  notes: string
}

export const DEFAULT_BOOKING_FORM: BookingForm = {
  vendor_id: '',
  service_requested: '',
  customer_phone: '',
  notes: '',
}
