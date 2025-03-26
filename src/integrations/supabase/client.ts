
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from '@/hooks/use-toast';
import { getEnvVar, getRequiredEnvVar, isDevelopment, isProduction } from '@/utils/environment';

// Create a single supabase client for interacting with your database
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', '');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', '');

// Log the URL and key for debugging (only in development)
if (isDevelopment()) {
  console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Undefined');
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Undefined');
}

// Create a mock client that provides stub methods to prevent runtime errors
const createMockClient = () => {
  return {
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
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        list: () => Promise.resolve({ data: [], error: null }),
        remove: () => Promise.resolve({ data: null, error: null }),
      }),
    },
    rpc: () => Promise.resolve({ data: null, error: null }),
  };
};

// Initialize supabase client - ALWAYS fall back to mock client if anything fails
let supabase;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true },
    });
  } else {
    supabase = createMockClient();
  }
} catch (error) {
  console.error('Failed to initialize Supabase client, using mock instead:', error);
  supabase = createMockClient();
}

export { supabase };

// Simplified operation wrapper that never throws exceptions
export async function supabaseOperation<T = any>(
  operation: () => Promise<{ data: T | null; error: any }>,
  options: { errorMessage?: string; showToast?: boolean; context?: string } = {}
) {
  try {
    const { data, error } = await operation();
    if (error) {
      console.error(`${options.context || 'Database'} error:`, error);
      return { data: null, error, success: false };
    }
    return { data, error: null, success: true };
  } catch (err) {
    console.error(`${options.context || 'Database'} exception:`, err);
    return { data: null, error: err, success: false };
  }
}

export const createContactSubmission = async (submission: any) => {
  return supabaseOperation(
    () => (supabase as any).from('contact_submissions').insert(submission),
    { context: 'Contact Form' }
  );
};
