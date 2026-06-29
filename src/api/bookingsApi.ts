import axios from 'axios'
import { vendorSession } from './session'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  config.headers['x-vendor-id'] = vendorSession.id
  config.headers['x-api-key'] = import.meta.env.VITE_API_KEY
  return config
})

export const bookingsApi = {
  createInquiry: (data: {
    vendorId: string
    customerName: string
    customerEmail: string
    customerPhone?: string
    serviceRequested: string
    notes?: string
  }) => api.post('/bookings', data),
  trackBooking: (uuid: string) => api.get(`/bookings/track/${uuid}`),
  getCustomerBookings: (email: string) => api.get('/bookings/customer', { params: { email } }),
  getMyBookings: () => api.get('/bookings'),
  updateBookingStatus: (id: string, status: BookingStatus) => api.patch(`/bookings/${id}/status`, { status }),
}

export const vendorsApi = {
  getVendors: () => api.get('/vendors'),
}

export default api
type BookingStatus = 'pending' | 'accepted' | 'rejected'
