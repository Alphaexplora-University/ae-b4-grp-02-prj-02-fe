// Shared Component — bell icon with unread count badge and dropdown panel
// Props only, no API calls

import type { NotificationItem } from '../../features/dashboard/model/dashboard.model'

interface NotificationBellProps {
  count: number
  unread: number
  open: boolean
  items: NotificationItem[]
  onToggle: () => void
  onSelect: (item: NotificationItem) => void
}

export default function NotificationBell({
  count,
  unread,
  open,
  items,
  onToggle,
  onSelect,
}: NotificationBellProps) {
  const urgent = items.filter(i => i.type === 'urgent')
  const activity = items.filter(i => i.type === 'activity')

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={onToggle}
        className="relative bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#3d3d3d] text-[#a3a3a3] hover:text-[#e5e5e5] p-2.5 rounded-xl transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 17a2 2 0 0 0 4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#39EF8E] text-[#071208] text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-[#161616] border border-[#232323] rounded-2xl shadow-2xl z-50 overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-[#232323] flex items-center justify-between">
            <p className="text-sm font-semibold text-[#f5f5f5]">Notifications</p>
            {unread > 0 && (
              <span className="text-[10px] bg-[#39EF8E]/10 text-[#39EF8E] border border-[#39EF8E]/20 px-2 py-0.5 rounded-full">
                {unread} unread
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">

            {/* Urgent Triage */}
            {urgent.length > 0 && (
              <div>
                <p className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#525252]">
                  Urgent Triage
                </p>
                {urgent.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-[#1e1e1e] transition-colors ${
                      !item.read ? 'bg-[#39EF8E]/5' : ''
                    }`}
                  >
                    {!item.read && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#39EF8E] shrink-0" />
                    )}
                    <div className={!item.read ? '' : 'ml-5'}>
                      <p className="text-sm text-[#d4d4d4] font-medium">{item.customer_name}</p>
                      <p className="text-xs text-[#525252] mt-0.5">{item.service_requested}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* New Activity */}
            {activity.length > 0 && (
              <div>
                <p className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#525252] border-t border-[#232323]">
                  New Activity
                </p>
                {activity.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-[#1e1e1e] transition-colors ${
                      !item.read ? 'bg-[#39EF8E]/5' : ''
                    }`}
                  >
                    {!item.read && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#39EF8E] shrink-0" />
                    )}
                    <div className={!item.read ? '' : 'ml-5'}>
                      <p className="text-sm text-[#d4d4d4] font-medium">{item.customer_name}</p>
                      <p className="text-xs text-[#525252] mt-0.5">{item.service_requested}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {items.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#525252]">No notifications yet.</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}