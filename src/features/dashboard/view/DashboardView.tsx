// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useNavigate, useLocation } from 'react-router-dom'
import { useDashboardViewModel } from '../viewmodel/useDashboardViewModel'
import BookingModal from '../../../shared-components/BookingModal/BookingModal'
import DataTable from '../../../shared-components/DataTable/DataTable'
import NotificationBell from '../../../shared-components/NotificationBell/NotificationBell'
import SearchInput from '../../../shared-components/SearchInput/SearchInput'
import StatusBadge from '../../../shared-components/StatusBadge/StatusBadge'
import type { Booking } from '../model/dashboard.model'

export default function DashboardView() {
  const navigate = useNavigate()
  const location = useLocation()
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
    onLogout,
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
    {
      key: 'created_at',
      label: 'Request Date', // Optional: Tweaked label since it's no longer a full timestamp
      render: (row: Booking) => new Date(row.created_at).toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (booking: Booking) => (
        <button
          type="button"
          onClick={() => onOpenModal(booking)}
          className="bg-[#39EF8E] text-[#071208] text-xs px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          View
        </button>
      ),
    },
  ]

  const navItems = [
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
  ]

  return (
    <div className="h-screen w-screen bg-[#121212] text-[#a3a3a3] flex p-4 gap-4 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 flex flex-col justify-between py-4 px-2 select-none">
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1B7245] to-[#29AB63] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {vendor?.owner_name?.slice(0, 2).toUpperCase() ?? 'OW'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#e5e5e5] truncate">
                {vendor?.owner_name ?? 'Owner'}
              </span>
              <span className="text-[10px] text-[#737373] truncate">
                {vendor?.email ?? ''}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#525252] px-3">
              General
            </span>
            <nav className="space-y-1">
              {navItems.map(item => {
                const isActive = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1e1e1e] text-[#53F3A9] border border-[#2d2d2d]/40'
                        : 'text-[#737373] hover:text-[#e5e5e5] hover:bg-[#161616]'
                    }`}
                  >
                    <span className={isActive ? 'text-[#39EF8E]' : ''}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Sign Out */}
        <div className="px-3">
          <button
            type="button"
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg transition-colors hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#161616] border border-[#232323] rounded-2xl flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-14 border-b border-[#232323] flex items-center justify-between px-8 shrink-0">
          <div className="text-xs font-medium text-[#525252]">
            Dashboard <span className="mx-1 text-[#404040]">/</span>
            <span className="text-[#8a8a8a]">Overview</span>
          </div>
          <NotificationBell
            unread={unreadCount}
            open={notificationOpen}
            onToggle={onToggleNotifications}
            onSelect={onSelectNotification}
            items={notificationItems}
          />
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {/* Welcome */}
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-[#f5f5f5]">
              Welcome back, {vendor?.owner_name ?? 'Vendor'}!
            </h1>
            <p className="text-sm text-[#666666]">
              Review today’s schedule, approve pending requests, and keep your vendor operations moving.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Today's Bookings",
                value: metrics.todayVolume,
                icon: (
                  <svg className="h-11 w-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 3v4M17 3v4M5 11h14v8H5z" />
                  </svg>
                ),
              },
              {
                label: 'Weekly Velocity',
                value: metrics.weeklyVelocity,
                icon: (
                  <svg className="h-11 w-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6M4 20h16" />
                  </svg>
                ),
              },
              {
                label: 'Active Backlog',
                value: metrics.activeBacklog,
                icon: (
                  <svg className="h-11 w-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 11h10M6 15h12M9 19h6" />
                  </svg>
                ),
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="relative overflow-hidden rounded-2xl border border-[#262626] bg-[#1c1c1c] p-5">
                <div className="space-y-6 pr-14">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#737373]">
                    {label}
                  </span>
                  <div className="text-3xl font-semibold text-[#f5f5f5]">{value}</div>
                </div>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#39EF8E]/90">
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
          <section className="overflow-hidden rounded-2xl border border-[#262626] bg-[#1b1b1b]">
            <div className="border-b border-[#262626] px-6 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#737373]">
                 Recent Bookings
              </p>
             
            </div>
            <DataTable columns={columns} data={bookings} />
           
          </section>
          

        </div>
      </main>

      {/* Modal */}
      <BookingModal
        booking={selectedBooking}
        open={modalOpen}
        onClose={onCloseModal}
        status={selectedStatus}
        onStatusChange={onStatusSelect}
        onSave={onSaveStatus}
      />
    </div>
  )
}