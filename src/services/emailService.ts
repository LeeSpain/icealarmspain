
import { isDevelopment } from '@/utils/environment';

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(email: string, displayName: string): Promise<void> {
  if (isDevelopment()) {
    console.log(`[DEV] Sending welcome email to ${email} (${displayName})`);
    return Promise.resolve();
  }
  
  // In production, this would call an API to send the actual email
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Welcome email sent to ${email}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

/**
 * Send a password reset email to a user
 */
export async function sendPasswordResetEmail(email: string): Promise<void> {
  if (isDevelopment()) {
    console.log(`[DEV] Sending password reset email to ${email}`);
    return Promise.resolve();
  }
  
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Password reset email sent to ${email}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

/**
 * Send a notification email to a user
 */
export async function sendNotificationEmail(
  email: string, 
  subject: string,
  message: string
): Promise<void> {
  if (isDevelopment()) {
    console.log(`[DEV] Sending notification email to ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    return Promise.resolve();
  }
  
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Notification email sent to ${email}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}
