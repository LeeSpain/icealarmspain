/**
 * Mock analytics service that replaces Firebase analytics
 */

// Log an event
export const logEvent = (eventName: string, params?: Record<string, any>) => {
  console.log(`Analytics event: ${eventName}`, params);
  
  try {
    // Store analytics events in localStorage for potential future syncing
    const storedEvents = localStorage.getItem('analytics_events') || '[]';
    const events = JSON.parse(storedEvents);
    
    events.push({
      event: eventName,
      params: params || {},
      timestamp: new Date().toISOString()
    });
    
    // Only keep the last 100 events to avoid localStorage size limits
    const trimmedEvents = events.slice(-100);
    localStorage.setItem('analytics_events', JSON.stringify(trimmedEvents));
  } catch (error) {
    console.error('Error storing analytics event:', error);
  }
};

// Track page view
export const trackPageView = (pageName: string) => {
  logEvent('page_view', { page_name: pageName });
};

// Track user login
export const trackLogin = (method: string) => {
  logEvent('login', { method });
};

// Track error
export const trackError = (errorType: string, errorMessage: string) => {
  logEvent('error', { type: errorType, message: errorMessage });
};

// Export a placeholder Firebase-compatible analytics object
export const analytics = {
  logEvent
};
