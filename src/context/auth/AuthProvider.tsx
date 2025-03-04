
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, firebaseAuth } from '../../firebase';
import { User, AuthContextType } from './types';
import { determineUserRole } from './utils';

// Create the AuthContext with default values
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

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      return user;
    } catch (error) {
      console.error('Login error:', error);
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
      // Clear remembered auth persistence
      localStorage.removeItem('authPersistence');
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
