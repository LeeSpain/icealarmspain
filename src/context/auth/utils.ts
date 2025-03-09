
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Specific email-to-role mapping for accounts
  if (email === 'lwakeman@icealarm.es') {
    return 'admin';
  } else if (email === 'wakemanlee20@gmail.com') {
    return 'callcenter';
  } else if (email === 'icealarmespana@gmail.com') {
    return 'member';
  } else if (email === 'admin@icealarm.es') {
    return 'admin';
  } else if (email === 'agent@icealarm.es' || email === 'callcenter@icealarm.es') {
    return 'callcenter';
  } else if (email === 'member@icealarm.es') {
    return 'member';
  }
  
  // General pattern matching for other emails
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('agent') || email.includes('callcenter') || email.includes('call-center')) {
    return 'callcenter';
  } else {
    return 'member';
  }
};
