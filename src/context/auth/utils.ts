
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // Map specific email domains to roles
  if (email.endsWith('@admin.icealarm.es') || email.includes('admin')) {
    console.log('Assigning admin role based on email domain or pattern');
    return 'admin';
  } else if (email.endsWith('@callcenter.icealarm.es') || 
            email.includes('agent') || 
            email.includes('callcenter') || 
            email.includes('call-center')) {
    console.log('Assigning callcenter role based on email domain or pattern');
    return 'callcenter';
  } else if (email.endsWith('@tech.icealarm.es') || email.includes('tech')) {
    console.log('Assigning technician role based on email domain or pattern');
    return 'technician';
  } else if (email.endsWith('@support.icealarm.es') || email.includes('support')) {
    console.log('Assigning support role based on email domain or pattern');
    return 'support';
  } else {
    console.log('Assigning default member role');
    return 'member';
  }
};
