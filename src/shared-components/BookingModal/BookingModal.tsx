// Shared Component — booking details modal with status update
// Props only, no API calls

import StatusBadge from '../StatusBadge/StatusBadge'
import type { Booking } from '../../features/dashboard/model/dashboard.model'

interface BookingModalProps {
  booking: Booking | null
  open: boolean
  status: 'Pending' | 'Accepted' | 'Rejected'
  onClose: () => void
  onStatusChange: (status: 'Pending' | 'Accepted' | 'Rejected') => void
  onSave: () => void
}

export default function BookingModal({
  booking,
  open,
  status,
  onClose,
  onStatusChange,
  onSave,
}: BookingModalProps) {
  if (!open || !booking) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl bg-[#161616] border border-[#232323] rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="px-8 pt-6 pb-4">
          <h2 className="text-sm font-medium text-[#737373] tracking-wide uppercase">
                booking information
          </h2>
        </div>

        {/* Top Divider line running edge-to-edge */}
        <div className="border-t border-[#232323]" />

        {/* Content Body */}
        <div className="p-8 space-y-6">
          
          {/* Top Info Highlights Box (Customer details) */}
          <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#a3a3a3] font-medium">Tracking Token</span>
              <span className="text-xs text-[#737373] font-mono">{booking.tracking_token}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#a3a3a3] font-medium">Customer</span>
              <span className="text-sm text-[#f5f5f5] font-semibold">{booking.customer_name}</span>
            </div>
            <div className="text-xs text-[#737373] pt-1 border-t border-[#262626]/60 flex justify-between items-center">
              <span>{booking.customer_email} • {booking.customer_phone}</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>



          {/* Service Requested & Notes (Compact block) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#737373] uppercase tracking-wider block">
              Service Details
            </label>
            <div className="bg-[#1a1a1a]/40 border border-[#232323] rounded-xl px-4 py-5 text-sm text-[#a3a3a3] space-y-1">
              <p><span className="text-[#737373]">Service:</span> {booking.service_requested}</p>
              <p><span className="text-[#737373]">Notes:</span> {booking.notes || '—'}</p>
            </div>
          </div>
                 {/* Update Status Dropdown Block (Matches the middle grey container element in image_7004e4.png) */}
          <div className="space-y-1 ">
            <label className="text-xs font-semibold text-[#737373] uppercase tracking-wider block">
              Update Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={e => onStatusChange(e.target.value as 'Pending' | 'Accepted' | 'Rejected')}
                className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-sm px-5 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#39EF8E]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              {/* Custom Chevron Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#737373]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Highlight Notification Notice Box (Yellow outline wireframe box) */}
          <div className="border border-yellow-600/40 bg-yellow-500/5 rounded-2xl px-5 py-4">
            <p className="text-yellow-500/90 text-xs leading-relaxed flex gap-2">
              <span className="shrink-0">⚠️</span>
              <span>Updating booking status automatically sends a real-time  notification to the customer.</span>
            </p>
          </div>
        </div>
           

        {/* Bottom Divider line running edge-to-edge */}
        <div className="border-t border-[#232323]" />

        {/* Footer Actions — Aligned Right */}
        <div className="px-8 py-5 bg-[#131313]/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-[#a3a3a3] bg-transparent border border-[#2d2d2d] rounded-xl hover:text-[#f5f5f5] hover:bg-[#1e1e1e] transition-all min-w-[100px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 text-sm font-semibold text-[#071208] bg-[#39EF8E] rounded-xl hover:opacity-90 transition-opacity min-w-[120px]"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  )
}