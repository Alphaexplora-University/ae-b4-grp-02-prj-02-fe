// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RegisterForm, Vendor } from '../model/auth.model'
import { DEFAULT_REGISTER_FORM } from '../model/auth.model'

export function useRegisterViewModel() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>(DEFAULT_REGISTER_FORM)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFieldChange = (field: keyof RegisterForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const onSubmit = () => {
    setError('')

    if (!form.business_name || !form.owner_name || !form.email || !form.password || !form.confirm_password) {
      setError('All fields are required.')
      return
    }

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    // Check if email already exists
    const vendors: Vendor[] = JSON.parse(localStorage.getItem('vendors') ?? '[]')
    const exists = vendors.find(v => v.email === form.email)

    if (exists) {
      setError('Email already registered.')
      setLoading(false)
      return
    }

    // Register new vendor
    const newVendor: Vendor = {
      id: crypto.randomUUID(),
      business_name: form.business_name,
      owner_name: form.owner_name,
      email: form.email,
      password: form.password,
    }

    vendors.push(newVendor)
    localStorage.setItem('vendors', JSON.stringify(vendors))

    setLoading(false)
    navigate('/login')
  }

  return {
    form,
    error,
    loading,
    onFieldChange,
    onSubmit,
  }
}