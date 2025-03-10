
// Function to determine the user's role based on email
export const determineUserRole = (email: string): string => {
  if (!email) return 'member';
  
  email = email.toLowerCase();
  
  // Debug log for troubleshooting
  console.log('Determining role for email:', email);
  
  // Support for real Supabase accounts - check exact email matches first
  if (email === 'icealarmespana@gmail.com') {
    console.log('Assigning admin role to icealarmespana@gmail.com');
    return 'admin';
  } else if (email === 'wakemanlee20@gmail.com') {
    console.log('Assigning callcenter role to wakemanlee20@gmail.com');
    return 'callcenter';
  } else if (email === 'lwakeman@icealarm.es') {
    console.log('Assigning member role to lwakeman@icealarm.es');
    return 'member';
  }
  
  // Fallback to pattern matching for other emails
  if (email.endsWith('@admin.icealarm.es') || email.includes('admin')) {
    console.log('Assigning admin role based on email pattern');
    return 'admin';
  } else if (email.endsWith('@callcenter.icealarm.es') || 
            email.includes('agent') || 
            email.includes('callcenter') || 
            email.includes('call-center')) {
    console.log('Assigning callcenter role based on email pattern');
    return 'callcenter';
  } else if (email.endsWith('@tech.icealarm.es') || email.includes('tech')) {
    console.log('Assigning technician role based on email pattern');
    return 'technician';
  } else if (email.endsWith('@support.icealarm.es') || email.includes('support')) {
    console.log('Assigning support role based on email pattern');
    return 'support';
  } else {
    console.log('Assigning default member role');
    return 'member';
  }
};
