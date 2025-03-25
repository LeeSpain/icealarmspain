
import { signIn, signOut } from '@/services/auth';
import { User } from '../types';

// Login with email and password
export const login = async (
  email: string, 
  password: string, 
  rememberMe: boolean = false
): Promise<User> => {
  try {
    const user = await signIn(email, password, rememberMe);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Sign out the current user
export const logout = async (): Promise<void> => {
  try {
    await signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
