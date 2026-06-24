// VIEWMODEL layer
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RegisterForm, Vendor } from '../model/register.model';
import { emptyRegisterForm } from '../model/register.model';

export function useRegisterViewModel() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>(emptyRegisterForm);
  const [error, setError] = useState('');

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.business_name || !form.owner_name || !form.email || !form.password || !form.confirm_password) {
      setError('All fields are required.');
      return;
    }

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    const storedVendors = window.localStorage.getItem('vendor-management-vendors');
    const vendors: Vendor[] = storedVendors ? JSON.parse(storedVendors) : [];

    const exists = vendors.some((vendor) => vendor.email.toLowerCase() === form.email.toLowerCase());
    if (exists) {
      setError('An account with that email is already registered.');
      return;
    }

    const newVendor: Vendor = {
      id: crypto.randomUUID(),
      business_name: form.business_name,
      owner_name: form.owner_name,
      email: form.email,
      password: form.password,
    };

    vendors.push(newVendor);
    window.localStorage.setItem('vendor-management-vendors', JSON.stringify(vendors));
    navigate('/login');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return {
    form,
    error,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onLoginClick: goToLogin,
  };
}
