
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, firebaseAuth } from '../firebase';

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
  login: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<User>;
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

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
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
  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting login for:', email);
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
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // SignIn function (alternative name for login, needed for compatibility)
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      await login(email, password);
      return true;
    } catch (error) {
      console.error('SignIn error:', error);
      return false;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting signup for:', email);
      const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password);
      if (!authUser) {
        throw new Error('Failed to get user after signup');
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
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out user:', user?.email);
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
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
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error) {
      console.error('Update profile error:', error);
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
