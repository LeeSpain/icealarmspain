
import { determineUserRole, isDevelopmentMode } from '../utils';
import { User } from '../types';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence,
  auth,
  browserLocalPersistence,
  browserSessionPersistence
} from '../../../services/firebase/auth';

// Clear all stored authentication data
const clearAuthData = () => {
  console.log('Clearing all auth data');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authPersistence');
};

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Starting login process for:', email);
    
    // First, ensure we clear any existing auth state to prevent conflicts
    clearAuthData();
    
    // Explicitly force development mode
    localStorage.setItem('forceDevMode', 'true');
    
    // Check for development mode
    const isDevMode = isDevelopmentMode();
    console.log('Development mode check result:', isDevMode);
    
    // Always use development login flow for now
    console.log('Development mode active, checking for test credentials');
    
    // Normalize the email for comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if using any of our test accounts with the correct password
    if ((normalizedEmail === 'admin@icealarm.es' || 
         normalizedEmail === 'callcenter@icealarm.es' || 
         normalizedEmail === 'user@example.com') && 
        password === 'password123') {
      
      console.log('Development login successful for:', normalizedEmail);
      
      // Create user object for development mode with a consistent ID
      const role = determineUserRole(normalizedEmail);
      const devUserId = `dev-${normalizedEmail.replace(/[^a-z0-9]/gi, '-')}`;
      
      const user: User = {
        uid: devUserId,
        id: devUserId,
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        displayName: normalizedEmail.split('@')[0],
        role,
        profileCompleted: true,
        language: localStorage.getItem('language') || 'en',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      console.log('Development user created with role:', role);
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authPersistence', rememberMe ? 'local' : 'session');
      
      // Force development mode to be remembered
      localStorage.setItem('forceDevMode', 'true');
      
      return user;
    } else {
      // In dev mode but wrong credentials
      console.error('Invalid development credentials');
      throw new Error('Invalid email or password. In development mode, use admin@icealarm.es/password123');
    }
  } catch (error: any) {
    console.error('Login process error:', error);
    let errorMessage = 'Unknown authentication error';
    
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password. Please try again.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled. Please contact support.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

// SignIn function (alternative name for login, needed for compatibility)
export const signIn = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
  try {
    await login(email, password, rememberMe);
    return true;
  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    
    // Clean up local state first
    clearAuthData();
    
    // Sign out from Firebase
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    // Clean up local state regardless of server errors
    clearAuthData();
    throw error;
  }
};
