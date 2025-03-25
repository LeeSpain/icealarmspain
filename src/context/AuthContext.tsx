
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user interface
interface User {
  id: string;
  email: string;
  role: string;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: string | string[]) => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth initialization
    const initAuth = async () => {
      try {
        // In a real app, we would check if user is logged in
        setIsLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login implementation
    setUser({
      id: '123',
      email,
      role: 'member'
    });
  };

  const logout = async () => {
    // Mock logout implementation
    setUser(null);
  };

  const signup = async (email: string, password: string, userData: any) => {
    // Mock signup implementation
    setUser({
      id: '123',
      email,
      role: 'member',
      ...userData
    });
  };

  // Check if user has specified role(s)
  const hasRole = (roleOrRoles: string | string[]) => {
    if (!user) return false;
    
    const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
