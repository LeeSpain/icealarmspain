
import { createClient } from '@supabase/supabase-js';

// Use explicit fallback values that are guaranteed to work
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzA3NTUsImV4cCI6MjA1NjYwNjc1NX0.OiUF4dlIDYlWIv-7B9ry3YNAaj-0HHe4XnUIiasjuno';

// Debug the client creation
console.log("Creating Supabase client with:", { 
  supabaseUrl,
  supabaseAnonKey: supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + "..." : "Key missing" 
});

// Create supabase client (with error handling)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

console.log("Supabase client created successfully");

// Skip the connection test as it might prevent app loading
export const testSupabaseConnection = async () => {
  console.log("Skipping Supabase connection test to prevent blocking app rendering");
  return true;
};

// Add a method to check if Supabase is available without blocking
export const isFunctional = async () => {
  try {
    // Fast non-blocking check
    const { error } = await supabase.from('health_check').select('count').single();
    return !error;
  } catch (e) {
    console.error("Supabase availability check failed:", e);
    return false;
  }
};
