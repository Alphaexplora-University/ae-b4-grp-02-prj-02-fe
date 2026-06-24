// Model layer — pure TypeScript types only
// ZERO functions, ZERO hooks

export interface Customer {
  id: string
  name: string
  email: string
  password: string
}

export interface CustomerLoginForm {
  email: string
  password: string
}

export interface CustomerRegisterForm {
  name: string
  email: string
  password: string
  confirm_password: string
}

export const DEFAULT_CUSTOMER_LOGIN_FORM: CustomerLoginForm = {
  email: '',
  password: '',
}

export const DEFAULT_CUSTOMER_REGISTER_FORM: CustomerRegisterForm = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
}