// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useCustomerDashboardViewModel } from '../viewmodel/useCustomerDashboardViewModel'
import AppLayout from '../../../shared-components/AppLayout/AppLayout'
import PageHeader from '../../../shared-components/PageHeader/PageHeader'
import CustomerNotificationBell from '../../../shared-components/CustomerNotificationBell/CustomerNotificationBell'
import BookingViewModal from '../../../shared-components/BookingViewModal/BookingViewModal'
import StatusBadge from '../../../shared-components/StatusBadge/StatusBadge'

export default function CustomerDashboardView() {
  const {
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
    selectedBooking,
    viewModalOpen,
    onOpenBookingForm,
    onCloseBookingForm,
    onBookingFormChange,
    onSubmitBooking,
    onToggleNotifications,
    onMarkAllRead,
    onSelectNotification,
    onCloseViewModal,
    onOpenViewModal,
  } = useCustomerDashboardViewModel()

  const vendorMap = new Map(vendors.map(v => [v.id, v.business_name]))

  const navItems = [
    {
      label: 'My Bookings',
      path: '/customer/dashboard',
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
    <AppLayout
      withSidebar
      sidebarProps={{
        navItems,
        roleLabel: 'Customer Portal',
      }}
    >
      <PageHeader
        breadcrumbParent="Dashboard"
        breadcrumbCurrent="My Bookings"
        name={customer?.name ?? 'Customer'}
        rightSlot={
          <CustomerNotificationBell
            unread={unreadCount}
            open={notificationOpen}
            items={notifications}
            onToggle={onToggleNotifications}
            onSelect={onSelectNotification}
            onMarkAllRead={onMarkAllRead}
          />
        }
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* Welcome */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Welcome, {customer?.name}!
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Track your booking requests and status updates.
          </p>
        </div>

        {/* My Bookings */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Booking History
            </h2>
            <button
              type="button"
              onClick={onOpenBookingForm}
              className="bg-[var(--accent)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Book Vendor
            </button>
          </div>

          {/* table */}
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="bg-[#3A865C] text-left">
                  <tr>
                    {['Date', 'Tracking Token', 'Vendor', 'Service Requested', 'My Notes', 'Status', 'Action'].map(col => (
                      <th
                        key={col}
                        className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white border-b border-[var(--border)]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-[var(--text-muted)] border-b border-[var(--border)]">
                        No bookings yet.
                      </td>
                    </tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-[var(--bg-card)] transition-colors">
                        <td className="px-4 py-3 text-sm border-b border-[var(--border)] text-[var(--text-primary)]/80 font-medium">
                          {new Date(booking.created_at).toLocaleDateString([], {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-3 py-3 text-sm border-b border-[var(--border)] text-[var(--text-primary)]/80 font-medium">
                          {booking.tracking_token}
                        </td>
                        <td className="px-3 py-3 text-sm border-b border-[var(--border)] text-[var(--text-primary)] font-semibold">
                          {vendorMap.get(booking.vendor_id) ?? 'Unknown Vendor'}
                        </td>
                        <td className="px-4 py-3 text-sm border-b border-[var(--border)] text-[var(--text-primary)]/80 font-medium">
                          {booking.service_requested}
                        </td>
                        <td className="px-4 py-3 text-sm border-b border-[var(--border)] text-[var(--text-primary)]/80 font-medium truncate max-w-[200px]">
                          {booking.notes}
                        </td>
                        <td className="px-4 py-3 border-b border-[var(--border)]">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-4 py-3 border-b border-[var(--border)]">
                          <button
                            onClick={() => onOpenViewModal(booking)}
                            className="bg-transparent text-[var(--accent)] text-sm font-semibold px-3 py-1 rounded-lg border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </section>

      </div>

      {/* View Modal */}
      <BookingViewModal
        booking={selectedBooking}
        open={viewModalOpen}
        onClose={onCloseViewModal}
      />

      {/* Booking Form Modal */}
      {bookingFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCloseBookingForm}
          />
          <div className="relative z-10 w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  New Booking
                </p>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-1">
                  Book Vendor
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseBookingForm}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="border-t border-[var(--border)]" />

            {formError && (
              <div className="bg-[#FFD1D1]/40 border border-[#E89292] rounded-lg px-4 py-3">
                <p className="text-[#A82A2A] text-sm">{formError}</p>
              </div>
            )}

            {formSuccess && (
              <div className="bg-[#E5F5EC] border border-[#7FCBA3] rounded-lg px-4 py-3">
                <p className="text-[#1F7A4D] text-sm">{formSuccess}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Vendor
              </label>
              <select
                value={bookingForm.vendor_id}
                onChange={e => onBookingFormChange('vendor_id', e.target.value)}
                disabled={vendorsLoading || vendors.length === 0}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              >
                <option value="">
                  {vendorsLoading ? 'Loading vendors...' : 'Choose a vendor'}
                </option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.business_name}
                  </option>
                ))}
              </select>
              {vendorsError && (
                <p className="text-xs text-[#A82A2A]">{vendorsError}</p>
              )}
              {!vendorsLoading && !vendorsError && vendors.length === 0 && (
                <p className="text-xs text-[var(--text-muted)]">No vendors are available yet.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Service Requested
              </label>
              <input
                type="text"
                value={bookingForm.service_requested}
                onChange={e => onBookingFormChange('service_requested', e.target.value)}
                placeholder="e.g. Wedding photography"
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Contact Number
              </label>
              <input
                type="text"
                value={bookingForm.customer_phone}
                onChange={e => onBookingFormChange('customer_phone', e.target.value)}
                placeholder="09171234567"
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Notes
              </label>
              <textarea
                value={bookingForm.notes}
                onChange={e => onBookingFormChange('notes', e.target.value)}
                placeholder="Optional details for the vendor"
                rows={3}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onCloseBookingForm}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium py-2.5 rounded-xl hover:text-[var(--text-primary)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmitBooking}
                className="flex-1 bg-[var(--accent)] text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}