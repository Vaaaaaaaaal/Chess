export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}
