
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5MDE0MTgsImV4cCI6MjAxNzQ3NzQxOH0.x2aBgH7-YzwJQR_f9qASYwYpYzHGFUWTMjBPO3-XNDE';

// Create supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
