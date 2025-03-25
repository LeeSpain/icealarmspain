
import { getEnvVar } from '@/utils/environment';

// Define the contact submission interface
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  userId?: string;
}

// Define the emergency contact interface
export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  priority: 'primary' | 'secondary' | 'tertiary';
  notificationPreferences: {
    sms: boolean;
    email: boolean;
    call: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
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

// Get contacts for a user
export async function getContacts(userId: string): Promise<EmergencyContact[]> {
  console.log('Getting contacts for user:', userId);
  
  // In development, return mock data
  if (getEnvVar('NODE_ENV') === 'development') {
    return [
      {
        id: '1',
        userId,
        name: 'John Doe',
        relationship: 'Family',
        phone: '555-123-4567',
        email: 'john@example.com',
        priority: 'primary',
        notificationPreferences: {
          sms: true,
          email: true,
          call: true,
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        userId,
        name: 'Jane Smith',
        relationship: 'Friend',
        phone: '555-765-4321',
        priority: 'secondary',
        notificationPreferences: {
          sms: true,
          email: false,
          call: true,
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  
  try {
    const response = await fetch(`/api/contacts?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

// Add a new contact
export async function addContact(contact: Omit<EmergencyContact, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; id?: string; error?: string }> {
  console.log('Adding contact:', contact);
  
  // In development, just log and return success
  if (getEnvVar('NODE_ENV') === 'development') {
    console.log('Contact added (mock):', contact);
    return { success: true, id: `mock-${Date.now()}` };
  }
  
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to add contact' };
    }
    
    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error adding contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to add contact' };
  }
}

// Update a contact
export async function updateContact(id: string, contact: Partial<EmergencyContact>): Promise<{ success: boolean; error?: string }> {
  console.log('Updating contact:', id, contact);
  
  // In development, just log and return success
  if (getEnvVar('NODE_ENV') === 'development') {
    console.log('Contact updated (mock):', id, contact);
    return { success: true };
  }
  
  try {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to update contact' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update contact' };
  }
}

// Delete a contact
export async function deleteContact(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('Deleting contact:', id);
  
  // In development, just log and return success
  if (getEnvVar('NODE_ENV') === 'development') {
    console.log('Contact deleted (mock):', id);
    return { success: true };
  }
  
  try {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to delete contact' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete contact' };
  }
}

// Test an alert to a contact
export async function testAlert(contactId: string, alertType: string): Promise<{ success: boolean; error?: string }> {
  console.log('Testing alert:', contactId, alertType);
  
  // In development, just log and return success
  if (getEnvVar('NODE_ENV') === 'development') {
    console.log('Alert tested (mock):', contactId, alertType);
    return { success: true };
  }
  
  try {
    const response = await fetch('/api/test-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, alertType }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to test alert' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error testing alert:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to test alert' };
  }
}
