// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useLoginViewModel } from '../viewmodel/useLoginViewModel'
import { useNavigate } from 'react-router-dom'

export default function LoginView() {
  const { form, error, loading, onFieldChange, onSubmit } = useLoginViewModel()
  const navigate = useNavigate()

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <p className="text-[#39EF8E] text-xs uppercase tracking-[0.3em] mb-2">Vendor Portal</p>
          <h1 className="text-2xl font-semibold text-[#f5f5f5]">Sign in to your account</h1>
          <p className="text-sm text-[#666666] mt-1">Manage your bookings and operations</p>
        </div>

        {/* Card */}
        <div className="bg-[#161616] border border-[#232323] rounded-2xl p-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

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

          {/* Submit */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="w-full bg-[#39EF8E] text-[#071208] font-semibold text-sm py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-[#666666]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-[#39EF8E] hover:underline font-medium"
            >
              Register
            </button>
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="h-px flex-1 bg-[#2a2a2a]" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#525252]">Portal switch</span>
            <div className="h-px flex-1 bg-[#2a2a2a]" />
          </div>

          <p className="text-center text-sm text-[#666666]">
            Are you a customer?{' '}
            <button
              type="button"
              onClick={() => navigate('/customer/login')}
              className="text-[#525252] hover:text-[#a3a3a3] font-medium"
            >
              Sign in here
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}