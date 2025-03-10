
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // Support for exact email matches first
  if (email === 'icealarmespana@gmail.com' || 
      email === 'admin@icealarm.es' ||
      email === 'admin@example.com') {
    console.log('Assigning admin role to', email);
    return 'admin';
  } 
  else if (email === 'wakemanlee20@gmail.com' || 
           email === 'callcenter@icealarm.es' ||
           email === 'callcenter@example.com') {
    console.log('Assigning callcenter role to', email);
    return 'callcenter';
  } 
  else if (email === 'lwakeman@icealarm.es' || 
           email === 'user@example.com' ||
           email === 'test@example.com') {
    console.log('Assigning member role to', email);
    return 'member';
  }
  
  // Fallback to pattern matching for other emails
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
  return process.env.NODE_ENV === 'development' || !import.meta.env.VITE_FIREBASE_API_KEY;
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

