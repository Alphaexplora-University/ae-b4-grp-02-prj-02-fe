// Shared Component — customer notification bell with status-aware icons
// Props only, no API calls

import type { CustomerNotification } from '../../features/customer_dashboard/model/customerDashboard.model'

interface CustomerNotificationBellProps {
  unread: number
  open: boolean
  items: CustomerNotification[]
  onToggle: () => void
  onSelect: (item: CustomerNotification) => void
  onMarkAllRead: () => void
}

function getNotificationCopy(notification: CustomerNotification) {
  const service = notification.service_requested
  const status = notification.new_status.toLowerCase()

  if (status === 'accepted') {
    return { title: 'Booking Request Accepted!', message: `Good news! Your request for ${service} has been accepted.` }
  }
  if (status === 'rejected') {
    return { title: 'Booking Request Rejected', message: `Sorry, your request for ${service} was rejected. You may contact the vendor for more details.` }
  }
  return { title: 'Booking Request Update', message: `Your request for ${service} is still waiting for the vendor to review it.` }
}

function getStatusVisuals(status: string) {
  const normalized = status.toLowerCase()
  const map: Record<string, { bg: string; icon: string }> = {
    pending: { bg: '#FEF4D7', icon: '#92710C' },
    accepted: { bg: '#E5F5EC', icon: '#1F7A4D' },
    rejected: { bg: '#FFD1D1', icon: '#A82A2A' },
  }
  return map[normalized] ?? map.pending
}

function StatusIcon({ status }: { status: string }) {
  const normalized = status.toLowerCase()

  if (normalized === 'accepted') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  if (normalized === 'rejected') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  )
}

export default function CustomerNotificationBell({
  unread,
  open,
  items,
  onToggle,
  onSelect,
  onMarkAllRead,
}: CustomerNotificationBellProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="relative bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2.5 rounded-xl transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 17a2 2 0 0 0 4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-96 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-[10px] text-[var(--accent)] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[var(--text-muted)]">No notifications yet.</p>
              </div>
            ) : (
              items.map(n => {
                const copy = getNotificationCopy(n)
                const visuals = getStatusVisuals(n.new_status)

                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => onSelect(n)}
                    className={`w-full text-left px-5 py-4 border-b border-[var(--border)] flex items-start gap-3 hover:bg-[var(--bg-card)] transition-colors ${
                      !n.read ? 'bg-[var(--accent)]/5' : ''
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: visuals.bg, color: visuals.icon }}
                    >
                      <StatusIcon status={n.new_status} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-4">
                        <p className="text-sm text-[var(--text-primary)] font-medium">
                          {copy.title}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)] shrink-0">
                          {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <p className="text-[13px] mb-1 text-[var(--text-secondary)] mt-1 leading-relaxed">
                        {copy.message}
                      </p>
                      <p className="text-[10px] mt- text-[var(--text-muted)] shrink-0">
                          {new Date(n.created_at).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                    </div>

                    {!n.read && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}