// Shared Component — color-coded status badge
// Props only, no API calls

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'rejected' | 'Pending' | 'Accepted' | 'Rejected'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase() as 'pending' | 'accepted' | 'rejected'
  const styles = {
    pending: 'bg-[#FEF4D7] text-[#92710C] border border-[#E8C95F]',
    accepted: 'bg-[#E5F5EC] text-[#1F7A4D] border border-[#7FCBA3]',
    rejected: 'bg-[#FFD1D1] text-[#A82A2A] border border-[#E89292]',
  }
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1)

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${styles[normalized]}`}>
      {label}
    </span>
  )
}

