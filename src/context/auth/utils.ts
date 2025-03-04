
// Helper function to determine user role based on email
export const determineUserRole = (email: string): string => {
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('agent')) {
    return 'callcenter';
  } else {
    return 'member';
  }
};
