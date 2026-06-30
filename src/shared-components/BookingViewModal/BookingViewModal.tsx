// Shared Component — read-only booking details modal for customers
// Props only, no API calls

import StatusBadge from '../StatusBadge/StatusBadge'

interface Booking {
  id: string
  tracking_token: string
  customer_name?: string
  service_requested: string
  notes: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

interface BookingViewModalProps {
  booking: Booking | null
  open: boolean
  onClose: () => void
}

export default function BookingViewModal({ booking, open, onClose }: BookingViewModalProps) {
  if (!open || !booking) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-6 pb-4 flex items-start justify-between">
          <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide uppercase">
            Booking Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border-t border-[var(--border)]" />

        <div className="p-7 space-y-6">

          {/* Service + Status */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 space-y-4">
            <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border)]">
              <span className="text-[13px] font-medium text-[var(--text-muted)]">
                Tracking Token
              </span>
              <span className="text-sm font-mono text-[var(--text-primary)] select-all break-all">
                {booking.tracking_token}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-[var(--text-muted)]">
                Service Requested
              </span>
              <span className="text-[16px] text-[var(--text-primary)] font-semibold">
                {booking.service_requested}
              </span>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Current Status</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block">
                Notes
              </label>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {booking.notes}
                </p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[13px] font-medium text-[var(--text-muted)]">
                Date Requested
              </span>
              <p className="text-sm text-[var(--text-primary)]">
                {new Date(booking.created_at).toLocaleString([], {
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[13px] font-medium text-[var(--text-muted)]">
                Last Updated
              </span>
              <p className="text-sm text-[var(--text-primary)]">
                {new Date(booking.updated_at).toLocaleString([], {
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-[var(--border)]" />

        <div className="px-8 py-5 bg-[var(--bg-card)]/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] bg-transparent border border-[var(--border)] rounded-xl hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all min-w-[100px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}