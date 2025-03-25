
// Firebase service initialization and exports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

import { getFirebaseConfig } from './services/firebase/config';
import * as mockPayment from './services/firebase/mockPayment';
import * as analyticsService from './services/firebase/analytics';

// Initialize Firebase with configuration
const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally (browser only)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Set up mock payment service for development
export const payment = mockPayment;

// Export analytics service
export const track = analyticsService;

export default app;
