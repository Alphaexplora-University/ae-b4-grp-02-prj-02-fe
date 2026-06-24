// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LoginForm, Vendor } from '../model/auth.model'
import { DEFAULT_LOGIN_FORM } from '../model/auth.model'

export function useLoginViewModel() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>(DEFAULT_LOGIN_FORM)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFieldChange = (field: keyof LoginForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const onSubmit = () => {
    setError('')

    if (!form.email || !form.password) {
      setError('All fields are required.')
      return
    }

    setLoading(true)

    // Simulate auth against localStorage
    const vendors: Vendor[] = JSON.parse(localStorage.getItem('vendors') ?? '[]')
    const match = vendors.find(
      v => v.email === form.email && v.password === form.password
    )

    if (!match) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    // Persist session
    localStorage.setItem('session', JSON.stringify(match))
    setLoading(false)
    navigate('/dashboard')
  }

  return {
    form,
    error,
    loading,
    onFieldChange,
    onSubmit,
  }
}