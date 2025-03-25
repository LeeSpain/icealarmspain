
import { isDevelopment } from '@/utils/environment';

// Define simple mock types to match Firebase interfaces
export type MockUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
};

export type MockUserCredential = {
  user: MockUser;
};

// Create a mock Firebase auth service for development
export const mockAuth = {
  currentUser: null as MockUser | null,
  
  // Mock sign in implementation
  signInWithEmailAndPassword: (email: string, password: string): Promise<MockUserCredential> => {
    console.log('MOCK: Sign in with', { email, password });
    
    const user: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString()
      }
    };
    
    mockAuth.currentUser = user;
    
    // Persist to local storage for session maintenance
    localStorage.setItem('mockFirebaseUser', JSON.stringify(user));
    
    return Promise.resolve({ user });
  },
  
  // Mock create user implementation
  createUserWithEmailAndPassword: (email: string, password: string): Promise<MockUserCredential> => {
    console.log('MOCK: Create user with', { email, password });
    
    const user: MockUser = {
      uid: `mock-${Date.now()}`,
      email,
      displayName: null,
      metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString()
      }
    };
    
    mockAuth.currentUser = user;
    
    // Persist to local storage
    localStorage.setItem('mockFirebaseUser', JSON.stringify(user));
    
    return Promise.resolve({ user });
  },
  
  // Mock sign out implementation
  signOut: (): Promise<void> => {
    console.log('MOCK: Sign out');
    mockAuth.currentUser = null;
    localStorage.removeItem('mockFirebaseUser');
    return Promise.resolve();
  },
  
  // Mock auth state changed callback
  onAuthStateChanged: (callback: (user: MockUser | null) => void) => {
    console.log('MOCK: Setting up auth state changed listener');
    
    // Try to restore user from localStorage
    try {
      const storedUser = localStorage.getItem('mockFirebaseUser');
      if (storedUser) {
        mockAuth.currentUser = JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Error restoring mock user from localStorage', e);
    }
    
    // Call the callback with the current user state
    setTimeout(() => {
      callback(mockAuth.currentUser);
    }, 100);
    
    // Return a mock subscription
    return {
      unsubscribe: () => {
        console.log('MOCK: Unsubscribed from auth state changes');
      }
    };
  }
};

// More mock Firebase services can be added here as needed
