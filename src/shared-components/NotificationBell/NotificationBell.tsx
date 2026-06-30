// Shared Component — bell icon with unread count badge and dropdown panel
// Props only, no API calls

import type { NotificationItem } from '../../features/dashboard/model/dashboard.model'

interface NotificationBellProps {
  unread: number
  open: boolean
  items: NotificationItem[]
  onToggle: () => void
  onSelect: (item: NotificationItem) => void
}

export default function NotificationBell({
  unread,
  open,
  items,
  onToggle,
  onSelect,
}: NotificationBellProps) {
  const activity = items.filter(i => i.type === 'activity')

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={onToggle}
        className="relative bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2.5 rounded-xl transition-colors"
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

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-96 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-xl z-50 overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
            {unread > 0 && (
              <span className="text-[10px] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-2 py-0.5 rounded-full">
                {unread} unread
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {/* New Activity */}
            {activity.length > 0 && (
              <div>
                <p className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  New Booking Request
                </p>
                {activity.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`w-full text-left px-5 py-3 border-t border-[var(--border)] flex items-start gap-3 hover:bg-[var(--bg-card)] transition-colors ${
                      !item.read ? 'bg-[#FEF4D7]/30' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-full bg-[#FEF4D7] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#92710C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-[var(--text-primary)] font-medium truncate">
                          {item.customer_name}
                        </p>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                        {item.service_requested}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {!item.read && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FFB000] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {items.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[var(--text-muted)]">No notifications yet.</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}