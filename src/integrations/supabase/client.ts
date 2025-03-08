
import { createClient } from '@supabase/supabase-js';

// Get environment variables with consistent fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzA3NTUsImV4cCI6MjAxNzQ3NzQxOH0.OiUF4dlIDYlWIv-7B9ry3YNAaj-0HHe4XnUIiasjuno';

// Debug the client creation
console.log("Creating Supabase client with:", { 
  supabaseUrl: supabaseUrl ? "URL exists" : "URL missing",
  supabaseAnonKey: supabaseAnonKey ? "Key exists" : "Key missing" 
});

// Create supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client created successfully");
