// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useCustomerDashboardViewModel } from '../viewmodel/useCustomerDashboardViewModel'
import StatusBadge from '../../../shared-components/StatusBadge/StatusBadge'
import type { CustomerNotification } from '../model/customerDashboard.model'

function getNotificationCopy(notification: CustomerNotification) {
  const service = notification.service_requested
  const status = notification.new_status.toLowerCase()

  if (status === 'accepted') {
    return {
      title: 'Your booking was accepted',
      message: `Good news! Your request for ${service} has been accepted.`,
    }
  }

  if (status === 'rejected') {
    return {
      title: 'Your booking was declined',
      message: `Sorry, your request for ${service} was declined. You may contact the vendor for more details.`,
    }
  }

  return {
    title: 'Your booking is waiting for review',
    message: `Your request for ${service} is still waiting for the vendor to review it.`,
  }
}

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
    onOpenBookingForm,
    onCloseBookingForm,
    onBookingFormChange,
    onSubmitBooking,
    onToggleNotifications,
    onMarkNotificationRead,
    onMarkAllRead,
    onLogout,
  } = useCustomerDashboardViewModel()

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] text-[#a3a3a3] flex flex-col overflow-hidden">

      {/* TOP NAVBAR */}
      <header className="h-14 bg-[#111111] border-b border-[#232323] flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <p className="text-[#39EF8E] text-xs uppercase tracking-[0.3em] font-semibold">
            Customer Portal
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#737373]">
            {customer?.name}
          </span>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={onToggleNotifications}
              className="relative bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#3d3d3d] text-[#a3a3a3] hover:text-[#e5e5e5] p-2.5 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 17a2 2 0 0 0 4 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#39EF8E] text-[#071208] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-[#161616] border border-[#232323] rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="px-5 py-4 border-b border-[#232323] flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#f5f5f5]">Notifications</p>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={onMarkAllRead}
                      className="text-[10px] text-[#39EF8E] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-[#525252]">No notifications yet.</p>
                    </div>
                  ) : (
                    notifications.map(n => {
                      const copy = getNotificationCopy(n)

                      return (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`px-5 py-4 border-b border-[#1e1e1e] cursor-pointer hover:bg-[#1e1e1e] transition-colors ${
                            !n.read ? 'bg-[#39EF8E]/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {!n.read && (
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#39EF8E] shrink-0" />
                            )}
                            <div className={!n.read ? '' : 'ml-5'}>
                              <p className="text-sm text-[#f5f5f5] font-medium">
                                {copy.title}
                              </p>
                              <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                                {copy.message}
                              </p>
                              <div className="mt-2">
                                <StatusBadge status={n.new_status} />
                              </div>
                              <p className="text-[10px] text-[#525252] mt-1.5">
                                {new Date(n.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg transition-colors hover:bg-red-600 hover:border-red-600 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">

        {/* Welcome */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[#f5f5f5]">
            Welcome, {customer?.name}!
          </h1>
          <p className="text-xs text-[#666666]">
            Track your booking requests and status updates.
          </p>
        </div>

        {/* My Bookings */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#737373]">
                My Bookings
              </p>
              <h2 className="text-lg font-semibold text-[#f5f5f5] mt-1">
                Booking History
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenBookingForm}
              className="bg-[#39EF8E] text-[#071208] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Book Vendor
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#1b1b1b]">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="bg-[#181818] text-left">
                  <tr>
                    {['Tracking Token', 'Vendor', 'Service Requested', 'Status', 'Date'].map(col => (
                      <th
                        key={col}
                        className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#737373] border-b border-[#262626]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242424]">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-sm text-[#525252]">
                        No bookings yet.
                      </td>
                    </tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-[#1e1e1e] transition-colors">
                        <td className="px-4 py-3 text-sm text-[#d4d4d4]">{booking.tracking_token}</td>
                        <td className="px-4 py-3 text-sm text-[#d4d4d4]">Vendor</td>
                        <td className="px-4 py-3 text-sm text-[#d4d4d4]">{booking.service_requested}</td>
                        <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
                        <td className="px-4 py-3 text-sm text-[#d4d4d4]">
                          {new Date(booking.created_at).toLocaleDateString()}
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

      {bookingFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseBookingForm}
          />
          <div className="relative z-10 w-full max-w-lg bg-[#161616] border border-[#232323] rounded-2xl p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#737373]">
                  New Booking
                </p>
                <h2 className="text-lg font-semibold text-[#f5f5f5] mt-1">
                  Book Vendor
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseBookingForm}
                className="text-[#525252] hover:text-[#f5f5f5] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="border-t border-[#232323]" />

            {formError && (
              <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{formError}</p>
              </div>
            )}

            {formSuccess && (
              <div className="bg-green-950/50 border border-green-800/50 rounded-lg px-4 py-3">
                <p className="text-[#39EF8E] text-sm">{formSuccess}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
                Vendor
              </label>
              <select
                value={bookingForm.vendor_id}
                onChange={e => onBookingFormChange('vendor_id', e.target.value)}
                disabled={vendorsLoading || vendors.length === 0}
                className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
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
                <p className="text-xs text-red-400">{vendorsError}</p>
              )}
              {!vendorsLoading && !vendorsError && vendors.length === 0 && (
                <p className="text-xs text-[#737373]">No vendors are available yet.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
                Service Requested
              </label>
              <input
                type="text"
                value={bookingForm.service_requested}
                onChange={e => onBookingFormChange('service_requested', e.target.value)}
                placeholder="e.g. Wedding photography"
                className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
                Contact Number
              </label>
              <input
                type="text"
                value={bookingForm.customer_phone}
                onChange={e => onBookingFormChange('customer_phone', e.target.value)}
                placeholder="09171234567"
                className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
                Notes
              </label>
              <textarea
                value={bookingForm.notes}
                onChange={e => onBookingFormChange('notes', e.target.value)}
                placeholder="Optional details for the vendor"
                rows={3}
                className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onCloseBookingForm}
                className="flex-1 bg-[#1e1e1e] border border-[#2d2d2d] text-[#a3a3a3] text-sm font-medium py-2.5 rounded-xl hover:text-[#f5f5f5] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmitBooking}
                className="flex-1 bg-[#39EF8E] text-[#071208] text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
