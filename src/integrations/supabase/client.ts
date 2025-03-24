
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a single supabase client for interacting with your database
// Ensure the environment variables are properly accessed
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log the URL and key for debugging (remove in production)
console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Undefined');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Undefined');

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

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
