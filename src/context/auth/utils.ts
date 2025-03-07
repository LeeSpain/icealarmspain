
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  email = email.toLowerCase();
  
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('agent') || email.includes('callcenter') || email.includes('call-center')) {
    return 'callcenter';
  } else {
    return 'member';
  }
};
