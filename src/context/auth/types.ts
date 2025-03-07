
// Define the User type
export interface User {
  uid: string;
  id?: string;
  email: string | null;
  name?: string | null;
  displayName?: string | null;
  role?: string;
  profileCompleted?: boolean;
  language?: string;
  lastLogin?: string;
  createdAt?: string;
  photoURL?: string | null;
  status?: 'active' | 'inactive' | 'pending';
}

// Define the AuthContext type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signUp: (email: string, password: string, displayName?: string, role?: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  // Admin functions
  createUser: (email: string, password: string, displayName: string, role: string) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, newRole: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  // Additional admin functions
  updateUserStatus?: (userId: string, newStatus: 'active' | 'inactive' | 'pending') => Promise<void>;
  resetUserPassword?: (userId: string) => Promise<string>; // Returns temporary password
  getUserDetails?: (userId: string) => Promise<User>;
  searchUsers?: (query: string) => Promise<User[]>;
  assignDeviceToUser?: (userId: string, deviceId: string) => Promise<void>;
  revokeDeviceFromUser?: (userId: string, deviceId: string) => Promise<void>;
  getAdminStats?: () => Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
  }>;
}
