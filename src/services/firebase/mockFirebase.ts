
/**
 * Mock Firebase implementation for when Firebase config is missing
 * This allows the application to load and render with basic functionality
 * even when Firebase is not properly configured
 */

import { getEnvironment, isDevelopment } from '@/utils/environment';
import { User } from 'firebase/auth';

// Log that we're using mock Firebase
console.warn('Using mock Firebase implementation due to missing configuration');
if (isDevelopment()) {
  console.info('This is normal in development if you haven\'t set up Firebase credentials');
  console.info('Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to your .env file for full functionality');
} else {
  console.error('CRITICAL: Mock Firebase is being used in a non-development environment');
  console.error('Please configure proper Firebase credentials in your hosting environment');
}

// Define a mock user class that matches Firebase's User interface
class MockUser implements Partial<User> {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean = false;
  providerData: any[] = [];
  refreshToken: string = '';
  tenantId: string | null = null;
  phoneNumber: string | null = null;
  
  constructor(email: string, displayName?: string) {
    this.uid = `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    this.email = email;
    this.displayName = displayName || email.split('@')[0];
    this.photoURL = null;
    this.emailVerified = true;
  }
  
  // Add any other User properties needed
  metadata = {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString()
  };
  
  // Add stub methods required by the User interface
  getIdToken(): Promise<string> {
    return Promise.resolve('mock-id-token');
  }
  
  delete(): Promise<void> {
    return Promise.resolve();
  }
  
  reload(): Promise<void> {
    return Promise.resolve();
  }
}

// Mock Auth
export const mockAuth = {
  currentUser: null as (MockUser | null),
  
  onAuthStateChanged: (callback: (user: MockUser | null) => void) => {
    // Always return null user
    setTimeout(() => callback(null), 100);
    
    // Return mock unsubscribe function
    return () => {};
  },
  
  signInWithEmailAndPassword: async (email: string, password: string) => {
    console.log(`Mock signIn called with: ${email}`);
    
    // Create a mock user that matches Firebase's UserCredential interface
    const mockUser = new MockUser(email);
    
    // Return a mock UserCredential
    return {
      user: mockUser,
      providerId: null,
      operationType: 'signIn'
    };
  },
  
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    console.log(`Mock createUser called with: ${email}`);
    
    // Create a mock user that matches Firebase's UserCredential interface
    const mockUser = new MockUser(email);
    
    // Return a mock UserCredential
    return {
      user: mockUser,
      providerId: null,
      operationType: 'signUp'
    };
  },
  
  signOut: async () => {
    console.log('Mock sign out called');
    return Promise.resolve();
  },
  
  updateProfile: async (user: any, profile: {displayName?: string; photoURL?: string}) => {
    console.log('Mock updateProfile called with:', profile);
    return Promise.resolve();
  }
};

// Mock Firestore
export const mockFirestore = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      get: async () => ({
        exists: false,
        data: () => null,
        id
      }),
      set: async () => Promise.resolve(),
      update: async () => Promise.resolve(),
      delete: async () => Promise.resolve()
    }),
    add: async () => ({ id: 'mock-id' }),
    where: () => ({
      get: async () => ({
        empty: true,
        docs: [],
        forEach: () => {}
      })
    })
  })
};

// Mock Analytics
export const mockAnalytics = {
  logEvent: (name: string, params: any) => {
    console.log(`Mock analytics event: ${name}`, params);
  }
};

// Mock Storage
export const mockStorage = {
  ref: (path: string) => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => 'https://example.com/mock-download-url'
      }
    }),
    delete: async () => Promise.resolve()
  })
};

// Mock Functions
export const mockFunctions = {
  httpsCallable: (name: string) => async (data: any) => {
    console.log(`Mock cloud function called: ${name}`, data);
    return { data: null };
  }
};

// Export a mock Firebase instance
export const mockFirebase = {
  auth: mockAuth,
  firestore: mockFirestore,
  analytics: mockAnalytics,
  storage: mockStorage,
  functions: mockFunctions,
  app: {
    name: '[DEFAULT]',
    options: {
      apiKey: 'mock-api-key',
      projectId: 'mock-project-id',
      appId: 'mock-app-id'
    }
  }
};

export default mockFirebase;
