
// Determine the user role based on email domain or specific address
export const determineUserRole = (email: string): string => {
  console.log("Determining role for email:", email);
  
  // Specific admin emails
  if (email === 'admin@icealarm.es' || email.endsWith('@admin.icealarm.es')) {
    console.log("Role assigned: admin");
    return 'admin';
  }
  
  // Call center staff
  if (email.endsWith('@callcenter.icealarm.es') || email.includes('callcenter')) {
    console.log("Role assigned: callcenter");
    return 'callcenter';
  }
  
  // For any other user emails, assign member role
  console.log("Role assigned: member");
  return 'member';
};
