
import { analytics } from './auth';
import { logEvent as firebaseLogEvent } from 'firebase/analytics';

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
