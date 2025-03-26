
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  uid: string;
  email: string;
  displayName: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create a context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Export the hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simple mock user for demo purposes
const DEMO_USER = {
  uid: 'demo-user',
  email: 'demo@icealarm.es',
  displayName: 'Demo User',
  role: 'member'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  // Simple login function
  const login = async (email: string, password: string) => {
    // For demo, always succeed with the demo user
    setUser(DEMO_USER);
    localStorage.setItem('currentUser', JSON.stringify(DEMO_USER));
  };
  
  // Simple logout function
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
