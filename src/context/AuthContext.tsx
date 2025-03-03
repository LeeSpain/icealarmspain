
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string) => Promise<void>;
  updateUserRole: (userId: string, role: 'member' | 'callcenter' | 'admin') => Promise<void>;
  updateUserStatus: (userId: string, isActive: boolean) => Promise<void>;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'member' | 'callcenter' | 'admin';
  language?: 'en' | 'es';
  profileCompleted?: boolean;
  status?: 'active' | 'inactive';
  permissions?: string[];
  lastLogin?: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // Initialize auth state listener
  useEffect(() => {
    console.log("AuthContext initializing and checking authentication state");
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(true);
      console.log("Auth state changed:", { authUser });
      
      if (authUser) {
        // Determine role based on email
        const mockRole = 
          (authUser.email?.includes('admin') || authUser.email === 'admin@icealarm.es') 
            ? 'admin' 
            : (authUser.email?.includes('agent') || authUser.email === 'agent@icealarm.es' || authUser.email?.includes('callcenter')) 
              ? 'callcenter' 
              : 'member';
            
        const mockLanguage = authUser.email?.includes('@es.com') ? 'es' : 'en';
        const mockProfileCompleted = authUser.email?.includes('completed') ? true : false;
        const currentDate = new Date().toISOString();

        const userData = {
          id: authUser.uid,
          name: authUser.displayName,
          email: authUser.email || '',
          role: mockRole as 'member' | 'callcenter' | 'admin',
          language: mockLanguage as 'en' | 'es',
          profileCompleted: mockProfileCompleted,
          status: 'active' as 'active' | 'inactive',
          lastLogin: currentDate,
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
      setAuthInitialized(true);
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
      
      // Provide user-friendly error message
      const errorMessage = 
        error.message.includes("user-not-found") || 
        error.message.includes("wrong-password") || 
        error.message.includes("invalid-credential")
          ? "Invalid email or password"
          : error.message;
          
      throw new Error(errorMessage);
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
      const currentDate = new Date().toISOString();
      setUser({
        id: userCredential.user.uid,
        name: name,
        email: email,
        role: 'member', // Default role for new users
        language: 'en', // Default language
        profileCompleted: false,
        status: 'active',
        lastLogin: currentDate,
      });
      
      setIsAuthenticated(true);
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
      setIsAuthenticated(false);
      
      // Provide user-friendly error message
      let errorMessage = "Failed to create account";
      if (error.message.includes("email-already-in-use")) {
        errorMessage = "Email is already in use";
      } else if (error.message.includes("invalid-email")) {
        errorMessage = "Invalid email format";
      } else if (error.message.includes("weak-password")) {
        errorMessage = "Password is too weak";
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      console.log("Logging out user:", user?.email);
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      toast.info("You have been logged out");
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      toast.error("Logout failed: " + error.message);
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
        toast.success("Profile updated successfully");
      } catch (error: any) {
        console.error("Update Profile Error:", error.message);
        toast.error("Failed to update profile: " + error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateUserRole = async (userId: string, role: 'member' | 'callcenter' | 'admin') => {
    console.log(`Updating user ${userId} role to ${role}`);
    if (user && user.id === userId) {
      setUser({
        ...user,
        role
      });
      toast.success(`User role updated to ${role}`);
    }
  };

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    console.log(`Updating user ${userId} status to ${isActive ? 'active' : 'inactive'}`);
    if (user && user.id === userId) {
      setUser({
        ...user,
        status: isActive ? 'active' : 'inactive'
      });
      toast.success(`User status updated to ${isActive ? 'active' : 'inactive'}`);
    }
  };

  // Create context value
  const value: AuthContextProps = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    logout,
    updateUser,
    updateUserRole,
    updateUserStatus,
  };

  console.log("AuthContext state changed:", { 
    isAuthenticated, 
    hasUser: !!user, 
    isLoading, 
    initialized: authInitialized 
  });

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
