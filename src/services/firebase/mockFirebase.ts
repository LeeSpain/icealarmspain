
/**
 * Mock Firebase implementation for when Firebase config is missing
 * This allows the application to load and render with basic functionality
 * even when Firebase is not properly configured
 */

import { getEnvironment, isDevelopment } from '@/utils/environment';

// Log that we're using mock Firebase
console.warn('Using mock Firebase implementation due to missing configuration');
if (isDevelopment()) {
  console.info('This is normal in development if you haven\'t set up Firebase credentials');
  console.info('Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to your .env file for full functionality');
} else {
  console.error('CRITICAL: Mock Firebase is being used in a non-development environment');
  console.error('Please configure proper Firebase credentials in your hosting environment');
}

// Mock Auth
export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    // Always return null user
    setTimeout(() => callback(null), 100);
    
    // Return mock unsubscribe function
    return () => {};
  },
  signInWithEmailAndPassword: async () => {
    throw new Error('Authentication is not available with mock Firebase');
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error('Authentication is not available with mock Firebase');
  },
  signOut: async () => {
    console.log('Mock sign out called');
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
