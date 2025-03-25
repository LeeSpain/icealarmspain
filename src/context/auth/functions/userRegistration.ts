
import { signUp as authSignUp } from '@/services/auth';
import { User } from '../types';

// Sign up function (create a new user)
export const signUp = async (
  email: string, 
  password: string, 
  userData?: Partial<User>
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
      displayName: userData?.displayName || email.split('@')[0],
      name: userData?.name || userData?.displayName || email.split('@')[0]
    });
    
    return result;
  } catch (error) {
    console.error('Authentication error during signup:', error);
    return { user: null, error };
  }
};

// Export this function for backward compatibility
export const createUser = signUp;
