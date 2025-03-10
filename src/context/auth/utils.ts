
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // HARDCODED ROLES FOR DEVELOPMENT TESTING
  // These exact mappings ensure test users always work
  const EMAIL_ROLE_MAP: Record<string, string> = {
    'lwakeman@icealarm.es': 'admin',
    'wakemanlee20@gmail.com': 'callcenter',
    'icealarmespana@gmail.com': 'member',
    'admin@icealarm.es': 'admin',
    'agent@icealarm.es': 'callcenter',
    'callcenter@icealarm.es': 'callcenter',
    'member@icealarm.es': 'member',
  };
  
  // Check for exact email match first
  if (EMAIL_ROLE_MAP[email]) {
    console.log(`Assigning ${EMAIL_ROLE_MAP[email]} role for email: ${email}`);
    return EMAIL_ROLE_MAP[email];
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
