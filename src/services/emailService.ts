
// Email service for sending and tracking emails

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  template?: string;
  attachments?: Array<{name: string, content: string}>;
}

export interface EmailLog {
  id: string;
  userId: string;
  to: string;
  subject: string;
  sentAt: Date;
  status: 'sent' | 'failed' | 'delivered' | 'opened';
  templateId?: string;
}

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<{success: boolean, error?: string}> => {
  console.log('Sending email:', options);
  
  // In development, just log the email
  if (process.env.NODE_ENV === 'development') {
    console.log('Email sent (mock):', options);
    return { success: true };
  }
  
  try {
    // In production, this would send via an API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to send email' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
};

// Send test email
export const sendTestEmail = async (to: string): Promise<{success: boolean, error?: string}> => {
  return sendEmail({
    to,
    subject: 'Test Email from ICE Guardian',
    body: `This is a test email sent from ICE Guardian at ${new Date().toLocaleString()}`
  });
};

// Send welcome email to new users
export const sendWelcomeEmail = async (to: string, name: string): Promise<{success: boolean, error?: string}> => {
  return sendEmail({
    to,
    subject: 'Welcome to ICE Guardian',
    body: `Hello ${name},\n\nWelcome to ICE Guardian! We're excited to have you join our community.\n\nThe ICE Guardian Team`
  });
};

// Send notification email for custom messages
export const sendNotificationEmail = async (to: string, subject: string, message: string): Promise<{success: boolean, error?: string}> => {
  return sendEmail({
    to,
    subject,
    body: message
  });
};

// Get email logs for a user
export const getUserEmailLogs = async (userId: string): Promise<{data: EmailLog[], error?: string}> => {
  console.log('Getting email logs for user:', userId);
  
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return {
      data: [
        {
          id: '1',
          userId,
          to: 'user@example.com',
          subject: 'Welcome to ICE Guardian',
          sentAt: new Date(Date.now() - 86400000), // 1 day ago
          status: 'delivered'
        },
        {
          id: '2',
          userId,
          to: 'user@example.com',
          subject: 'Your monthly report',
          sentAt: new Date(Date.now() - 172800000), // 2 days ago
          status: 'opened'
        }
      ],
      error: undefined
    };
  }
  
  try {
    const response = await fetch(`/api/email-logs?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email logs');
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching email logs:', error);
    return { 
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch email logs'
    };
  }
};
