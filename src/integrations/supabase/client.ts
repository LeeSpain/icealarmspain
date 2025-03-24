
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a single supabase client for interacting with your database
// Ensure the environment variables are properly accessed
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log the URL and key for debugging (remove in production)
console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Undefined');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Undefined');

// Since we don't have Supabase URL and key defined yet, create a mock client
// This prevents errors when the application starts without proper Supabase configuration
let supabase;

// Define contact_submissions table type for TypeScript since it's not in the auto-generated types
export type ContactSubmission = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  user_id?: string | null;
  status?: string;
};

// Only create the real client if URL and key are defined
if (supabaseUrl && supabaseAnonKey) {
  // Create the Supabase client with proper typing
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client that provides stub methods to prevent runtime errors
  console.warn('Creating mock Supabase client. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file for full functionality.');
  supabase = {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signUp: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
  };
}

export { supabase };

// Add a custom method to handle contact submissions since it's not in the generated types
export const createContactSubmission = async (submission: ContactSubmission) => {
  // Check if we have a real Supabase client or are using the mock
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Cannot submit contact form: Supabase not configured');
    return { 
      data: null, 
      error: new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.') 
    };
  }
  
  // Use the generic version of the API without type checking for the contact_submissions table
  const { data, error } = await (supabase as any)
    .from('contact_submissions')
    .insert(submission);
  
  return { data, error };
};
