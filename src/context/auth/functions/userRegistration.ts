
import { User } from '../types';
import { isMockAuthEnabled } from '@/utils/environment';

// Example function to create a new user
export const signUp = async (
  email: string,
  password: string,
  userData: any = {}
): Promise<{ user?: User; error?: any }> => {
  console.log('Signing up:', email, userData);

  try {
    if (isMockAuthEnabled()) {
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        uid: `mock-${Date.now()}`,
        email: email,
        name: userData.name || email.split('@')[0],
        displayName: userData.name || email.split('@')[0],
        role: 'member',
        profileCompleted: false,
        status: 'active',
        language: userData.language || 'en'
      };

      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      // Simulate sending welcome email
      console.log(`Mock: Sending welcome email to ${email}`);
      
      return { user: mockUser };
    } else {
      // In a real app, this would be implemented with Firebase Auth
      console.log('Signup not implemented in production mode');
      return { error: 'Sign up not implemented for production yet' };
    }
  } catch (error) {
    console.error('Sign up error:', error);
    return { error };
  }
};

// Function to create a user (admin function)
export const createUser = async (
  email: string,
  password: string,
  userData: any = {}
): Promise<{ user?: User; error?: any }> => {
  console.log('Admin creating user:', email, userData);

  try {
    if (isMockAuthEnabled()) {
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        uid: `mock-${Date.now()}`,
        email: email,
        name: userData.name || email.split('@')[0],
        displayName: userData.name || email.split('@')[0],
        role: userData.role || 'member',
        profileCompleted: false,
        status: 'active',
        language: userData.language || 'en'
      };
      
      // Simulate notification
      console.log(`Mock: Admin created user ${email} with role ${mockUser.role}`);
      
      return { user: mockUser };
    } else {
      // In a real app, this would be implemented with Firebase Admin SDK
      console.log('User creation not implemented in production mode');
      return { error: 'User creation not implemented for production yet' };
    }
  } catch (error) {
    console.error('Create user error:', error);
    return { error };
  }
};
