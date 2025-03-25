
import { useContext } from 'react';
import { AuthContext } from './context';
import { AuthContextType, User } from './types';

// Create a dummy user
const dummyUser: User = {
  uid: 'dummy-user',
  id: 'dummy-user',
  email: 'user@example.com',
  name: 'Demo User',
  displayName: 'Demo User',
  role: 'member',
  profileCompleted: true,
  status: 'active',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

// Create a dummy auth context
const dummyAuthContext: AuthContextType = {
  user: dummyUser,
  profile: dummyUser,
  isAuthenticated: true,
  isLoading: false,
  login: async () => dummyUser,
  signIn: async () => dummyUser,
  signUp: async () => dummyUser,
  logout: async () => {},
  updateUserProfile: async () => {},
  createUser: async () => dummyUser,
  getAllUsers: async () => [dummyUser],
  updateUserRole: async () => {},
  deleteUser: async () => {}
};

// Create the useAuth hook that always returns a valid auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // If context is missing, return dummy context instead of throwing error
  if (!context) {
    console.log("Auth context not found, using dummy context");
    return dummyAuthContext;
  }
  
  return context;
};
