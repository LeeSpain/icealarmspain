
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string) => Promise<void>;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'member' | 'callcenter' | 'admin';
  language?: 'en' | 'es';
  profileCompleted?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AuthContext initializing and checking authentication state");
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(true);
      console.log("Auth state changed:", { authUser });
      
      if (authUser) {
        // Here, we're using a mock role and language.
        // In a real application, you'd fetch this data from your database.
        const mockRole = authUser.email?.endsWith('@admin.com') || authUser.email === 'admin@icealarm.es' 
          ? 'admin' 
          : (authUser.email?.endsWith('@callcenter.com') || authUser.email === 'agent@icealarm.es' 
            ? 'callcenter' 
            : 'member');
            
        const mockLanguage = authUser.email?.endsWith('@es.com') ? 'es' : 'en';
        const mockProfileCompleted = authUser.email?.startsWith('completed') ? true : false;

        const userData = {
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email || '',
          role: mockRole as 'member' | 'callcenter' | 'admin',
          language: mockLanguage as 'en' | 'es',
          profileCompleted: mockProfileCompleted,
        };
        
        console.log("Setting authenticated user:", userData);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.log("No authenticated user found");
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    console.log("SignIn attempt with email:", email);
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("SignIn successful");
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error("Sign In Error:", error.message);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await auth.updateProfile(userCredential.user, { displayName: name });

      // After successful signup, update the user state
      setUser({
        id: userCredential.user.uid,
        name: name,
        email: email,
        role: 'member', // Default role for new users
        language: 'en', // Default language
        profileCompleted: false,
      });
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log("Logging out...");
      console.log("Logging out user:", user?.email);
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (name: string) => {
    if (auth.currentUser) {
      setIsLoading(true);
      try {
        await auth.updateProfile(auth.currentUser, {
          displayName: name,
        });
        // Update the user state with the new name
        setUser((prevUser) => prevUser ? { ...prevUser, name: name } : null);
      } catch (error: any) {
        console.error("Update Profile Error:", error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const value: AuthContextProps = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    logout,
    updateUser,
  };

  console.log("AuthContext state changed:", { isAuthenticated, user, isLoading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
