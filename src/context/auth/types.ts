
// User type definition
export interface User {
  uid: string;
  id: string;
  email: string;
  name: string;
  displayName: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  profileCompleted: boolean;
  language: string;
  photoURL?: string;
  lastLogin?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  providerData?: any[];
  refreshToken?: string;
}

// User profile type
export interface UserProfile {
  display_name: string | null;
  role: string | null;
}

// Auth context type definition
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
  updateProfile: (data: any) => Promise<{ success: boolean }>;
  // Admin functions
  createUser: (email: string, password: string, userData?: any) => Promise<{ user?: User; error?: any }>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, role: string) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  hasRole: (roles: string | string[]) => boolean;
}
