
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Initialize the Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or service role key");
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
