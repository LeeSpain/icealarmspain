
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fagrvwgaajajhvygffea.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ3J2d2dhYWphamh2eWdmZmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMzA3NTUsImV4cCI6MjA1NjYwNjc1NX0.OiUF4dlIDYlWIv-7B9ry3YNAaj-0HHe4XnUIiasjuno';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
