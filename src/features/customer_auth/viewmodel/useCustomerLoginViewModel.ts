// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CustomerLoginForm, Customer } from '../model/customerAuth.model'
import { DEFAULT_CUSTOMER_LOGIN_FORM } from '../model/customerAuth.model'

export function useCustomerLoginViewModel() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CustomerLoginForm>(DEFAULT_CUSTOMER_LOGIN_FORM)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFieldChange = (field: keyof CustomerLoginForm, value: string) => {
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

    // Validate against localStorage customers
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers') ?? '[]')
    const match = customers.find(
      c => c.email === form.email && c.password === form.password
    )

    if (!match) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    // Persist customer session separately from vendor session
    localStorage.setItem('customer_session', JSON.stringify(match))
    setLoading(false)
    navigate('/customer/dashboard')
  }

  return {
    form,
    error,
    loading,
    onFieldChange,
    onSubmit,
  }
}