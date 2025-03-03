
// Firebase configuration
// This is a mock implementation for development - replace with actual Firebase config in production

// Mock auth implementation to avoid requiring actual Firebase credentials during development
class MockAuth {
  currentUser: any = null;
  
  // Mock implementation of onAuthStateChanged
  onAuthStateChanged(callback: (user: any | null) => void) {
    // Initialize with no user
    setTimeout(() => callback(this.currentUser), 100);
    
    // Return a function that would normally unsubscribe from the auth state listener
    return () => {};
  }
  
  // Mock implementation of signInWithEmailAndPassword
  async signInWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signIn:", email);
    
    // Simulate successful sign-in
    if (password === 'admin123' || password === 'member123' || password === 'agent123') {
      this.currentUser = {
        uid: 'mock-uid-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
      };
      return { user: this.currentUser };
    }
    
    // Simulate error for invalid credentials
    throw new Error("Invalid email or password");
  }
  
  // Mock implementation of createUserWithEmailAndPassword
  async createUserWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signUp:", email);
    
    this.currentUser = {
      uid: 'mock-uid-' + Date.now(),
      email: email,
      displayName: '',
    };
    
    return { user: this.currentUser };
  }
  
  // Mock implementation of signOut
  async signOut() {
    console.log("Logging out...");
    console.log("Logging out user:", this.currentUser?.email);
    this.currentUser = null;
  }
  
  // Mock implementation of updateProfile
  async updateProfile(user: any, profile: { displayName?: string, photoURL?: string }) {
    if (user) {
      user.displayName = profile.displayName || user.displayName;
      user.photoURL = profile.photoURL || user.photoURL;
    }
  }
}

// Export the mock Auth instance
export const auth = new MockAuth();

// If you want to switch to real Firebase in the future, uncomment this code and add your Firebase config
/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
*/
