
import { determineUserRole } from '../utils';
import { User } from '../types';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence,
  firebaseAuth
} from '../../../services/firebase/auth';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Starting login process for:', email);
    
    // Clear any existing session data
    console.log('Clearing existing session data...');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authPersistence');
    
    // Set persistence based on rememberMe flag
    console.log('Setting Firebase persistence:', rememberMe ? 'local' : 'session');
    await setPersistence(rememberMe ? 'local' : 'session');
    
    console.log('Attempting signIn with Firebase for:', email);
    const userCredential = await signInWithEmailAndPassword(email, password);
    
    if (!userCredential.user) {
      console.error('No user data returned from Firebase');
      throw new Error('Login failed - no user created');
    }
    
    console.log('Login successful for user:', userCredential.user.email);
    
    // Determine role from email directly
    const role = determineUserRole(userCredential.user.email || email);
    console.log('Determined role for user:', role);
    
    // Create user object
    const user: User = {
      uid: userCredential.user.uid,
      id: userCredential.user.uid,
      email: userCredential.user.email || email,
      name: userCredential.user.displayName || email.split('@')[0],
      displayName: userCredential.user.displayName || email.split('@')[0],
      role,
      profileCompleted: !!userCredential.user.displayName,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: userCredential.user.metadata.creationTime
    };
    
    console.log('User object created:', user);
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authPersistence', rememberMe ? 'local' : 'session');
    
    return user;
  } catch (error) {
    console.error('Login process error:', error);
    throw error;
  }
};

// SignIn function (alternative name for login, needed for compatibility)
export const signIn = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
  try {
    await login(email, password, rememberMe);
    return true;
  } catch (error) {
    console.error('SignIn error:', error);
    return false;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    
    // Clean up local state first
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
    
    // Sign out from Firebase
    await signOut();
  } catch (error) {
    console.error('Logout error:', error);
    // Clean up local state regardless of server errors
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
  }
};
