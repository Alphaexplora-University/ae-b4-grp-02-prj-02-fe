// Model layer — pure TypeScript types only
// ZERO functions, ZERO hooks

export interface Vendor {
  id: string
  business_name: string
  owner_name: string
  email: string
  password: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  business_name: string
  owner_name: string
  email: string
  password: string
  confirm_password: string
}

export const DEFAULT_LOGIN_FORM: LoginForm = {
  email: '',
  password: '',
}

export const DEFAULT_REGISTER_FORM: RegisterForm = {
  business_name: '',
  owner_name: '',
  email: '',
  password: '',
  confirm_password: '',
}