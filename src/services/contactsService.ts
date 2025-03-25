
import { getEnvVar } from '@/utils/environment';

// Define the contact submission interface
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  userId?: string;
}

// Submit a contact form
export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  console.log('Submitting contact form:', data);

  // In development, just log the submission
  if (getEnvVar('NODE_ENV') === 'development') {
    console.log('Contact form submitted:', data);
    return { success: true };
  }

  try {
    // In production, this would send the data to an API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to submit contact form' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit contact form' 
    };
  }
}
