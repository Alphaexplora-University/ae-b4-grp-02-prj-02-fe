// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState, useEffect } from 'react'
import type { Booking, BookingsFilter, PaginationState } from '../model/bookings.model'
import { DEFAULT_FILTER, DEFAULT_PAGINATION } from '../model/bookings.model'
import type { Vendor } from '../../dashboard/model/dashboard.model'
import { bookingsApi } from '../../../api/bookingsApi'
import { vendorSession } from '../../../api/session'

export function useBookingsViewModel() {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<BookingsFilter>(DEFAULT_FILTER)
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)

  useEffect(() => {
    setVendor(vendorSession)

    bookingsApi.getMyBookings()
      .then(res => {
        setAllBookings(res.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  // Derived — filtered bookings
  const filteredBookings = allBookings.filter(b => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(filter.search.toLowerCase()) ||
      b.customer_email.toLowerCase().includes(filter.search.toLowerCase()) ||
      b.service_requested.toLowerCase().includes(filter.search.toLowerCase())
    const matchesStatus = filter.status === 'all' || b.status === filter.status
    return matchesSearch && matchesStatus
  })

  // Derived — paginated bookings
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pagination.perPage))
  const start = (pagination.currentPage - 1) * pagination.perPage
  const paginatedBookings = filteredBookings.slice(start, start + pagination.perPage)

  const onSearchChange = (value: string) => {
    setFilter(prev => ({ ...prev, search: value }))
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  const onStatusChange = (value: string) => {
    setFilter(prev => ({ ...prev, status: value as BookingsFilter['status'] }))
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setPagination(prev => ({ ...prev, currentPage: page }))
  }

  return {
    vendor,
    bookings: paginatedBookings,
    filter,
    pagination: {
      ...pagination,
      totalPages,
      total: filteredBookings.length,
    },
    onSearchChange,
    onStatusChange,
    onPageChange,
  }
}
