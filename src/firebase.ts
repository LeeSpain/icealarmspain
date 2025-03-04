// Firebase configuration
// This file supports both mock implementation for development and real Firebase for production

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';

// Check if we have Firebase config in environment variables
const hasRealFirebaseConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;

// Mock Auth class for development (when no Firebase config is available)
class MockAuth {
  currentUser: any = null;
  authStateListeners: Array<(user: any | null) => void> = [];
  persistenceType: string = 'session';
  
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
    console.log("Mock signIn:", email, "Persistence:", this.persistenceType);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error("The email address is badly formatted.");
    }
    
    // Fixed admin credentials - always allow admin@icealarm.es with password admin123
    if (email === "admin@icealarm.es" && password === "admin123") {
      this.currentUser = {
        uid: 'mock-uid-admin-' + Date.now(),
        email: email,
        displayName: 'Admin User',
      };
      
      // Notify all listeners that the auth state has changed
      this.authStateListeners.forEach(callback => callback(this.currentUser));
      
      return { user: this.currentUser };
    }
    
    // Other test accounts
    else if (
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
  
  // Mock implementation of setPersistence
  async setPersistence(persistenceType: string) {
    console.log("Setting mock persistence to:", persistenceType);
    this.persistenceType = persistenceType;
    return Promise.resolve();
  }
}

// Mock Payment class for development
class MockPayment {
  orders: any[] = [];
  
  async processPayment(paymentDetails: {
    amount: number,
    cardNumber: string,
    expiryDate: string,
    cvc: string,
    name: string,
    items: any[],
    userId?: string,
    email?: string,
    address?: any
  }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Basic validation
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
      throw new Error("Payment details are incomplete");
    }
    
    // Validate card number format (simple check)
    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
      throw new Error("Invalid card number format");
    }
    
    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      throw new Error("Invalid expiry date format (use MM/YY)");
    }
    
    // Validate CVC
    if (!/^\d{3,4}$/.test(paymentDetails.cvc)) {
      throw new Error("Invalid CVC code");
    }
    
    // For demo purposes, we'll decline specific test cards
    if (paymentDetails.cardNumber.replace(/\s/g, '') === '4111111111111111') {
      throw new Error("Your card was declined. Please try a different card.");
    }
    
    // Create new order with unique ID
    const orderId = 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const orderDate = new Date().toISOString();
    
    const order = {
      id: orderId,
      date: orderDate,
      amount: paymentDetails.amount,
      items: paymentDetails.items,
      status: 'completed',
      user: {
        id: paymentDetails.userId || 'guest-' + Date.now(),
        email: paymentDetails.email || 'guest@example.com'
      },
      paymentMethod: {
        type: 'card',
        last4: paymentDetails.cardNumber.slice(-4)
      },
      shippingAddress: paymentDetails.address || null
    };
    
    // Add to orders
    this.orders.push(order);
    
    console.log("Payment processed successfully:", order);
    
    return {
      success: true,
      orderId,
      orderDate,
      amount: paymentDetails.amount,
      last4: paymentDetails.cardNumber.slice(-4)
    };
  }
  
  // Get orders for a user
  async getUserOrders(userId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return orders for this user
    return this.orders.filter(order => order.user.id === userId);
  }
  
  // Get a specific order by ID
  async getOrder(orderId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.orders.find(order => order.id === orderId) || null;
  }
}

// Export auth and payment instances based on configuration
let auth;
let payment;

if (hasRealFirebaseConfig) {
  // Initialize real Firebase if config is available
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  console.log('Using real Firebase authentication');
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // We still use mock payment since we don't have real payment integration yet
  payment = new MockPayment();
} else {
  console.log('Using mock authentication - for production, set Firebase environment variables');
  auth = new MockAuth();
  payment = new MockPayment();
}

export { auth, payment };

// Export real Firebase auth methods to be used with real Firebase
export const firebaseAuth = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
};
