
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
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        // Here, we're using a mock role and language.
        // In a real application, you'd fetch this data from your database.
        const mockRole = authUser.email?.endsWith('@admin.com') ? 'admin' :
                         authUser.email?.endsWith('@callcenter.com') ? 'callcenter' : 'member';
        const mockLanguage = authUser.email?.endsWith('@es.com') ? 'es' : 'en';
        const mockProfileCompleted = authUser.email?.startsWith('completed') ? true : false;

        setUser({
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email || '',
          role: mockRole as 'member' | 'callcenter' | 'admin',
          language: mockLanguage as 'en' | 'es',
          profileCompleted: mockProfileCompleted,
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
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

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
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
