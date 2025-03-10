
import { createClient } from '@supabase/supabase-js';
import { supabase } from './client';
import type { Database } from './types';

// Re-export the supabase instance
export { supabase };

// Export auth-related types
export type {
  User,
  Session,
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  AuthUser,
} from '@supabase/supabase-js';
