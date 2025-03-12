
// Authentication types

export interface User {
  uid: string;
  id: string;
  email: string;
  name: string;
  displayName: string;
  role: string;
  profileCompleted: boolean;
  status?: string;
  photoURL?: string;
  language?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signUp: (email: string, password: string, userData?: any) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  // Admin functions
  createUser: (email: string, password: string, userData: any) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

// Props for the useLoadingState hook
export interface UseLoadingStateProps {
  externalLoading?: boolean;
  externalError?: string | null;
}
