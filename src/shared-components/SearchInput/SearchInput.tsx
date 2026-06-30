// Shared Component — controlled search input
// Props only, no API calls

interface SearchInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, placeholder, onChange }: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Search...'}
        className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
      />
    </div>
  )
}