// ViewModel layer — owns all state, logic, and handlers
// NO JSX, NO rendering

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CustomerRegisterForm, Customer } from '../model/customerAuth.model'
import { DEFAULT_CUSTOMER_REGISTER_FORM } from '../model/customerAuth.model'

export function useCustomerRegisterViewModel() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CustomerRegisterForm>(DEFAULT_CUSTOMER_REGISTER_FORM)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFieldChange = (field: keyof CustomerRegisterForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const onSubmit = () => {
    setError('')

    if (!form.name || !form.email || !form.password || !form.confirm_password) {
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
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers') ?? '[]')
    const exists = customers.find(c => c.email === form.email)

    if (exists) {
      setError('Email already registered.')
      setLoading(false)
      return
    }

    // Register new customer
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      password: form.password,
    }

    customers.push(newCustomer)
    localStorage.setItem('customers', JSON.stringify(customers))

    setLoading(false)
    navigate('/customer/login')
  }

  return {
    form,
    error,
    loading,
    onFieldChange,
    onSubmit,
  }
}