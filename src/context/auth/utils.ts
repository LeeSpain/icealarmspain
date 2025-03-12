
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // Primary email matches - exactly as requested
  if (email === 'wakemanlee20@gmail.com') {
    console.log('Assigning admin role to', email);
    return 'admin';
  } 
  else if (email === 'icealarmespana@gmail.com') {
    console.log('Assigning callcenter role to', email);
    return 'callcenter';
  } 
  else if (email === 'lwakeman@icealarm.es') {
    console.log('Assigning member role to', email);
    return 'member';
  }
  
  // Test accounts - highest priority for development mode
  else if (email === 'admin@icealarm.es' || 
           email === 'admin@example.com') {
    console.log('Assigning admin role to', email);
    return 'admin';
  } 
  else if (email === 'callcenter@icealarm.es' ||
           email === 'callcenter@example.com') {
    console.log('Assigning callcenter role to', email);
    return 'callcenter';
  } 
  else if (email === 'user@example.com' ||
           email === 'test@example.com') {
    console.log('Assigning member role to', email);
    return 'member';
  }
  
  // Pattern matching for other emails
  if (email.endsWith('@admin.icealarm.es') || 
      email.includes('admin')) {
    console.log('Assigning admin role based on email pattern');
    return 'admin';
  } 
  else if (email.endsWith('@callcenter.icealarm.es') || 
           email.includes('agent') || 
           email.includes('callcenter') || 
           email.includes('call-center')) {
    console.log('Assigning callcenter role based on email pattern');
    return 'callcenter';
  } 
  else if (email.endsWith('@tech.icealarm.es') || 
           email.includes('tech')) {
    console.log('Assigning technician role based on email pattern');
    return 'technician';
  } 
  else if (email.endsWith('@support.icealarm.es') || 
           email.includes('support')) {
    console.log('Assigning support role based on email pattern');
    return 'support';
  } 
  else {
    console.log('Assigning default member role');
    return 'member';
  }
};

// Helper function to check if we're in development mode
export const isDevelopmentMode = (): boolean => {
  // Force development mode for testing
  const forceDevMode = localStorage.getItem('forceDevMode') === 'true';
  if (forceDevMode) {
    console.log('Development mode forced by localStorage setting');
    return true;
  }
  
  // Check if we have the Firebase API key - if not, we're in development mode
  const hasFirebaseKey = !!import.meta.env.VITE_FIREBASE_API_KEY;
  
  // More verbose logging for debugging
  console.log('Development mode check:', {
    hasFirebaseKey,
    isDevMode: !hasFirebaseKey,
    envMode: import.meta.env.MODE
  });
  
  return !hasFirebaseKey;
};

// Function to get test credentials for testing/development
export const getTestCredentials = () => {
  return {
    admin: {
      email: 'admin@icealarm.es',
      password: 'password123'
    },
    callcenter: {
      email: 'callcenter@icealarm.es',
      password: 'password123'
    },
    member: {
      email: 'user@example.com',
      password: 'password123'
    }
  };
};
