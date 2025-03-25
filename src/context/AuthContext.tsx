
import React, { ReactNode, useEffect, useState, useContext } from 'react';
import { User, AuthContextType } from './auth/types';
import { AuthContext } from './auth/context';
import { useAuthEffects } from './auth/useAuthEffects';
import { showErrorToast } from '@/utils/error-handler';
import { isMockAuthEnabled } from '@/utils/environment';

// Export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set up auth state listener
  useEffect(() => {
    if (isMockAuthEnabled()) {
      // Mock auth for development
      const timer = setTimeout(() => {
        const mockUserJSON = localStorage.getItem('mockUser');
        if (mockUserJSON) {
          try {
            const mockUser = JSON.parse(mockUserJSON);
            setUser({
              uid: mockUser.id || mockUser.uid || '12345',
              id: mockUser.id || mockUser.uid || '12345',
              email: mockUser.email || 'mock@example.com',
              name: mockUser.name || mockUser.displayName || 'Mock User',
              displayName: mockUser.displayName || mockUser.name || 'Mock User',
              role: mockUser.role || 'member',
              status: 'active',
              profileCompleted: true,
              language: 'en'
            });
          } catch (err) {
            console.error('Error parsing mock user:', err);
          }
        }
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      // Real Firebase auth state change listener
      useAuthEffects({ setUser, setIsLoading });
    }
  }, []);

  // Log auth state for debugging
  useEffect(() => {
    console.log('Auth state:', { user, isLoading, error });
  }, [user, isLoading, error]);

  // Handle auth errors
  useEffect(() => {
    if (error) {
      showErrorToast(error, 'Authentication');
    }
  }, [error]);

  /**
   * Check if the user has a specific role or any of the provided roles
   */
  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.some(r => user.role === r);
    }
    
    return user.role === role;
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<{ user?: User; error?: any }> => {
    console.log('Signing in:', email, 'Remember me:', rememberMe);
    
    try {
      if (isMockAuthEnabled()) {
        console.log('Using mock auth for sign in');
        
        // Simple mock authentication
        if (email === 'admin@example.com' && password === 'password') {
          const mockUser: User = {
            id: '12345',
            uid: '12345',
            email: 'admin@example.com',
            name: 'Admin User',
            displayName: 'Admin User',
            role: 'admin',
            profileCompleted: true,
            status: 'active',
            language: 'en'
          };
          
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          return { user: mockUser };
        } else if (email && password) {
          const mockUser: User = {
            id: '67890',
            uid: '67890',
            email,
            name: 'Test User',
            displayName: 'Test User',
            role: 'member',
            profileCompleted: true,
            status: 'active',
            language: 'en'
          };
          
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          return { user: mockUser };
        }
        
        return { error: 'Invalid credentials' };
      }
      
      // Real authentication would happen here
      // This would typically involve Firebase Auth
      // For now we'll just return an error
      return { error: 'Authentication not implemented for production yet' };
      
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };
  
  /**
   * Legacy login method (for backward compatibility)
   */
  const login = signIn;

  /**
   * Sign up a new user
   */
  const signUp = async (
    email: string,
    password: string,
    userData: any = {}
  ): Promise<{ user?: User; error?: any }> => {
    console.log('Signing up:', email, userData);
    
    try {
      if (isMockAuthEnabled()) {
        console.log('Using mock auth for sign up');
        
        // Create a mock user
        const mockUser: User = {
          id: `mock-${Date.now()}`,
          uid: `mock-${Date.now()}`,
          email,
          name: userData.name || email.split('@')[0],
          displayName: userData.name || email.split('@')[0],
          role: 'member',
          profileCompleted: false,
          status: 'active',
          language: 'en'
        };
        
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return { user: mockUser };
      }
      
      // Real sign up would happen here
      // For now we'll just return an error
      return { error: 'Sign up not implemented for production yet' };
      
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async (): Promise<void> => {
    console.log('Signing out');
    
    try {
      if (isMockAuthEnabled()) {
        localStorage.removeItem('mockUser');
        return;
      }
      
      // Real sign out would happen here
      
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };
  
  /**
   * Legacy logout method (for backward compatibility)
   */
  const logout = signOut;

  /**
   * Update the user's profile
   */
  const updateProfile = async (profileData: { [key: string]: any }): Promise<{ success: boolean; error?: string }> => {
    console.log('Updating profile:', profileData);
    
    try {
      if (isMockAuthEnabled()) {
        if (!user) throw new Error('No user logged in');
        
        const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{}');
        const updatedUser = { ...mockUser, ...profileData };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        
        // Update the profile state
        setProfile((prev: any) => ({ ...prev, ...profileData }));
        return { success: true };
      }
      
      // Real profile update would happen here
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  /**
   * Update the user's profile display name
   * (legacy method for backward compatibility)
   */
  const updateUserProfile = async (displayName: string): Promise<void> => {
    await updateProfile({ displayName });
  };

  /**
   * Create a new user (admin function)
   */
  const createUser = async (
    email: string,
    password: string,
    userData: any
  ): Promise<{ user?: User; error?: any }> => {
    console.log('Admin creating user:', email, userData);
    
    try {
      if (isMockAuthEnabled()) {
        // Create a mock user
        const mockUser: User = {
          id: `mock-${Date.now()}`,
          uid: `mock-${Date.now()}`,
          email,
          name: userData.name || email.split('@')[0],
          displayName: userData.name || email.split('@')[0],
          role: userData.role || 'member',
          profileCompleted: false,
          status: 'active',
          language: 'en'
        };
        
        return { user: mockUser };
      }
      
      // Real user creation would happen here
      return { error: 'User creation not implemented for production yet' };
      
    } catch (error) {
      console.error('Create user error:', error);
      return { error };
    }
  };

  /**
   * Get all users (admin function)
   */
  const getAllUsers = async (): Promise<User[]> => {
    console.log('Admin getting all users');
    
    try {
      if (isMockAuthEnabled()) {
        // Return mock users
        return [
          {
            uid: '12345',
            id: '12345',
            email: 'admin@example.com',
            name: 'Admin User',
            displayName: 'Admin User',
            role: 'admin',
            profileCompleted: true,
            status: 'active',
            language: 'en'
          },
          {
            uid: '67890',
            id: '67890',
            email: 'member@example.com',
            name: 'Test User',
            displayName: 'Test User',
            role: 'member',
            profileCompleted: true,
            status: 'active',
            language: 'en'
          },
        ];
      }
      
      // Real user fetching would happen here
      return [];
      
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  };

  /**
   * Update a user's role (admin function)
   */
  const updateUserRole = async (userId: string, role: string): Promise<{ success: boolean; error?: string }> => {
    console.log('Admin updating user role:', userId, role);
    
    try {
      if (isMockAuthEnabled()) {
        console.log('Mock user role updated:', userId, role);
        return { success: true };
      }
      
      // Real role update would happen here
      return { success: true };
      
    } catch (error) {
      console.error('Update user role error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  /**
   * Delete a user (admin function)
   */
  const deleteUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    console.log('Admin deleting user:', userId);
    
    try {
      if (isMockAuthEnabled()) {
        console.log('Mock user deleted:', userId);
        return { success: true };
      }
      
      // Real user deletion would happen here
      return { success: true };
      
    } catch (error) {
      console.error('Delete user error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  // Construct the auth context value
  const contextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    signIn,
    signUp,
    logout,
    signOut,
    updateUserProfile,
    updateProfile,
    createUser,
    getAllUsers,
    updateUserRole,
    deleteUser,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
