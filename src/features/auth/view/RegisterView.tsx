// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useRegisterViewModel } from '../viewmodel/useRegisterViewModel'
import { useNavigate } from 'react-router-dom'

export default function RegisterView() {
  const { form, error, loading, onFieldChange, onSubmit } = useRegisterViewModel()
  const navigate = useNavigate()

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#0A0A0A] overflow-y-auto py-8">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <p className="text-[#39EF8E] text-xs uppercase tracking-[0.3em] mb-2">Vendor Portal</p>
          <h1 className="text-2xl font-semibold text-[#f5f5f5]">Create your account</h1>
          <p className="text-sm text-[#666666] mt-1">Start managing your bookings today</p>
        </div>

        {/* Card */}
        <div className="bg-[#161616] border border-[#232323] rounded-2xl p-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Business Name
            </label>
            <input
              type="text"
              value={form.business_name}
              onChange={e => onFieldChange('business_name', e.target.value)}
              placeholder="Studio Malaya Photography"
              className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
            />
          </div>

          {/* Owner Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Owner Name
            </label>
            <input
              type="text"
              value={form.owner_name}
              onChange={e => onFieldChange('owner_name', e.target.value)}
              placeholder="Juan dela Cruz"
              className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => onFieldChange('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => onFieldChange('password', e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirm_password}
              onChange={e => onFieldChange('confirm_password', e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#404040] focus:outline-none focus:border-[#39EF8E]/50 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="w-full bg-[#39EF8E] text-[#071208] font-semibold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-[#666666]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#39EF8E] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}