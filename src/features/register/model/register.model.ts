// MODEL layer
export interface RegisterForm {
  business_name: string;
  owner_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface Vendor {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  password: string;
}

export const emptyRegisterForm: RegisterForm = {
  business_name: '',
  owner_name: '',
  email: '',
  password: '',
  confirm_password: '',
};
