
/**
 * Email service functions
 */

// Placeholder implementation for email sending
export const sendEmail = async (
  to: string, 
  subject: string, 
  body: string
): Promise<{ success: boolean; error?: string }> => {
  console.log(`Sending email to ${to} with subject: ${subject}`);
  
  // Mock implementation always succeeds
  return { success: true };
};

// Welcome email
export const sendWelcomeEmail = async (
  to: string, 
  userName: string
): Promise<{ success: boolean; error?: string }> => {
  console.log(`Sending welcome email to ${to} for user ${userName}`);
  
  return sendEmail(
    to,
    'Welcome to Ice Guardian!',
    `Hello ${userName},\n\nWelcome to Ice Guardian! We're excited to have you on board.`
  );
};

// Password reset email
export const sendPasswordResetEmail = async (
  to: string
): Promise<{ success: boolean; error?: string }> => {
  console.log(`Sending password reset email to ${to}`);
  
  return sendEmail(
    to,
    'Password Reset Request',
    'You requested a password reset. Click the link below to reset your password.'
  );
};

// Notification email
export const sendNotificationEmail = async (
  to: string | string[],
  subject: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  const recipients = Array.isArray(to) ? to : [to];
  console.log(`Sending notification email to ${recipients.join(', ')}`);
  
  // In a real implementation, we would handle multiple recipients
  // Here we're just sending to each recipient individually
  const results = await Promise.all(
    recipients.map(recipient => 
      sendEmail(recipient, subject, message)
    )
  );
  
  // Check if any failed
  const anyFailed = results.some(result => !result.success);
  if (anyFailed) {
    return { 
      success: false, 
      error: 'Failed to send to some recipients' 
    };
  }
  
  return { success: true };
};

// Emergency alert email
export const sendEmergencyAlertEmail = async (
  to: string | string[],
  userName: string,
  message: string
): Promise<{ success: boolean; error?: string, recipients: string[] }> => {
  const recipients = Array.isArray(to) ? to : [to];
  console.log(`Sending emergency alert email for ${userName} to ${recipients.join(', ')}`);
  
  const result = await sendNotificationEmail(
    recipients,
    `EMERGENCY ALERT: ${userName} needs assistance`,
    message
  );
  
  return { 
    ...result, 
    recipients
  };
};
