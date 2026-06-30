// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel'
import AppLayout from '../../../shared-components/AppLayout/AppLayout'
import PageHeader from '../../../shared-components/PageHeader/PageHeader'
import BookingModal from '../../../shared-components/BookingModal/BookingModal'
import DataTable from '../../../shared-components/DataTable/DataTable'
import NotificationBell from '../../../shared-components/NotificationBell/NotificationBell'
import SearchInput from '../../../shared-components/SearchInput/SearchInput'
import StatusBadge from '../../../shared-components/StatusBadge/StatusBadge'
import type { Booking } from '../model/dashboard.model'

export default function DashboardView() {
  const {
    vendor,
    metrics,
    search,
    bookings,
    notificationItems,
    notificationOpen,
    unreadCount,
    selectedBooking,
    selectedStatus,
    modalOpen,
    onSearchChange,
    onToggleNotifications,
    onOpenModal,
    onCloseModal,
    onSelectNotification,
    onStatusSelect,
    onSaveStatus,

  } = useDashboardViewModel()

  const columns: Array<{
    key: keyof Booking
    label: string
    render?: (row: Booking) => React.ReactNode
  }> = [
      { key: 'customer_name', label: 'Customer Name' },
      { key: 'customer_email', label: 'Email' },
      { key: 'customer_phone', label: 'Phone' },
      { key: 'service_requested', label: 'Service Requested' },
      {
        key: 'status',
        label: 'Status',
        render: (booking: Booking) => <StatusBadge status={booking.status} />,
      },
      { key: 'created_at', label: 'Date Created' },
      {
        key: 'id',
        label: 'Actions',
        render: (booking: Booking) => (
          <button
            type="button"
            onClick={() => onOpenModal(booking)}
            className="bg-[var(--accent)] text-white text-xs px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            View
          </button>
        ),
      },
    ]

  return (
    <AppLayout
  withSidebar
  sidebarProps={{
    name: vendor?.owner_name ?? 'Owner',
    email: vendor?.email ?? '',
    navItems: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
        ),
      },
      {
        label: 'Bookings',
        path: '/bookings',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18m-9 6 2 2 4-4" />
          </svg>
        ),
      },
    ],
  }}
>
      <PageHeader
        breadcrumbParent="Dashboard"
        breadcrumbCurrent="Overview"
        rightSlot={
          <NotificationBell
            unread={unreadCount}
            open={notificationOpen}
            onToggle={onToggleNotifications}
            onSelect={onSelectNotification}
            items={notificationItems}
          />
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {/* Welcome */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Welcome back, {vendor?.owner_name ?? 'Vendor'}!
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Review today's schedule, approve pending requests, and keep your vendor operations moving.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3  gap-4">
          {[
            {
              label: "Today's Bookings",
              value: metrics.todayVolume,
              bg: 'var(--card-volume)',
              text: 'var(--card-volume-text)',
              icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 3v4M17 3v4M5 11h14v8H5z" />
                </svg>
              ),
            },
            {
              label: 'Weekly Velocity',
              value: metrics.weeklyVelocity,
              bg: 'var(--card-velocity)',
              text: 'var(--card-velocity-text)',
              icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6M4 20h16" />
                </svg>
              ),
            },
            {
              label: 'Active Backlog',
              value: metrics.activeBacklog,
              bg: 'var(--card-backlog)',
              text: 'var(--card-backlog-text)',
              icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 11h10M6 15h12M9 19h6" />
                </svg>
              ),
            },
          ].map(({ label, value, icon, bg, text }) => (
            <div
              key={label}
              className="flex items-center justify-between border border-[var(--border)] rounded-xl px-5 py-4"
              style={{ backgroundColor: bg }}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: text, opacity: 0.7 }}>
                  {label}
                </span>
                <div className="text-4xl font-bold" style={{ color: text }}>{value}</div>
              </div>

              <div
                className="flex items-center justify-center rounded-md p-2 shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)', color: text }}
              >
                {icon}
              </div>
            </div>
          ))}
        </div>

        {/* Control Bar */}
        <div className="flex gap-3">
          <SearchInput
            value={search}
            placeholder="Search customer name, service..."
            onChange={onSearchChange}
          />
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="border-b border-[var(--border)] px-6 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Recent Bookings
            </p>
          </div>
          <DataTable columns={columns} data={bookings} />
        </section>

      </div>

      {/* Modal */}
      <BookingModal
        booking={selectedBooking}
        open={modalOpen}
        onClose={onCloseModal}
        status={selectedStatus}
        onStatusChange={onStatusSelect}
        onSave={onSaveStatus}
      />
    </AppLayout>
  )
}