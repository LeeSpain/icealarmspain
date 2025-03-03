
// Firebase configuration
// This is a mock implementation for development - replace with actual Firebase config in production

// Mock auth implementation to avoid requiring actual Firebase credentials during development
class MockAuth {
  currentUser: any = null;
  authStateListeners: Array<(user: any | null) => void> = [];
  
  // Mock implementation of onAuthStateChanged
  onAuthStateChanged(callback: (user: any | null) => void) {
    // Add the callback to our listeners array
    this.authStateListeners.push(callback);
    
    // Immediately call the callback with the current user state
    setTimeout(() => callback(this.currentUser), 100);
    
    // Return a function that would normally unsubscribe from the auth state listener
    return () => {
      this.authStateListeners = this.authStateListeners.filter(cb => cb !== callback);
    };
  }
  
  // Mock implementation of signInWithEmailAndPassword
  async signInWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signIn:", email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error("The email address is badly formatted.");
    }
    
    // Simulate successful sign-in for demo credentials
    if (
      (email === "admin@icealarm.es" && password === "admin123") ||
      (email === "member@icealarm.es" && password === "member123") ||
      (email === "agent@icealarm.es" && password === "agent123") || 
      (email.includes('admin') && password === 'admin123') ||
      (email.includes('member') && password === 'member123') ||
      (email.includes('agent') && password === 'agent123') ||
      (email.includes('demo') && password.length >= 6)
    ) {
      // Create user based on email
      const displayName = email.split('@')[0];
      
      this.currentUser = {
        uid: 'mock-uid-' + Date.now(),
        email: email,
        displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      };
      
      // Notify all listeners that the auth state has changed
      this.authStateListeners.forEach(callback => callback(this.currentUser));
      
      return { user: this.currentUser };
    }
    
    // Simulate error for invalid credentials
    throw new Error("The password is invalid or the user does not have a password.");
  }
  
  // Mock implementation of createUserWithEmailAndPassword
  async createUserWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signUp:", email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error("The email address is badly formatted.");
    }
    
    // Validate password
    if (password.length < 6) {
      throw new Error("The password must be at least 6 characters long.");
    }
    
    // Simulate existing user error
    if (email === "admin@icealarm.es" || email === "member@icealarm.es" || email === "agent@icealarm.es") {
      throw new Error("The email address is already in use by another account.");
    }
    
    this.currentUser = {
      uid: 'mock-uid-' + Date.now(),
      email: email,
      displayName: '',
    };
    
    // Notify all listeners that the auth state has changed
    this.authStateListeners.forEach(callback => callback(this.currentUser));
    
    return { user: this.currentUser };
  }
  
  // Mock implementation of signOut
  async signOut() {
    console.log("Logging out user:", this.currentUser?.email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    
    // Notify all listeners that the auth state has changed
    this.authStateListeners.forEach(callback => callback(null));
  }
  
  // Mock implementation of updateProfile
  async updateProfile(user: any, profile: { displayName?: string, photoURL?: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (user) {
      user.displayName = profile.displayName || user.displayName;
      user.photoURL = profile.photoURL || user.photoURL;
      
      // If this is the current user, update it
      if (this.currentUser && this.currentUser.uid === user.uid) {
        this.currentUser = { ...this.currentUser, ...user };
        
        // Notify all listeners that the auth state has changed
        this.authStateListeners.forEach(callback => callback(this.currentUser));
      }
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
