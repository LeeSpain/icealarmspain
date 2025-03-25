
import { auth, createUserWithEmailAndPassword, updateProfile } from '@/services/firebase/auth';
import { User } from '../types';
import { determineUserRole } from '../utils';
import { isMockAuthEnabled, isDevelopment } from '@/utils/environment';
import { sendWelcomeEmail } from '@/services/emailService';

// Sign up function (create a new user)
export const signUp = async (
  email: string, 
  password: string, 
  userData?: any
): Promise<{ user: User | null; error: any | null }> => {
  console.log('Signup attempt:', { email });
  
  if (!email || !password) {
    return { 
      user: null, 
      error: new Error('Email and password are required') 
    };
  }
  
  // In mock auth mode for development, use the mock implementation
  if (isMockAuthEnabled()) {
    console.log('Using mock auth implementation for signup');
    
    // Determine role using exact email matching
    const role = determineUserRole(email);
    console.log('Determined role:', role);
    
    const devUserId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
    
    // Create a user object
    const user: User = {
      uid: devUserId,
      id: devUserId,
      email: email,
      name: userData?.display_name || email.split('@')[0],
      displayName: userData?.display_name || email.split('@')[0],
      role,
      status: 'active',
      profileCompleted: !!userData?.display_name,
      language: localStorage.getItem('language') || 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // Store the user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    
    // Send welcome email
    try {
      await sendWelcomeEmail(email, user.displayName);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Continue even if email fails
    }
    
    return { user, error: null };
  } 
  // In production, use the real Firebase auth
  else {
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update display name if provided
      if (userData?.display_name) {
        await updateProfile(firebaseUser, { displayName: userData.display_name });
      }
      
      // Determine role from email
      const role = determineUserRole(firebaseUser.email || '');
      
      // Create user object
      const user: User = {
        uid: firebaseUser.uid,
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: userData?.display_name || firebaseUser.displayName || email.split('@')[0],
        displayName: userData?.display_name || firebaseUser.displayName || email.split('@')[0],
        role,
        status: 'active',
        profileCompleted: !!userData?.display_name,
        language: localStorage.getItem('language') || 'en',
        lastLogin: new Date().toISOString(),
        createdAt: firebaseUser.metadata.creationTime || '',
      };
      
      // Send welcome email
      try {
        await sendWelcomeEmail(email, user.displayName);
      } catch (error) {
        console.error('Error sending welcome email:', error);
        // Continue even if email fails
      }
      
      return { user, error: null };
    } catch (error) {
      console.error('Firebase authentication error during signup:', error);
      return { user: null, error };
    }
  }
};

// Export this function for backward compatibility
export const createUser = signUp;
