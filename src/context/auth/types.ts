
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

export interface Profile {
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

export interface AuthContextType {
  user: User | null;
  profile?: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ user?: User; error?: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ user?: User; error?: any }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  updateProfile: (profileData: { [key: string]: any }) => Promise<void>;
  // Admin functions
  createUser: (email: string, password: string, userData: any) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
}

// Props for the useLoadingState hook
export interface UseLoadingStateProps {
  externalLoading?: boolean;
  externalError?: string | null;
}
