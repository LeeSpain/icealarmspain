
import { signUp as authSignUp } from '@/services/auth';
import { User } from '../types';

// Sign up function (create a new user)
export const signUp = async (
  email: string, 
  password: string, 
  userData?: any
): Promise<{ user: User | null; error: any | null }> => {
  console.log('Signup attempt:', { email });
  
  if (!email || !password) {
    return { 
      user: null, 
      error: new Error('Email and password are required') 
    };
  }
  
  try {
    const result = await authSignUp(email, password, {
      display_name: userData?.display_name,
      displayName: userData?.display_name,
    });
    
    return result;
  } catch (error) {
    console.error('Authentication error during signup:', error);
    return { user: null, error };
  }
};

// Export this function for backward compatibility
export const createUser = signUp;
