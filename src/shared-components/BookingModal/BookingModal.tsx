// Shared Component — booking details modal with status update
// Props only, no API calls

import StatusBadge from "../StatusBadge/StatusBadge";
import type { Booking } from "../../features/dashboard/model/dashboard.model";

interface BookingModalProps {
  booking: Booking | null;
  open: boolean;
  status: "pending" | "accepted" | "rejected";
  onClose: () => void;
  onStatusChange: (status: "pending" | "accepted" | "rejected") => void;
  onSave: () => void;
}

export default function BookingModal({
  booking,
  open,
  status,
  onClose,
  onStatusChange,
  onSave,
}: BookingModalProps) {
  if (!open || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl bg-[#FEFEFE] border border-[#E5E5E5] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="px-8 pt-6 pb-4">
          <h2 className="text-sm font-medium text-[#6B6E70] tracking-wide uppercase">
            booking information
          </h2>
        </div>

        {/* Top Divider line running edge-to-edge */}
        <div className="border-t border-[#E5E5E5]" />

        {/* Content Body */}
        <div className="p-7 space-y-6">
          {/* SECTION 1: CUSTOMER INFORMATION */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#737373] uppercase tracking-wider block">
              Customer information
            </label>

            <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-4 space-y-4">
              {/* Tracking Token (Stacked to accommodate long UUID strings safely) */}
              <div className="flex flex-col gap-1 pb-3 border-b border-[#E5E5E5]">
                <span className="text-[13px] font-medium text-[#8a8a8a]">
                  Tracking Token
                </span>
                <span className="text-sm font-mono text-[#252728] select-all break-all">
                  {booking.tracking_token}
                </span>
              </div>

              {/* Customer Name */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-[#8a8a8a]">
                  Customer Name
                </span>
                <span className="text-[16px] text-[#252728] font-semibold">
                  {booking.customer_name}
                </span>
              </div>

              {/* Contact Metadata Row & Current Status Badge */}
              <div className="pt-3 border-t border-[#E5E5E5] flex justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-[14px] text-[#5B5D5E]">
                  <span>{booking.customer_email}</span>
                  <span className="text-[#C4C4C4] select-none">•</span>
                  <span>{booking.customer_phone}</span>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={booking.status} />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: SERVICE DETAILS */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#737373] uppercase tracking-wider block">
              Service Details
            </label>

            <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl p-4 space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-medium text-[#8a8a8a]">
                  Service Requested
                </span>
                <span className="text-[15px] text-[#252728] font-medium">
                  {booking.service_requested}
                </span>
              </div>

              <div className="flex flex-col gap-1 pt-2.5 border-t border-[#E5E5E5]">
                <span className="text-[13px] font-medium text-[#8a8a8a]">
                  Notes
                </span>
                <p className="text-sm text-[#5B5D5E] leading-relaxed whitespace-pre-wrap">
                  {booking.notes || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: UPDATE STATUS DROPDOWN */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#737373] uppercase tracking-wider block">
              Update Status
            </label>

            <div className="relative">
              <select
                value={status}
                onChange={(e) =>
                  onStatusChange(
                    e.target.value as "pending" | "accepted" | "rejected",
                  )
                }
                className="w-full bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#252728] focus:outline-none focus:border-[#349E64]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
                <option value="rejected">Reject</option>
              </select>

              {/* Custom Chevron Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#737373]">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* SECTION 4: SYSTEM ALERT BOX */}
          <div className="border border-yellow-500/40 bg-yellow-400/10 rounded-xl px-4 py-3.5">
            <p className="text-yellow-700 text-[13px] leading-relaxed flex gap-2.5 items-start">
              <span className="shrink-0 text-sm leading-none">⚠️</span>
              <span>
                Updating booking status automatically sends a real-time
                notification to the customer.
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Divider line running edge-to-edge */}
        <div className="border-t border-[#E5E5E5]" />

        {/* Footer Actions — Aligned Right */}
        <div className="px-8 py-5 bg-[#F9FAFB]/70 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-[#525252] bg-transparent border border-[#D4D4D4] rounded-xl hover:text-[#252728] hover:bg-[#F0F0F0] transition-all min-w-[100px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 text-sm font-semibold text-[#FEFEFE] bg-[#349E64] rounded-xl hover:opacity-90 transition-opacity min-w-[120px]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}