
import { Contact } from '@/components/emergency-contacts/types';
import { getEnvVar } from '@/utils/environment';

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    relationship: 'Family',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
    priority: 1,
    receivesAlerts: true,
    receivesUpdates: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    relationship: 'Friend',
    phone: '555-987-6543',
    email: 'jane.smith@example.com',
    priority: 2,
    receivesAlerts: true,
    receivesUpdates: false
  }
];

// Get all contacts for the current user
export const getContacts = async (): Promise<Contact[]> => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return [...mockContacts];
  }
  
  try {
    const response = await fetch('/api/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

// Add a new contact
export const addContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // For development, return mock data with a generated ID
  if (process.env.NODE_ENV === 'development') {
    const newContact = {
      ...contact,
      id: `mock-${Date.now()}`
    };
    mockContacts.push(newContact);
    return newContact;
  }
  
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  
  if (!response.ok) {
    throw new Error('Failed to add contact');
  }
  
  return await response.json();
};

// Update an existing contact
export const updateContact = async (id: string, updatedData: Partial<Contact>): Promise<Contact> => {
  // For development, update mock data
  if (process.env.NODE_ENV === 'development') {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Contact not found');
    }
    
    const updatedContact = {
      ...mockContacts[index],
      ...updatedData
    };
    
    mockContacts[index] = updatedContact;
    return updatedContact;
  }
  
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  
  return await response.json();
};

// Delete a contact
export const deleteContact = async (id: string): Promise<void> => {
  // For development, remove from mock data
  if (process.env.NODE_ENV === 'development') {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index !== -1) {
      mockContacts.splice(index, 1);
    }
    return;
  }
  
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
};

// Test alert functionality
export const testAlert = async (alertType: 'emergency' | 'medical' | 'activity' | 'all', contactIds: string[]): Promise<{
  id: string;
  success: boolean;
  timestamp: string;
  type: 'emergency' | 'medical' | 'activity' | 'all';
  recipients: string[];
  errorMessage?: string;
}> => {
  // For development, return mock success
  if (process.env.NODE_ENV === 'development') {
    const recipients = mockContacts
      .filter(c => contactIds.includes(c.id))
      .map(c => c.email);
    
    return {
      id: `test-${Date.now()}`,
      success: true,
      timestamp: new Date().toISOString(),
      type: alertType,
      recipients
    };
  }
  
  const response = await fetch('/api/test-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: alertType, contactIds })
  });
  
  if (!response.ok) {
    const error = await response.json();
    return {
      id: `error-${Date.now()}`,
      success: false,
      timestamp: new Date().toISOString(),
      type: alertType,
      recipients: [],
      errorMessage: error.message || 'Failed to send test alert'
    };
  }
  
  return await response.json();
};
