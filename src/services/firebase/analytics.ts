
import { app } from './config';

// Initialize analytics with a try-catch to handle environments where it's not available
let analytics = {
  app,
  logEvent: (name, params) => console.log('Analytics event (mock):', name, params)
};

console.log('Firebase Analytics initialized (mock)');

// Helper function to log events to Firebase Analytics
export const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  try {
    if (analytics) {
      console.log(`Analytics event logged (mock): ${eventName}`, eventParams);
    } else {
      console.log(`Analytics event would be logged (mock): ${eventName}`, eventParams);
    }
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};

// Export analytics instance
export { analytics };
