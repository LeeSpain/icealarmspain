
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
}

// Define the AuthContext type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}
