
import { User } from '../types';
import { determineUserRole } from '../utils';

// Login function (authenticate a user)
export const login = async (email: string, password: string, rememberMe: boolean = false): Promise<User> => {
  console.log('Login attempt:', { email, rememberMe });
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
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
};

// Alias for login for compatibility
export const signIn = login;

// Logout function (sign out a user)
export const logout = async (): Promise<void> => {
  console.log('Logging out');
  
  // Remove user data from localStorage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userRole');
  localStorage.removeItem('activeSection');
  localStorage.removeItem('forceDevMode');
  
  // Wait for storage changes to take effect
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Let the component handle navigation after logout completes
  console.log('Logout complete - storage cleared');
};
