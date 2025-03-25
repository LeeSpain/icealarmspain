
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user interface
interface User {
  id: string;
  email: string;
  role: string;
  displayName?: string;
  name?: string;
  language?: string;
}

// Define profile interface
interface Profile {
  id?: string;
  user_id?: string;
  display_name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  language?: string;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ user?: User; error?: any }>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<{ user?: User; error?: any }>;
  updateProfile: (profileData: { [key: string]: any }) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: string | string[]) => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signOut: async () => {},
  signIn: async () => ({ user: undefined, error: undefined }),
  signup: async () => {},
  signUp: async () => ({ user: undefined, error: undefined }),
  updateProfile: async () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
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
    const mockUser = {
      id: '123',
      email,
      role: 'member'
    };
    
    setUser(mockUser);
    setProfile({
      user_id: '123',
      display_name: email.split('@')[0],
      email,
      role: 'member',
      language: 'en'
    });
    
    return { user: mockUser, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Same as login but returns the object directly
    const mockUser = {
      id: '123',
      email,
      role: 'member',
      displayName: email.split('@')[0],
      name: email.split('@')[0]
    };
    
    setUser(mockUser);
    setProfile({
      user_id: '123',
      display_name: email.split('@')[0],
      email,
      role: 'member',
      language: 'en'
    });
    
    return { user: mockUser, error: null };
  };

  const logout = async () => {
    // Mock logout implementation
    setUser(null);
    setProfile(null);
  };

  const signOut = async () => {
    // Alias for logout
    return logout();
  };

  const signup = async (email: string, password: string, userData: any) => {
    // Mock signup implementation
    const mockUser = {
      id: '123',
      email,
      role: 'member',
      ...userData
    };
    
    setUser(mockUser);
    setProfile({
      user_id: '123',
      display_name: userData?.display_name || email.split('@')[0],
      email,
      role: 'member',
      language: 'en'
    });
    
    return { user: mockUser, error: null };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    // Same as signup but returns the object directly
    const mockUser = {
      id: '123',
      email,
      role: 'member',
      displayName: userData?.display_name || email.split('@')[0],
      name: userData?.display_name || email.split('@')[0],
      ...userData
    };
    
    setUser(mockUser);
    setProfile({
      user_id: '123',
      display_name: userData?.display_name || email.split('@')[0],
      email,
      role: 'member',
      language: 'en'
    });
    
    return { user: mockUser, error: null };
  };

  const updateProfile = async (profileData: { [key: string]: any }) => {
    // Mock update profile implementation
    if (profile) {
      const updatedProfile = { ...profile, ...profileData };
      setProfile(updatedProfile);
      
      // Also update user if we're updating the display name
      if (profileData.display_name && user) {
        setUser({
          ...user,
          displayName: profileData.display_name,
          name: profileData.display_name
        });
      }
      
      // Update language preference if provided
      if (profileData.language && user) {
        setUser({
          ...user,
          language: profileData.language
        });
      }
    }
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
        profile,
        isLoading,
        login,
        logout,
        signOut,
        signIn,
        signup,
        signUp,
        updateProfile,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
