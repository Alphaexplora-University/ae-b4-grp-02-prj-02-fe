// Shared Component — color-coded status badge
// Props only, no API calls

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'rejected' | 'Pending' | 'Accepted' | 'Rejected'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase() as 'pending' | 'accepted' | 'rejected'
  const styles = {
    pending: 'bg-yellow-950/50 text-yellow-400 border border-yellow-800/50',
    accepted: 'bg-green-950/50 text-[#39EF8E] border border-green-800/50',
    rejected: 'bg-red-950/50 text-red-400 border border-red-800/50',
  }
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1)

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${styles[normalized]}`}>
      {label}
    </span>
  )
}
