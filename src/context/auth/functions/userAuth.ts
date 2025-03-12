
import { User } from '../types';
import { determineUserRole } from '../utils';

// Login function (authenticate a user)
export const login = async (email: string, password: string, rememberMe: boolean = false): Promise<User> => {
  console.log('Login attempt:', { email, rememberMe });
  
  // This is a mock implementation for development
  // In a real app, this would authenticate with Firebase/Supabase
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // For development mode, we'll accept any password
  // Using exact email matching for role determination
  const role = determineUserRole(email);
  console.log('Determined role:', role);
  
  const devUserId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
  
  // Create a user object for our auth context
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
  
  console.log('Dev mode user created:', user);
  
  // Store the user in localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('userRole', role);
  
  // If rememberMe is true, store the email for next time
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
  
  // Force page refresh to clear any state
  window.location.href = '/';
};
