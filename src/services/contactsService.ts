
import { supabase, supabaseOperation } from '@/integrations/supabase/client';
import { Contact, TestResult, AlertType } from "@/components/emergency-contacts/types";
import { getEnvVar, isProduction } from '@/utils/environment';

/**
 * Fetches emergency contacts for the current user
 */
export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .select('*')
    .order('is_primary', { ascending: false })
    .order('created_at', { ascending: true });
    
  if (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
  
  return data || [];
}

/**
 * Adds a new emergency contact
 */
export async function addContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
  const { data, error, success } = await supabaseOperation(
    () => supabase.from('emergency_contacts').insert(contact).select('*').single(),
    { context: 'Emergency Contacts' }
  );
  
  if (!success || error || !data) {
    throw error || new Error('Failed to add contact');
  }
  
  return data as Contact;
}

/**
 * Updates an existing emergency contact
 */
export async function updateContact(id: string, updatedContact: Partial<Contact>): Promise<Contact> {
  const { data, error, success } = await supabaseOperation(
    () => supabase
      .from('emergency_contacts')
      .update({ ...updatedContact, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single(),
    { context: 'Emergency Contacts' }
  );
  
  if (!success || error || !data) {
    throw error || new Error('Failed to update contact');
  }
  
  return data as Contact;
}

/**
 * Deletes an emergency contact
 */
export async function deleteContact(id: string): Promise<void> {
  const { error, success } = await supabaseOperation(
    () => supabase.from('emergency_contacts').delete().eq('id', id),
    { context: 'Emergency Contacts' }
  );
  
  if (!success || error) {
    throw error || new Error('Failed to delete contact');
  }
}

/**
 * Sends a test alert to specified emergency contacts
 */
export async function testAlert(
  alertType: AlertType, 
  contactIds: string[]
): Promise<TestResult> {
  try {
    // In development, mock the alert test
    if (!isProduction()) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get contact details to return recipient information
      const { data: contacts } = await supabase
        .from('emergency_contacts')
        .select('name')
        .in('id', contactIds);
      
      const recipients = contacts?.map(c => c.name) || [];
      
      // Create a proper TestResult matching the type definition
      return {
        id: Math.random().toString(36).substring(2, 9),
        success: true,
        timestamp: new Date(),
        type: alertType,
        recipients,
        errorMessage: undefined
      };
    }
    
    // In production, use the real API
    const apiUrl = getEnvVar('VITE_API_URL', '') + '/api/alert/test';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alertType,
        contactIds,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send test alert');
    }
    
    const result = await response.json();
    // Ensure timestamp is a Date object and properly convert the response
    return {
      ...result,
      timestamp: new Date(result.timestamp),
      type: result.type || alertType, // Ensure type is set
    };
  } catch (error) {
    console.error('Error testing alert:', error);
    return {
      id: Math.random().toString(36).substring(2, 9),
      success: false,
      timestamp: new Date(),
      type: alertType,
      recipients: [],
      errorMessage: error.message || 'Failed to send test alert'
    };
  }
}
