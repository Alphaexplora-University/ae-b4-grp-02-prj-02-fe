// Shared Component — dropdown select for status filtering
// Props only, no API calls

interface FilterSelectProps {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

export default function FilterSelect({ value, options, onChange }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#39EF8E]/50 transition-colors cursor-pointer"
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}