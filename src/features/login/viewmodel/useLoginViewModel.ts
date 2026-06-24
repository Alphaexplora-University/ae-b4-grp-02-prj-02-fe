// VIEWMODEL layer
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginForm, Vendor } from '../model/login.model';
import { emptyLoginForm, storageKeys } from '../model/login.model';

export function useLoginViewModel() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>(emptyLoginForm);
  const [error, setError] = useState('');

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }

    const storedVendors = window.localStorage.getItem(storageKeys.vendors);
    const vendors: Vendor[] = storedVendors ? JSON.parse(storedVendors) : [];

    const vendor = vendors.find(
      (entry) => entry.email.toLowerCase() === form.email.toLowerCase() && entry.password === form.password,
    );

    if (!vendor) {
      setError('Invalid credentials. Please check your details or register a new vendor account.');
      return;
    }

    window.localStorage.setItem(storageKeys.session, JSON.stringify(vendor));
    navigate('/dashboard');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return {
    form,
    error,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onRegisterClick: goToRegister,
  };
}
