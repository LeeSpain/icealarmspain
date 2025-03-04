
import { Contact, AlertType, TestResult, TestLog } from '@/components/emergency-contacts/types';

// In-memory storage for development mode
let contacts: Contact[] = [
  {
    id: '1',
    name: 'María García',
    relationship: 'Spouse',
    phone: '+34 612 345 678',
    email: 'maria@example.com',
    priority: 1,
    receivesAlerts: true,
    receivesUpdates: true
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    relationship: 'Son',
    phone: '+34 623 456 789',
    email: 'carlos@example.com',
    priority: 2,
    receivesAlerts: true,
    receivesUpdates: false
  },
  {
    id: '3',
    name: 'Dr. Ana Martínez',
    relationship: 'Doctor',
    phone: '+34 634 567 890',
    email: 'dr.martinez@hospital.es',
    priority: 3,
    receivesAlerts: false,
    receivesUpdates: true
  }
];

let testLogs: TestLog[] = [];

export const getContacts = async (): Promise<Contact[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...contacts];
};

export const addContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString()
  };
  
  contacts.push(newContact);
  return newContact;
};

export const updateContact = async (id: string, updatedContact: Partial<Contact>): Promise<Contact> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  
  // Update contact
  contacts[index] = { ...contacts[index], ...updatedContact };
  return contacts[index];
};

export const deleteContact = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  
  contacts.splice(index, 1);
};

export const testAlert = async (alertType: AlertType, contactIds: string[]): Promise<TestResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate contacts exist
  const selectedContacts = contacts.filter(c => contactIds.includes(c.id));
  if (selectedContacts.length !== contactIds.length) {
    throw new Error('One or more contacts not found');
  }
  
  const timestamp = new Date();
  const success = Math.random() > 0.1; // 90% success rate for demo
  
  // Create test logs for each contact
  selectedContacts.forEach(contact => {
    const deliveryMethod = Math.random() > 0.5 ? 'sms' : 'email';
    testLogs.push({
      contactId: contact.id,
      timestamp: new Date(timestamp),
      alertType,
      delivered: success,
      deliveryMethod,
      message: `Test ${alertType} alert to ${contact.name}`
    });
  });
  
  const result: TestResult = {
    id: `test-${Date.now()}`,
    timestamp: timestamp,
    type: alertType,
    success,
    recipients: selectedContacts.map(c => c.name),
    errorMessage: success ? undefined : 'Simulated test failure'
  };
  
  return result;
};

export const getTestLogs = async (): Promise<TestLog[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...testLogs];
};

