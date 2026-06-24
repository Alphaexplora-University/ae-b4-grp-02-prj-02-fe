// MODEL layer
export interface LoginForm {
  email: string;
  password: string;
}

export interface Vendor {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  password: string;
}

export const emptyLoginForm: LoginForm = {
  email: '',
  password: '',
};

export const storageKeys = {
  vendors: 'vendor-management-vendors',
  bookings: 'vendor-management-bookings',
  session: 'vendor-management-session',
} as const;
