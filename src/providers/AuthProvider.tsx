
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firebaseAuth } from '../firebase';
import { toast } from 'react-toastify';

// Define the User type
export interface User {
  uid: string;
  id?: string;
  email: string | null;
  name?: string | null;
  displayName?: string | null;
  role?: string;
  profileCompleted?: boolean;
  language?: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    throw new Error('login not implemented');
    return {} as User;
  },
  signIn: async () => {
    throw new Error('signIn not implemented');
    return false;
  },
  signUp: async () => {
    throw new Error('signUp not implemented');
    return {} as User;
  },
  logout: async () => {
    throw new Error('logout not implemented');
  },
  updateUserProfile: async () => {
    throw new Error('updateUserProfile not implemented');
  },
});

// Helper function to determine user role based on email
const determineUserRole = (email: string): string => {
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('agent')) {
    return 'callcenter';
  } else {
    return 'member';
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Check if persistence is enabled
    const persistenceType = localStorage.getItem('authPersistence') || 'session';
    
    // Set the persistence based on the stored value
    if (persistenceType === 'local') {
      auth.setPersistence(firebaseAuth.browserLocalPersistence)
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    } else {
      auth.setPersistence(firebaseAuth.browserSessionPersistence)
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    }
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        const user: User = {
          uid: authUser.uid,
          id: authUser.uid, // Add id property that matches uid
          email: authUser.email,
          name: authUser.displayName,
          displayName: authUser.displayName,
          role: determineUserRole(authUser.email || ''), // Add role based on email
          profileCompleted: false, // Default value
          language: 'en', // Default language
        };
        setUser(user);
        console.log('User authenticated:', user.email, 'Role:', user.role);
      } else {
        // User is signed out
        setUser(null);
        console.log('User signed out');
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
    try {
      console.log('Attempting login for:', email, 'Remember me:', rememberMe);
      
      // Set persistence type based on remember me option
      if (rememberMe) {
        await auth.setPersistence(firebaseAuth.browserLocalPersistence);
        localStorage.setItem('authPersistence', 'local');
      } else {
        await auth.setPersistence(firebaseAuth.browserSessionPersistence);
        localStorage.setItem('authPersistence', 'session');
      }
      
      const { user: authUser } = await auth.signInWithEmailAndPassword(email, password);
      if (!authUser) {
        throw new Error('Failed to get user after login');
      }
      
      const user: User = {
        uid: authUser.uid,
        id: authUser.uid,
        email: authUser.email,
        name: authUser.displayName,
        displayName: authUser.displayName,
        role: determineUserRole(email),
        profileCompleted: false,
        language: 'en',
      };
      
      toast.success('Login successful!');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  // SignIn function (alternative name for login, needed for compatibility)
  const signIn = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      await login(email, password, rememberMe);
      return true;
    } catch (error) {
      console.error('SignIn error:', error);
      return false;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
    try {
      console.log('Attempting signup for:', email);
      const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password);
      if (!authUser) {
        throw new Error('Failed to get user after signup');
      }
      
      // Update profile with display name if provided
      if (displayName && authUser) {
        await auth.updateProfile(authUser, { displayName });
      }
      
      const user: User = {
        uid: authUser.uid,
        id: authUser.uid,
        email: authUser.email,
        name: displayName || authUser.displayName,
        displayName: displayName || authUser.displayName,
        role: determineUserRole(email),
        profileCompleted: false,
        language: 'en',
      };
      
      toast.success('Account created successfully!');
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out user:', user?.email);
      await auth.signOut();
      // Clear remembered auth persistence
      localStorage.removeItem('authPersistence');
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  // Update user profile function
  const updateUserProfile = async (displayName: string): Promise<void> => {
    try {
      if (auth.currentUser) {
        await auth.updateProfile(auth.currentUser, { displayName });
        setUser(prev => prev ? { ...prev, name: displayName, displayName } : null);
        console.log('User profile updated:', displayName);
        toast.success('Profile updated successfully');
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(`Profile update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  };

  // Create the context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signIn,
    signUp,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);
