
import { createClient } from '@supabase/supabase-js';

// Get environment variables with consistent fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzA3NTUsImV4cCI6MjAxNzQ3NzQxOH0.OiUF4dlIDYlWIv-7B9ry3YNAaj-0HHe4XnUIiasjuno';

// Debug the client creation
console.log("Creating Supabase client with:", { 
  supabaseUrl,
  supabaseAnonKey: supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + "..." : "Key missing" 
});

// Create supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

console.log("Supabase client created successfully");

// Test the supabase connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Supabase auth event:", event, session ? "Session exists" : "No session");
});

// Export a function to test the connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1);
    if (error) {
      console.error("Supabase connection test failed:", error);
      return false;
    }
    console.log("Supabase connection test succeeded:", data);
    return true;
  } catch (error) {
    console.error("Supabase connection test exception:", error);
    return false;
  }
};

// Run the test
testSupabaseConnection()
  .then(result => console.log("Connection test result:", result))
  .catch(err => console.error("Connection test error:", err));
