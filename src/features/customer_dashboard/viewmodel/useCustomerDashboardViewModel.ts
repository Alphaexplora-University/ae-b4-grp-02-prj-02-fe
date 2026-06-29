// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState, useEffect, useRef } from 'react'
import { bookingsApi, vendorsApi } from '../../../api/bookingsApi'
import type { Customer, Vendor, Booking, CustomerNotification, BookingForm } from '../model/customerDashboard.model'
import { DEFAULT_BOOKING_FORM } from '../model/customerDashboard.model'
import { customerSession } from '../../../api/customerSession'

function normalizeStatus(status: Booking['status']) {
  return status.toLowerCase()
}

export function useCustomerDashboardViewModel() {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [vendorsLoading, setVendorsLoading] = useState(true)
  const [vendorsError, setVendorsError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [notifications, setNotifications] = useState<CustomerNotification[]>([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [bookingFormOpen, setBookingFormOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>(DEFAULT_BOOKING_FORM)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const bookingsRef = useRef<Booking[]>([])

  useEffect(() => {
    const parsedCustomer: Customer = {
      id: 'customer-id-placeholder',
      name: customerSession.customer_name,
      email: customerSession.customer_email,
    }
    setCustomer(parsedCustomer)

    setVendorsLoading(true)
    vendorsApi.getVendors()
      .then(res => {
        const vendorList = Array.isArray(res.data?.data) ? res.data.data : []
        setVendors(vendorList)
        setVendorsError('')
      })
      .catch(() => {
        setVendors([])
        setVendorsError('Could not load vendors. Please check that the backend is running.')
      })
      .finally(() => setVendorsLoading(false))

    const syncCustomerData = async () => {
      const res = await bookingsApi.getCustomerBookings(parsedCustomer.email)
      const customerBookings: Booking[] = Array.isArray(res.data?.data)
        ? res.data.data.map((booking: Booking) => ({
            ...booking,
            customer_id: parsedCustomer.id,
          }))
        : []
      const previousBookings = bookingsRef.current
      const changedBookings = customerBookings.filter(currentBooking => {
        const previousBooking = previousBookings.find(b => b.id === currentBooking.id)
        return previousBooking && normalizeStatus(previousBooking.status) !== normalizeStatus(currentBooking.status)
      })

      if (changedBookings.length > 0) {
        const storedNotifications: CustomerNotification[] = JSON.parse(
          localStorage.getItem(`notifications_${parsedCustomer.id}`) ?? '[]'
        )

        const newNotifications = changedBookings.map(booking => {
          const previousBooking = previousBookings.find(b => b.id === booking.id)

          return {
            id: crypto.randomUUID(),
            booking_id: booking.id,
            tracking_token: booking.tracking_token,
            service_requested: booking.service_requested,
            vendor_name: 'Vendor',
            old_status: previousBooking?.status ?? 'pending',
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
      localStorage.setItem('bookings', JSON.stringify(customerBookings))
    }

    const handleSyncError = () => {
      const storedNotifications: CustomerNotification[] = JSON.parse(
        localStorage.getItem(`notifications_${parsedCustomer.id}`) ?? '[]'
      )
      setNotifications(storedNotifications)
    }

    syncCustomerData().catch(handleSyncError)
    const intervalId = window.setInterval(() => {
      syncCustomerData().catch(() => {
        handleSyncError()
      })
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const onOpenBookingForm = () => {
    setBookingForm(DEFAULT_BOOKING_FORM)
    setFormError('')
    setFormSuccess('')
    setBookingFormOpen(true)
  }

  const onCloseBookingForm = () => {
    setBookingFormOpen(false)
    setBookingForm(DEFAULT_BOOKING_FORM)
    setFormError('')
    setFormSuccess('')
  }

  const onBookingFormChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }))
    setFormError('')
    setFormSuccess('')
  }

  const onSubmitBooking = async () => {
    if (!customer) return

    if (!bookingForm.vendor_id || !bookingForm.service_requested || !bookingForm.customer_phone) {
      setFormError('Please choose a vendor, enter the service needed, and provide your contact number.')
      return
    }

    try {
      const res = await bookingsApi.createInquiry({
        vendorId: bookingForm.vendor_id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: bookingForm.customer_phone,
        serviceRequested: bookingForm.service_requested,
        notes: bookingForm.notes,
      })
      const createdBooking: Booking = {
        ...res.data.data,
        customer_id: customer.id,
      }

      const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') ?? '[]')
      const updatedBookings = [createdBooking, ...allBookings]
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      bookingsRef.current = [createdBooking, ...bookingsRef.current]
      setBookings(prev => [createdBooking, ...prev])
      setFormSuccess('Booking request sent. You can track its status in your booking history.')

      window.setTimeout(() => {
        onCloseBookingForm()
      }, 1200)
    } catch {
      setFormError('We could not send your booking request. Please try again.')
    }
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

  return {
    customer,
    vendors,
    vendorsLoading,
    vendorsError,
    bookings,
    notifications,
    notificationOpen,
    unreadCount,
    bookingFormOpen,
    bookingForm,
    formError,
    formSuccess,
    onOpenBookingForm,
    onCloseBookingForm,
    onBookingFormChange,
    onSubmitBooking,
    onToggleNotifications,
    onMarkNotificationRead,
    onMarkAllRead,
  }
}
