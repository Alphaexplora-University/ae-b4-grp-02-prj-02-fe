// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useCustomerRegisterViewModel } from '../viewmodel/useCustomerRegisterViewModel'
import { useNavigate } from 'react-router-dom'

export default function CustomerRegisterView() {
  const { form, error, loading, onFieldChange, onSubmit } = useCustomerRegisterViewModel()
  const navigate = useNavigate()

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#0A0A0A] overflow-y-auto py-8">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <p className="text-[#39EF8E] text-xs uppercase tracking-[0.3em] mb-2">Customer Portal</p>
          <h1 className="text-2xl font-semibold text-[#f5f5f5]">Create your account</h1>
          <p className="text-sm text-[#666666] mt-1">Start booking your favorite vendors</p>
        </div>

        {/* Card */}
        <div className="bg-[#161616] border border-[#232323] rounded-2xl p-8 space-y-5">

          {/* Error */}
          {error && (
            <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => onFieldChange('name', e.target.value)}
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
              onClick={() => navigate('/customer/login')}
              className="text-[#39EF8E] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>

          {/* Vendor Link */}
          <p className="text-center text-sm text-[#666666]">
            Are you a vendor?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
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