
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { app } from './config';

// Initialize analytics with a try-catch to handle environments where it's not available
let analytics;
try {
  analytics = getAnalytics(app);
  console.log('Firebase Analytics initialized');
} catch (error) {
  console.warn('Firebase Analytics initialization failed:', error);
  // Create a mock analytics object for environments where Firebase Analytics isn't available
  analytics = {
    app,
    logEvent: (name, params) => console.log('Analytics event (mock):', name, params)
  };
}

// Helper function to log events to Firebase Analytics
export const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  try {
    if (analytics) {
      firebaseLogEvent(analytics, eventName, eventParams);
      console.log(`Analytics event logged: ${eventName}`, eventParams);
    } else {
      console.log(`Analytics event would be logged (mock): ${eventName}`, eventParams);
    }
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};

// Export analytics instance
export { analytics };
