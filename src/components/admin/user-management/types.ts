
export interface UserFormData {
  email: string;
  displayName: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  name?: string;
  role?: string;
  status?: string;
  lastLogin?: string;
  createdAt?: string;
}
