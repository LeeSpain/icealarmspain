
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
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('authPersistence');
  localStorage.removeItem('userRole');
  sessionStorage.removeItem('shouldRedirect');
  sessionStorage.removeItem('redirectTo');
};

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Starting login process for:', email, 'Remember Me:', rememberMe);
    
    // First, ensure we clear any existing auth state to prevent conflicts
    clearAuthData();
    
    // Check for development mode
    const isDevMode = isDevelopmentMode();
    console.log('Development mode check result:', isDevMode);
    
    // Normalize the email for comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    // Test credentials check
    if ((normalizedEmail === 'admin@icealarm.es' || 
         normalizedEmail === 'callcenter@icealarm.es' || 
         normalizedEmail === 'user@example.com') && 
        password === 'password123') {
      
      console.log('Development login successful for:', normalizedEmail);
      
      // Create user object for development mode
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
      
      // Store user data based on rememberMe preference
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authPersistence', 'local');
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('authPersistence', 'session');
      }
      
      // Always store role in localStorage for auth checks
      localStorage.setItem('userRole', role);
      
      return user;
    } else if (isDevMode) {
      // In dev mode but with invalid credentials
      console.error('Invalid development credentials provided');
      throw new Error('Invalid email or password. Use admin@icealarm.es/password123 or user@example.com/password123');
    } else {
      // Non-dev mode login attempt (should not happen currently)
      throw new Error('Authentication system is in maintenance. Please use admin@icealarm.es/password123 or user@example.com/password123 for testing.');
    }
  } catch (error: any) {
    console.error('Login error:', error);
    clearAuthData(); // Clear any partial auth data on error
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
    
    // Clear additional items that might be causing issues
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Clear role information
    localStorage.removeItem('userRole');
    
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    // Clean up local state regardless of server errors
    clearAuthData();
    throw error;
  }
};
