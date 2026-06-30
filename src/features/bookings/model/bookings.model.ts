// Model layer — pure TypeScript types only
// ZERO functions, ZERO hooks

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

export interface BookingsFilter {
  search: string
  status: 'all' | 'pending' | 'accepted' | 'rejected'
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  perPage: number
  total: number
}

export const DEFAULT_FILTER: BookingsFilter = {
  search: '',
  status: 'all',
}

export const DEFAULT_PAGINATION: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  perPage: 12,
  total: 0,
}
