
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Specific email-to-role mapping for test accounts
  if (email === 'lwakeman@icealarm.es') {
    return 'admin';
  } else if (email === 'wakemanlee20@gmail.com') {
    return 'callcenter';
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
