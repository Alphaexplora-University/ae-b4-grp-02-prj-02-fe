// Shared Component — color-coded status badge
// Props only, no API calls

interface StatusBadgeProps {
  status: 'Pending' | 'Accepted' | 'Rejected'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Pending: 'bg-yellow-950/50 text-yellow-400 border border-yellow-800/50',
    Accepted: 'bg-green-950/50 text-[#39EF8E] border border-green-800/50',
    Rejected: 'bg-red-950/50 text-red-400 border border-red-800/50',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}