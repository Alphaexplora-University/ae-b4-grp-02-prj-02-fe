// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  Customer,
  Vendor,
  Booking,
  CustomerNotification,
  BookingForm,
} from '../model/customerDashboard.model'
import { DEFAULT_BOOKING_FORM } from '../model/customerDashboard.model'

export function useCustomerDashboardViewModel() {
  const navigate = useNavigate()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [notifications, setNotifications] = useState<CustomerNotification[]>([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>(DEFAULT_BOOKING_FORM)
  const [bookingFormOpen, setBookingFormOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const bookingsRef = useRef<Booking[]>([])

  useEffect(() => {
    const session = localStorage.getItem('customer_session')
    if (!session) {
      navigate('/customer/login')
      return
    }

    const parsedCustomer: Customer = JSON.parse(session)
    setCustomer(parsedCustomer)

    const syncCustomerData = () => {
      const allVendors: Vendor[] = JSON.parse(localStorage.getItem('vendors') ?? '[]')
      setVendors(allVendors)

      const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') ?? '[]')
      const customerBookings = allBookings.filter(b => b.customer_id === parsedCustomer.id)
      const previousBookings = bookingsRef.current
      const changedBookings = customerBookings.filter(currentBooking => {
        const previousBooking = previousBookings.find(b => b.id === currentBooking.id)
        return previousBooking && previousBooking.status !== currentBooking.status
      })

      if (changedBookings.length > 0) {
        const vendorMap = new Map(allVendors.map(vendor => [vendor.id, vendor]))
        const storedNotifications: CustomerNotification[] = JSON.parse(
          localStorage.getItem(`notifications_${parsedCustomer.id}`) ?? '[]'
        )

        const newNotifications = changedBookings.map(booking => {
          const previousBooking = previousBookings.find(b => b.id === booking.id)
          const vendor = vendorMap.get(booking.vendor_id)

          return {
            id: crypto.randomUUID(),
            booking_id: booking.id,
            tracking_token: booking.tracking_token,
            service_requested: booking.service_requested,
            vendor_name: vendor?.business_name ?? 'Vendor',
            old_status: previousBooking?.status ?? 'Pending',
            new_status: booking.status,
            read: false,
            created_at: new Date().toISOString(),
          }
        })

        const mergedNotifications = [...newNotifications, ...storedNotifications]
        localStorage.setItem(
          `notifications_${parsedCustomer.id}`,
          JSON.stringify(mergedNotifications)
        )
        setNotifications(mergedNotifications)
      } else {
        const storedNotifications: CustomerNotification[] = JSON.parse(
          localStorage.getItem(`notifications_${parsedCustomer.id}`) ?? '[]'
        )
        setNotifications(storedNotifications)
      }

      bookingsRef.current = customerBookings
      setBookings(customerBookings)
    }

    syncCustomerData()
    const intervalId = window.setInterval(syncCustomerData, 2000)

    return () => window.clearInterval(intervalId)
  }, [navigate])

  const unreadCount = notifications.filter(n => !n.read).length

  const onOpenBookingForm = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setBookingForm({ ...DEFAULT_BOOKING_FORM, vendor_id: vendor.id })
    setFormError('')
    setFormSuccess('')
    setBookingFormOpen(true)
  }

  const onCloseBookingForm = () => {
    setBookingFormOpen(false)
    setSelectedVendor(null)
    setBookingForm(DEFAULT_BOOKING_FORM)
    setFormError('')
    setFormSuccess('')
  }

  const onBookingFormChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }))
    setFormError('')
  }

  const onSubmitBooking = () => {
    if (!bookingForm.service_requested || !bookingForm.customer_phone) {
      setFormError('Service requested and contact number are required.')
      return
    }

    if (!customer || !selectedVendor) return

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      tracking_token: `TKN-${Date.now()}`,
      vendor_id: selectedVendor.id,
      customer_id: customer.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: bookingForm.customer_phone,
      service_requested: bookingForm.service_requested,
      notes: bookingForm.notes,
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Save to localStorage
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') ?? '[]')
    allBookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(allBookings))

    // Update local state
    setBookings(prev => [...prev, newBooking])
    setFormSuccess('Booking submitted successfully!')

    setTimeout(() => {
      onCloseBookingForm()
    }, 1500)
  }

  const onToggleNotifications = () => {
    setNotificationOpen(prev => !prev)
  }

  const onMarkNotificationRead = (id: string) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
    setNotifications(updated)

    if (customer) {
      localStorage.setItem(
        `notifications_${customer.id}`,
        JSON.stringify(updated)
      )
    }
  }

  const onMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)

    if (customer) {
      localStorage.setItem(
        `notifications_${customer.id}`,
        JSON.stringify(updated)
      )
    }
  }

  const onLogout = () => {
    localStorage.removeItem('customer_session')
    navigate('/customer/login')
  }

  return {
    customer,
    vendors,
    bookings,
    notifications,
    notificationOpen,
    unreadCount,
    bookingForm,
    bookingFormOpen,
    selectedVendor,
    formError,
    formSuccess,
    onOpenBookingForm,
    onCloseBookingForm,
    onBookingFormChange,
    onSubmitBooking,
    onToggleNotifications,
    onMarkNotificationRead,
    onMarkAllRead,
    onLogout,
  }
}