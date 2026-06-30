// Shared Component — dropdown select for status filtering
// Props only, no API calls

interface FilterSelectProps {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

export default function FilterSelect({ value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors cursor-pointer"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom dropdown icon */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}