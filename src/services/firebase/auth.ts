
import { app } from './config';
import { isDevelopment } from '@/utils/environment';

console.log("Initializing Firebase Auth");

// Simple initialization without complex fallbacks
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    console.log("Auth state change listener registered");
    // Return an unsubscribe function
    return () => {
      console.log("Auth state change listener unsubscribed");
    };
  },
  signInWithEmailAndPassword: async (email, password) => {
    console.log("Mock sign in with:", email);
    return {
      user: {
        uid: "mock-uid",
        email,
        displayName: email.split('@')[0],
        metadata: {
          creationTime: new Date().toISOString(),
        }
      }
    };
  },
  createUserWithEmailAndPassword: async (email, password) => {
    console.log("Mock create user with:", email);
    return {
      user: {
        uid: "mock-uid",
        email,
        displayName: null,
        metadata: {
          creationTime: new Date().toISOString(),
        }
      }
    };
  },
  signOut: async () => {
    console.log("Mock sign out");
    return Promise.resolve();
  },
  updateProfile: async (user, profile) => {
    console.log("Mock update profile:", profile);
    return Promise.resolve();
  }
};

// Export mocked functions
const onAuthStateChanged = (auth, callback) => {
  // Immediately call with null for no user
  setTimeout(() => {
    callback(null);
  }, 100);
  
  // Return an unsubscribe function
  return () => {
    console.log("Mock auth state change unsubscribed");
  };
};

const signInWithEmailAndPassword = async (auth, email, password) => {
  console.log("Mock sign in with:", email);
  return {
    user: {
      uid: "mock-uid",
      email,
      displayName: email.split('@')[0],
      metadata: {
        creationTime: new Date().toISOString(),
      },
      photoURL: null
    }
  };
};

const createUserWithEmailAndPassword = async (auth, email, password) => {
  console.log("Mock create user with:", email);
  return {
    user: {
      uid: "mock-uid",
      email,
      displayName: null,
      metadata: {
        creationTime: new Date().toISOString(),
      },
      photoURL: null
    }
  };
};

const signOut = async () => {
  console.log("Mock sign out");
  return Promise.resolve();
};

const updateProfile = async (user, profile) => {
  console.log("Mock update profile:", profile);
  return Promise.resolve();
};

// Export everything
export { 
  auth, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
};

// Enable development mode features
if (isDevelopment()) {
  // Add any development-specific configuration here
  console.log('Firebase Auth running in development mode');
}
