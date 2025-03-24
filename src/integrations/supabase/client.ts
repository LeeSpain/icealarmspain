
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { toast } from '@/hooks/use-toast';
import { getEnvVar, getRequiredEnvVar, isDevelopment, isProduction } from '@/utils/environment';
import { showErrorToast } from '@/utils/error-handler';

// Create a single supabase client for interacting with your database
// Ensure the environment variables are properly accessed
const supabaseUrl = isDevelopment() 
  ? getEnvVar('VITE_SUPABASE_URL', '') 
  : getRequiredEnvVar('VITE_SUPABASE_URL');

const supabaseAnonKey = isDevelopment()
  ? getEnvVar('VITE_SUPABASE_ANON_KEY', '')
  : getRequiredEnvVar('VITE_SUPABASE_ANON_KEY');

// Log the URL and key for debugging (only in development)
if (isDevelopment()) {
  console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Undefined');
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Undefined');
}

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

// Create a mock client that provides stub methods to prevent runtime errors
const createMockClient = () => {
  // Only show warning in development mode
  if (isDevelopment()) {
    console.warn('Creating mock Supabase client. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file for full functionality.');
  }
  
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

// Initialize supabase client based on environment variables
let supabase;
try {
  // Only create the real client if URL and key are defined
  if (supabaseUrl && supabaseAnonKey) {
    // Create the Supabase client with proper typing and configuration based on environment
    supabase = createClient<Database>(
      supabaseUrl, 
      supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          storage: localStorage,
          autoRefreshToken: true,
        },
        global: {
          // Add custom error handling to all Supabase operations
          fetch: (url, options) => {
            // Add custom headers or handling for all requests here if needed
            return fetch(url, options);
          },
        },
        // Set up retry logic for network failures
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      }
    );

    // Perform a test query to validate connection
    if (!isDevelopment()) {
      supabase.from('profiles').select('count', { count: 'exact', head: true })
        .then(({ error }) => {
          if (error) {
            console.error('Supabase connection test failed:', error.message);
            // Don't show toast in production as this happens during initialization
            if (!isProduction()) {
              toast({
                title: "Database Connection Warning",
                description: "Unable to connect to the database. Some features may not work correctly.",
                variant: "destructive",
              });
            }
          }
        });
    }
  } else {
    // Don't use mock client in production
    if (isProduction()) {
      throw new Error('Supabase configuration is required in production');
    }
    supabase = createMockClient();
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  
  // In development, use a mock client, but in production this is a critical error
  if (isProduction()) {
    // In production, this is a serious error that should prevent the app from working
    throw new Error('Fatal: Could not initialize Supabase client in production');
  }
  
  supabase = createMockClient();
  
  // Show a toast notification about the Supabase initialization failure
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      toast({
        title: "Supabase Connection Error",
        description: "Could not connect to the database. Some features may be unavailable.",
        variant: "destructive",
      });
    }, 1000);
  }
}

export { supabase };

/**
 * Generic wrapper for Supabase operations with consistent error handling
 */
export async function supabaseOperation<T = any>(
  operation: () => Promise<{ data: T | null; error: any }>,
  options: {
    errorMessage?: string;
    showToast?: boolean;
    context?: string;
  } = {}
) {
  const { errorMessage = 'Operation failed', showToast = true, context = 'Database' } = options;

  try {
    const { data, error } = await operation();
    
    if (error) {
      if (showToast) {
        showErrorToast(error, context);
      } else {
        console.error(`${context} error:`, error);
      }
      return { data: null, error, success: false };
    }
    
    return { data, error: null, success: true };
  } catch (err) {
    if (showToast) {
      showErrorToast(err, context);
    } else {
      console.error(`${context} exception:`, err);
    }
    return { data: null, error: err, success: false };
  }
}

// Add a custom method to handle contact submissions since it's not in the generated types
export const createContactSubmission = async (submission: ContactSubmission) => {
  // Check if we have a real Supabase client or are using the mock
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Cannot submit contact form: Supabase not configured');
    return { 
      data: null, 
      error: new Error('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'),
      success: false
    };
  }
  
  return supabaseOperation(
    () => (supabase as any).from('contact_submissions').insert(submission),
    { 
      errorMessage: 'Failed to submit contact form', 
      context: 'Contact Form' 
    }
  );
};
