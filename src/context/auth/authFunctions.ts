
import { User } from './types';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as firebaseUpdateProfile
} from '@/services/firebase/auth';
import { isMockAuthEnabled } from '@/utils/environment';

/**
 * Sign in with email and password
 */
export const login = async (
  email: string, 
  password: string, 
  rememberMe = true
): Promise<{ user?: User; error?: any }> => {
  try {
    // Use mock auth in development
    if (isMockAuthEnabled()) {
      console.log(`Mock login with ${email}`);
      
      // Simulate successful login
      const mockUser: User = {
        uid: 'mock-uid-123',
        id: 'mock-uid-123',
        email: email,
        name: email.split('@')[0],
        displayName: email.split('@')[0],
        role: 'user',
        status: 'active',
        profileCompleted: true,
        language: 'en'
      };
      
      // Save to localStorage for mock persistence
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('userRole', 'user');
      
      return { user: mockUser };
    }
    
    // Real Firebase auth
    const userCredential = await signInWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;
    
    // Map to our User type
    const user: User = {
      uid: firebaseUser.uid,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      displayName: firebaseUser.displayName || '',
      role: 'user', // Default role, would be overridden by profile data
      status: 'active',
      profileCompleted: !!firebaseUser.displayName,
      language: 'en'
    };
    
    return { user };
  } catch (error) {
    console.error('Login error:', error);
    return { error };
  }
};

// Alias for login
export const signIn = login;

/**
 * Sign up with email and password
 */
export const signUp = async (
  email: string, 
  password: string, 
  userData?: any
): Promise<{ user?: User; error?: any }> => {
  try {
    // Use mock auth in development
    if (isMockAuthEnabled()) {
      console.log(`Mock signup with ${email}`);
      
      // Simulate successful signup
      const mockUser: User = {
        uid: 'mock-uid-' + Date.now(),
        id: 'mock-uid-' + Date.now(),
        email: email,
        name: userData?.displayName || email.split('@')[0],
        displayName: userData?.displayName || email.split('@')[0],
        role: 'user',
        status: 'active',
        profileCompleted: !!userData?.displayName,
        language: 'en'
      };
      
      // Save to localStorage for mock persistence
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('userRole', 'user');
      
      return { user: mockUser };
    }
    
    // Real Firebase auth
    const userCredential = await createUserWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;
    
    // Update profile if name provided
    if (userData?.displayName) {
      await firebaseUpdateProfile(firebaseUser, {
        displayName: userData.displayName
      });
    }
    
    // Map to our User type
    const user: User = {
      uid: firebaseUser.uid,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: userData?.displayName || '',
      displayName: userData?.displayName || '',
      role: 'user',
      status: 'active',
      profileCompleted: !!userData?.displayName,
      language: 'en'
    };
    
    return { user };
  } catch (error) {
    console.error('Signup error:', error);
    return { error };
  }
};

// Alias for createUser
export const createUser = signUp;

/**
 * Sign out the current user
 */
export const logout = async (): Promise<void> => {
  // Use mock auth in development
  if (isMockAuthEnabled()) {
    console.log('Mock logout');
    localStorage.removeItem('currentUser');
    return;
  }
  
  // Real Firebase auth
  return signOut();
};

/**
 * Update user profile
 */
export const updateUserProfile = async (displayName: string): Promise<void> => {
  // Mock update in development
  if (isMockAuthEnabled()) {
    console.log(`Mock update profile: ${displayName}`);
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.displayName = displayName;
      user.name = displayName;
      user.profileCompleted = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    return;
  }
  
  // Real Firebase implementation would go here
  console.log(`Update profile: ${displayName}`);
};

/**
 * Get all users (admin function)
 */
export const getAllUsers = async (): Promise<User[]> => {
  // Mock implementation
  if (isMockAuthEnabled()) {
    return [
      {
        uid: 'mock-uid-1',
        id: 'mock-uid-1',
        email: 'user1@example.com',
        name: 'User One',
        displayName: 'User One',
        role: 'user',
        status: 'active',
        profileCompleted: true,
        language: 'en'
      },
      {
        uid: 'mock-uid-2',
        id: 'mock-uid-2',
        email: 'admin@example.com',
        name: 'Admin User',
        displayName: 'Admin User',
        role: 'admin',
        status: 'active',
        profileCompleted: true,
        language: 'en'
      }
    ];
  }
  
  // Real implementation would go here
  return [];
};

/**
 * Update user role (admin function)
 */
export const updateUserRole = async (userId: string, role: string): Promise<{ success: boolean; error?: string }> => {
  // Mock implementation
  if (isMockAuthEnabled()) {
    console.log(`Mock update role for ${userId}: ${role}`);
    return { success: true };
  }
  
  // Real implementation would go here
  return { success: true };
};

/**
 * Delete user (admin function)
 */
export const deleteUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
  // Mock implementation
  if (isMockAuthEnabled()) {
    console.log(`Mock delete user: ${userId}`);
    return { success: true };
  }
  
  // Real implementation would go here
  return { success: true };
};
