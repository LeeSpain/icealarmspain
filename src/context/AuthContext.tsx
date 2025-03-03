
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  name?: string | null;
  displayName?: string | null;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
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

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        const user: User = {
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.displayName,
          displayName: authUser.displayName,
        };
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const { user: authUser } = await auth.signInWithEmailAndPassword(email, password);
      if (!authUser) {
        throw new Error('Failed to get user after login');
      }
      const user: User = {
        uid: authUser.uid,
        email: authUser.email,
        name: authUser.displayName,
        displayName: authUser.displayName,
      };
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string): Promise<User> => {
    try {
      const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password);
      if (!authUser) {
        throw new Error('Failed to get user after signup');
      }
      const user: User = {
        uid: authUser.uid,
        email: authUser.email,
        name: authUser.displayName,
        displayName: authUser.displayName,
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
