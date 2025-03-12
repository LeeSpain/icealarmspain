
import { determineUserRole } from '../utils';
import { User } from '../types';

// SignUp function (create a new user)
export const signUp = async (email: string, password: string, userData?: any): Promise<User> => {
  // This is a mock implementation for development
  const role = determineUserRole(email);
  const devUserId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
  
  const user: User = {
    uid: devUserId,
    id: devUserId,
    email: email,
    name: userData?.displayName || email.split('@')[0],
    displayName: userData?.displayName || email.split('@')[0],
    role,
    profileCompleted: !!userData?.displayName,
    language: userData?.language || localStorage.getItem('language') || 'en',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  // Store the user
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('userRole', role);
  
  return user;
};
