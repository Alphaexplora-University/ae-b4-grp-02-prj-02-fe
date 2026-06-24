// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Booking, Vendor, NotificationItem, DashboardMetrics } from '../model/dashboard.model'

export function useDashboardViewModel() {
  const navigate = useNavigate()

  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<'Pending' | 'Accepted' | 'Rejected'>('Pending')
  const [modalOpen, setModalOpen] = useState(false)
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todayVolume: 0,
    weeklyVelocity: 0,
    activeBacklog: 0,
  })



  



  // Load vendor session and bookings from localStorage
  useEffect(() => {
    const session = localStorage.getItem('session')
    if (!session) {
      navigate('/login')
      return
    }

    const parsedVendor: Vendor = JSON.parse(session)
    setVendor(parsedVendor)

    ///uu========================
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') ?? '[]')

    // HARDCODED SEED — pansamantala lang, tatanggalin pag may backend na
if (allBookings.length === 0) {
  const seedBookings: Booking[] = [
    {
      id: '1',
      tracking_token: 'TKN-001',
      vendor_id: parsedVendor.id,   // <-- important, dapat match sa naka-login
      customer_name: 'Juan dela Cruz',
      customer_email: 'juan@email.com',
      customer_phone: '09171234567',
      service_requested: 'Wedding Photography',
      notes: 'Sana may drone shots',
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      tracking_token: 'TKN-002',
      vendor_id: parsedVendor.id,
      customer_name: 'Maria Santos',
      customer_email: 'maria@email.com',
      customer_phone: '09189876543',
      service_requested: 'Debut Coverage',
      notes: 'Pink motif',
      status: 'Accepted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      tracking_token: 'TKN-003',
      vendor_id: parsedVendor.id,
      customer_name: 'Pedro Reyes',
      customer_email: 'pedro@email.com',
      customer_phone: '09201112222',
      service_requested: 'Corporate Event',
      notes: '',
      status: 'Rejected',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
  localStorage.setItem('bookings', JSON.stringify(seedBookings))
  // reload para ma-pick up ng state
  window.location.reload()
}


    const vendorBookings = allBookings.filter(b => b.vendor_id === parsedVendor.id)

    setBookings(vendorBookings)
    computeMetrics(vendorBookings)
    buildNotifications(vendorBookings)
  }, [])

  const computeMetrics = (data: Booking[]) => {
    const today = new Date().toDateString()
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    setMetrics({
      todayVolume: data.filter(b => new Date(b.created_at).toDateString() === today).length,
      weeklyVelocity: data.filter(b => new Date(b.created_at) >= weekAgo).length,
      activeBacklog: data.filter(b => b.status === 'Pending').length,
    })
  }

  const buildNotifications = (data: Booking[]) => {
    const urgent: NotificationItem[] = data
      .filter(b => b.status === 'Accepted')
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map(b => ({
        id: `urgent-${b.id}`,
        type: 'urgent' as const,
        customer_name: b.customer_name,
        service_requested: b.service_requested,
        booking_id: b.id,
        read: false,
        created_at: b.updated_at,
      }))

    const activity: NotificationItem[] = data
      .filter(b => b.status === 'Pending')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map(b => ({
        id: `activity-${b.id}`,
        type: 'activity' as const,
        customer_name: b.customer_name,
        service_requested: b.service_requested,
        booking_id: b.id,
        read: false,
        created_at: b.created_at,
      }))

    setNotificationItems([...urgent, ...activity])
  }

  // Derived state — filtered bookings
  const filteredBookings = bookings
    .filter(b => {
      const matchesSearch =
        b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        b.service_requested.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .slice(0, 10)

  const unreadCount = notificationItems.filter(n => !n.read).length

  const onOpenModal = (booking: Booking) => {
    setSelectedBooking(booking)
    setSelectedStatus(booking.status)
    setModalOpen(true)
  }

  const onCloseModal = () => {
    setModalOpen(false)
    setSelectedBooking(null)
  }

  const onSelectNotification = (item: NotificationItem) => {
    // Mark as read
    setNotificationItems(prev =>
      prev.map(n => n.id === item.id ? { ...n, read: true } : n)
    )
    setNotificationOpen(false)

    // Open modal for selected booking
    const booking = bookings.find(b => b.id === item.booking_id)
    if (booking) onOpenModal(booking)
  }

  const onSaveStatus = () => {
    if (!selectedBooking) return

    const confirmed = window.confirm(
      `Update booking status to "${selectedStatus}"? The customer will be notified via email.`
    )
    if (!confirmed) return

    // Update in localStorage
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') ?? '[]')
    const updated = allBookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: selectedStatus, updated_at: new Date().toISOString() }
        : b
    )
    localStorage.setItem('bookings', JSON.stringify(updated))

    // Refresh state
    const session = localStorage.getItem('session')
    if (!session) return
    const parsedVendor: Vendor = JSON.parse(session)
    const vendorBookings = updated.filter(b => b.vendor_id === parsedVendor.id)
    setBookings(vendorBookings)
    computeMetrics(vendorBookings)
    buildNotifications(vendorBookings)
    onCloseModal()
  }

  const onLogout = () => {
    localStorage.removeItem('session')
    navigate('/login')
  }

  return {
    vendor,
    metrics,
    search,
    statusFilter,
    bookings: filteredBookings,
    notificationItems,
    notificationOpen,
    unreadCount,
    selectedBooking,
    selectedStatus,
    modalOpen,
    onSearchChange: setSearch,
    onStatusChange: setStatusFilter,
    onToggleNotifications: () => setNotificationOpen(prev => !prev),
    onOpenModal,
    onCloseModal,
    onSelectNotification,
    onStatusSelect: setSelectedStatus,
    onSaveStatus,
    onLogout,
  }
}