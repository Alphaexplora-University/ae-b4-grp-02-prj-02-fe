import type { Vendor } from '../features/dashboard/model/dashboard.model'

const SESSION_KEY = 'session'

export function getVendorSession(): Vendor | null {
  const session = localStorage.getItem(SESSION_KEY)

  if (session) {
    return JSON.parse(session) as Vendor
  }

  const demoVendorId = import.meta.env.VITE_DEMO_VENDOR_ID
  if (!demoVendorId) return null

  const demoVendor: Vendor = {
    id: demoVendorId,
    business_name: import.meta.env.VITE_DEMO_VENDOR_BUSINESS_NAME || 'Demo Vendor',
    owner_name: import.meta.env.VITE_DEMO_VENDOR_OWNER_NAME || 'Vendor',
    email: import.meta.env.VITE_DEMO_VENDOR_EMAIL || 'vendor@example.com',
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(demoVendor))
  return demoVendor
}

export function clearVendorSession() {
  localStorage.removeItem(SESSION_KEY)
}
