
import { determineUserRole } from '../utils';
import { User } from '../types';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence,
  auth,
  browserLocalPersistence,
  browserSessionPersistence
} from '../../../services/firebase/auth';

// Login function
export const login = async (email: string, password: string, rememberMe = false): Promise<User> => {
  try {
    console.log('Starting login process for:', email);
    
    // For development/testing purposes, allow specific test accounts to bypass Firebase authentication
    // This is helpful for testing when Firebase might not be fully configured
    if ((process.env.NODE_ENV === 'development' || import.meta.env.DEV) && 
        (email === 'admin@icealarm.es' || email === 'callcenter@icealarm.es' || email === 'user@example.com') && 
        password === 'password123') {
      
      console.log('Using development login bypass for:', email);
      
      // Clear any existing session data first
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authPersistence');
      
      // Create user object for development mode
      const role = determineUserRole(email);
      const user: User = {
        uid: `dev-${Date.now()}`,
        id: `dev-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        displayName: email.split('@')[0],
        role,
        profileCompleted: true,
        language: 'en',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      console.log('Development login successful with role:', role);
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authPersistence', rememberMe ? 'local' : 'session');
      
      return user;
    }
    
    // Clear any existing session data
    console.log('Clearing existing session data...');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authPersistence');
    
    // Set persistence based on rememberMe flag
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    console.log('Setting Firebase persistence:', rememberMe ? 'local' : 'session');
    await setPersistence(auth, persistenceType);
    
    console.log('Attempting signIn with Firebase for:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
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
      createdAt: userCredential.user.metadata.creationTime || new Date().toISOString()
    };
    
    console.log('User object created:', user);
    
    // Store user data
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authPersistence', rememberMe ? 'local' : 'session');
    
    return user;
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
    throw error; // Re-throw the error to be handled by the caller
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
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    // Clean up local state regardless of server errors
    localStorage.removeItem('authPersistence');
    localStorage.removeItem('currentUser');
    throw error; // Re-throw the error to be handled by the caller
  }
};
