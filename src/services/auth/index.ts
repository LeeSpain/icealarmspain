
/**
 * Simple authentication service that uses localStorage for demo purposes
 */

export type User = {
  uid: string;
  id: string;
  email: string;
  name: string;
  displayName: string;
  role: string;
  status?: string;
  profileCompleted: boolean;
  language?: string;
  lastLogin: string;
  createdAt?: string;
  photoURL?: string;
};

// Get the current user from localStorage
export const getCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Set the current user in localStorage
export const setCurrentUser = (user: User): void => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

// Remove the current user from localStorage
export const removeCurrentUser = (): void => {
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error removing current user:', error);
  }
};

// Sign in with email and password
export const signIn = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<User> => {
  // Mock authentication logic
  console.log(`Signing in with email: ${email}`);
  
  // Simple validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // In a real app, you would validate against a backend service
  // For this demo, we create a mock user based on the email
  const isAdmin = email.includes('admin');
  const isCallCenter = email.includes('callcenter');
  
  const role = isAdmin ? 'admin' : (isCallCenter ? 'callcenter' : 'member');
  
  const user: User = {
    uid: `user-${email.replace(/[^a-z0-9]/gi, '-')}`,
    id: `user-${email.replace(/[^a-z0-9]/gi, '-')}`,
    email,
    name: email.split('@')[0],
    displayName: email.split('@')[0],
    role,
    status: 'active',
    profileCompleted: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  
  // Store the user
  setCurrentUser(user);
  
  return user;
};

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  userData?: Partial<User>
): Promise<{ user: User | null; error: Error | null }> => {
  try {
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Create a new user
    const userId = `user-${email.replace(/[^a-z0-9]/gi, '-')}`;
    const role = email.includes('admin') ? 'admin' : (email.includes('callcenter') ? 'callcenter' : 'member');
    
    const user: User = {
      uid: userId,
      id: userId,
      email,
      name: userData?.displayName || email.split('@')[0],
      displayName: userData?.displayName || email.split('@')[0],
      role,
      status: 'active',
      profileCompleted: !!userData?.displayName,
      language: localStorage.getItem('language') || 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...userData
    };
    
    // Store the user
    setCurrentUser(user);
    
    return { user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  console.log('Signing out');
  removeCurrentUser();
  sessionStorage.setItem('recentlyLoggedOut', 'true');
};

// Update user profile
export const updateUserProfile = async (displayName: string): Promise<void> => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('No user found');
  }
  
  const updatedUser = {
    ...user,
    displayName,
    name: displayName,
    profileCompleted: true,
  };
  
  setCurrentUser(updatedUser);
};
