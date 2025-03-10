import { User } from '../types';
import { determineUserRole } from '../utils';
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  auth 
} from '../../../services/firebase/auth';

// Sign up function
export const signUp = async (email: string, password: string, displayName?: string, role: string = 'member'): Promise<User> => {
  try {
    console.log('Attempting signup for:', email, 'with role:', role);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user) {
      throw new Error('Failed to get user after signup');
    }
    
    // Update profile with displayName if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // For admin-created users, we respect the specified role parameter
    // Otherwise, determine role based on email as fallback
    const assignedRole = role || determineUserRole(email);
    console.log('Signup successful. Assigned role:', assignedRole);
    
    const user: User = {
      uid: userCredential.user.uid,
      id: userCredential.user.uid,
      email: userCredential.user.email,
      name: displayName || userCredential.user.email?.split('@')[0],
      displayName: displayName || userCredential.user.email?.split('@')[0],
      role: assignedRole,
      profileCompleted: !!displayName,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: userCredential.user.metadata.creationTime
    };
    
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Create user function (for admin use)
export const createUser = async (email: string, password: string, displayName: string, role: string): Promise<User> => {
  try {
    console.log('Admin creating new user:', email, 'with role:', role);
    
    // Use signUp with specified role
    const user = await signUp(email, password, displayName, role);
    
    return user;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};
