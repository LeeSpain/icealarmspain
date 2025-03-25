
import { User } from '../types';
import { isMockAuthEnabled } from '@/utils/environment';

// Function to sign in a user
export const signIn = async (
  email: string,
  password: string, 
  rememberMe: boolean = false
): Promise<{ user?: User; error?: any }> => {
  console.log('Signing in:', email, 'Remember me:', rememberMe);
  
  try {
    if (isMockAuthEnabled()) {
      // Mock authentication for development
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '12345',
          uid: '12345',
          email: 'admin@example.com',
          name: 'Admin User',
          displayName: 'Admin User',
          role: 'admin',
          profileCompleted: true,
          status: 'active'
        };
        
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return { user: mockUser };
      } else if (email && password) {
        // Allow any email/password in dev mode
        const mockUser: User = {
          id: '67890',
          uid: '67890',
          email: email,
          name: 'Test User',
          displayName: 'Test User',
          role: 'member',
          profileCompleted: true,
          status: 'active'
        };
        
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return { user: mockUser };
      }
      
      return { error: 'Invalid credentials' };
    } else {
      // In a real app, this would be implemented with Firebase Auth
      console.log('Authentication not implemented in production mode');
      return { error: 'Authentication not implemented for production yet' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error };
  }
};

// Legacy function for backward compatibility
export const login = signIn;

// Function to sign out a user
export const logout = async (): Promise<void> => {
  console.log('Signing out');
  
  try {
    if (isMockAuthEnabled()) {
      localStorage.removeItem('mockUser');
      return;
    } else {
      // In a real app, this would be implemented with Firebase Auth
      console.log('Logout not implemented in production mode');
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Alias for logout
export const signOut = logout;
