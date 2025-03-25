
import { auth, signInWithEmailAndPassword, signOut as firebaseSignOut } from '@/services/firebase/auth';
import { User } from '../types';

// Login with email and password
export const login = async (
  email: string, 
  password: string, 
  rememberMe: boolean = false
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Convert Firebase user to our User type
    const user: User = {
      uid: firebaseUser.uid,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      displayName: firebaseUser.displayName || '',
      role: 'member', // Default role, can be updated from profile
      profileCompleted: !!firebaseUser.displayName,
      photoURL: firebaseUser.photoURL || undefined,
      lastLogin: new Date().toISOString(),
    };
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Sign out the current user
export const logout = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
