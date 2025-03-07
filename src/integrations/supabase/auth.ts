
import { supabase } from './client';

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

// Sign out
export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Get current session
export const getSession = async () => {
  return await supabase.auth.getSession();
};

// Get current user
export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Update user profile
export const updateUserProfile = async (userData: any) => {
  return await supabase.auth.updateUser({
    data: userData
  });
};

// Set session data
export const setSession = async (accessToken: string, refreshToken: string) => {
  return await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });
};

// Reset password
export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
};

// Update password
export const updatePassword = async (newPassword: string) => {
  return await supabase.auth.updateUser({
    password: newPassword
  });
};
