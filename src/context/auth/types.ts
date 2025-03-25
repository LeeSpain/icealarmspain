
// User type
export interface User {
  uid: string;
  id: string;
  email: string;
  name: string;
  displayName: string;
  role?: string;
  status: 'active' | 'pending' | 'suspended';
  profileCompleted?: boolean;
  photoURL?: string;
  lastLogin?: string;
  createdAt?: string;
}

// User profile type
export interface UserProfile {
  display_name?: string;
  role?: string;
  [key: string]: any;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ user?: User; error?: any }>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ user?: User; error?: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ user?: User; error?: any }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  updateProfile: (data: any) => Promise<{ success: boolean; error?: string }>;
  createUser: (email: string, password: string, userData?: any) => Promise<{ user?: User; error?: any }>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
}

// Add a type for loading state hooks if needed
export interface UseLoadingStateProps {
  initialState?: boolean;
  delay?: number;
}
