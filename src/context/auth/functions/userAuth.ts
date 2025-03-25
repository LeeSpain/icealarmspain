import { User } from '../types';
import { determineUserRole } from '../utils';
import { auth, signInWithEmailAndPassword, signOut } from '@/services/firebase/auth';
import { isMockAuthEnabled, isDevelopment } from '@/utils/environment';

// Login function (authenticate a user)
export const login = async (email: string, password: string, rememberMe: boolean = false): Promise<User> => {
  console.log('Login attempt:', { email, rememberMe });
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // In mock auth mode for development, use the mock implementation
  if (isMockAuthEnabled()) {
    console.log('Using mock auth implementation');
    
    // Determine role using exact email matching
    const role = determineUserRole(email);
    console.log('Determined role:', role);
    
    const devUserId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
    
    // Create a user object
    const user: User = {
      uid: devUserId,
      id: devUserId,
      email: email,
      name: email.split('@')[0],
      displayName: email.split('@')[0],
      role,
      status: 'active',
      profileCompleted: false,
      language: localStorage.getItem('language') || 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    console.log('Created user with role:', user.role);
    
    // Clear any previous session data before setting new
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    
    // Store the user in localStorage - make sure to do this BEFORE any redirects
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    localStorage.setItem('forceDevMode', 'true');
    
    // This is important - delay slightly to ensure storage is complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    return user;
  } 
  // In production, use the real Firebase auth
  else {
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      if (!firebaseUser) {
        throw new Error('Authentication failed');
      }
      
      // Determine role from email
      const role = determineUserRole(firebaseUser.email || '');
      
      // Create user object
      const user: User = {
        uid: firebaseUser.uid,
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
        role,
        status: 'active',
        profileCompleted: !!firebaseUser.displayName,
        language: localStorage.getItem('language') || 'en',
        lastLogin: new Date().toISOString(),
        createdAt: firebaseUser.metadata.creationTime || '',
      };
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      return user;
    } catch (error) {
      console.error('Firebase authentication error:', error);
      throw error;
    }
  }
};

// Alias for login for compatibility
export const signIn = login;

// Logout function (sign out a user)
export const logout = async (): Promise<void> => {
  console.log('Logging out - clearing all auth data');
  
  // Clear all auth-related data from localStorage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userRole');
  localStorage.removeItem('activeSection');
  localStorage.removeItem('forceDevMode');
  
  // Keep rememberedEmail if it exists (for convenience)
  
  // Flag to prevent automatic login after logout
  sessionStorage.setItem('recentlyLoggedOut', 'true');
  
  // In production or when not using mock auth, sign out from Firebase
  if (!isMockAuthEnabled()) {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out from Firebase:', error);
      // Still proceed with logout even if Firebase sign out fails
    }
  }
  
  // Wait for storage changes to take effect
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (isDevelopment()) {
    console.log('Logout complete - all storage cleared');
  }
};
