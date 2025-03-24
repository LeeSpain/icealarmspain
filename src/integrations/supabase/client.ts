
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a single supabase client for interacting with your database
// Ensure the environment variables are properly accessed
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log the URL and key for debugging (remove in production)
console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Undefined');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Undefined');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
