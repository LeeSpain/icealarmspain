
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types and roles
export type UserRole = 'admin' | 'member' | 'callcenter' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check local storage for user on initial load
  useEffect(() => {
    console.log("AuthProvider - Checking local storage for user");
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Restored user from localStorage:", parsedUser);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('user');
      }
    } else {
      console.log("No user found in localStorage");
    }
    setIsLoading(false);
  }, []);

  // Mock users - in a real app, this would be authenticated against a backend
  const mockUsers = [
    { id: '1', email: 'admin@icealarm.es', password: 'admin123', name: 'Admin User', role: 'admin' as UserRole },
    { id: '2', email: 'member@icealarm.es', password: 'member123', name: 'Maria Garcia', role: 'member' as UserRole },
    { id: '3', email: 'agent@icealarm.es', password: 'agent123', name: 'Carlos Rodriguez', role: 'callcenter' as UserRole }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    console.log("Login attempt with email:", email);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      console.log("User authenticated:", userWithoutPassword);
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    console.log("Authentication failed for email:", email);
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    console.log("Logging out user:", user?.email);
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  
  // For debugging
  useEffect(() => {
    console.log("AuthContext state changed:", { isAuthenticated, user, isLoading });
  }, [isAuthenticated, user, isLoading]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
