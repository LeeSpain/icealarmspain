
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // Specific email-to-role mapping for accounts
  if (email === 'lwakeman@icealarm.es') {
    console.log('Assigning admin role for lwakeman@icealarm.es');
    return 'admin';
  } else if (email === 'wakemanlee20@gmail.com') {
    console.log('Assigning callcenter role for wakemanlee20@gmail.com');
    return 'callcenter';
  } else if (email === 'icealarmespana@gmail.com') {
    console.log('Assigning member role for icealarmespana@gmail.com');
    return 'member';
  } else if (email === 'admin@icealarm.es') {
    console.log('Assigning admin role for admin@icealarm.es');
    return 'admin';
  } else if (email === 'agent@icealarm.es' || email === 'callcenter@icealarm.es') {
    console.log('Assigning callcenter role for agent/callcenter@icealarm.es');
    return 'callcenter';
  } else if (email === 'member@icealarm.es') {
    console.log('Assigning member role for member@icealarm.es');
    return 'member';
  }
  
  // General pattern matching for other emails
  if (email.includes('admin')) {
    console.log('Assigning admin role based on email pattern (contains admin)');
    return 'admin';
  } else if (email.includes('agent') || email.includes('callcenter') || email.includes('call-center')) {
    console.log('Assigning callcenter role based on email pattern');
    return 'callcenter';
  } else {
    console.log('Assigning default member role');
    return 'member';
  }
};
