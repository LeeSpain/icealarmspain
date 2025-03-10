
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase URL and anon key from the project
const supabaseUrl = 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzA3NTUsImV4cCI6MjA1NjYwNjc1NX0.OiUF4dlIDYlWIv-7B9ry3YNAaj-0HHe4XnUIiasjuno';

// Debug the client creation
console.log("Creating Supabase client with:", { 
  supabaseUrl,
  supabaseAnonKey: supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + "..." : "Key missing" 
});

// Create supabase client with enhanced options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token', // Explicit storage key
    flowType: 'implicit' // Use implicit flow for simpler auth
  }
});

console.log("Supabase client created successfully");

// Add a helper function to check Supabase connectivity
export const testSupabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase.from('health_check').select('count').maybeSingle();
    
    if (error) {
      console.error("Supabase connection test failed:", error.message);
      return false;
    }
    
    console.log("Supabase connection test successful");
    return true;
  } catch (e) {
    console.error("Supabase connection test threw an error:", e);
    return false;
  }
};

// Helper function to check if Supabase is available without blocking
export const isFunctional = async () => {
  try {
    const { error } = await supabase.auth.getSession();
    return !error;
  } catch (e) {
    console.error("Supabase availability check failed:", e);
    return false;
  }
};
