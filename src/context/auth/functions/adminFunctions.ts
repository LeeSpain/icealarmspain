
import { User } from '../types';
import { isMockAuthEnabled } from '@/utils/environment';

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  // Mock implementation for development
  if (isMockAuthEnabled()) {
    return [
      {
        uid: '12345',
        id: '12345',
        email: 'admin@example.com',
        name: 'Admin User',
        displayName: 'Admin User',
        role: 'admin',
        profileCompleted: true,
        status: 'active',
        language: 'en'
      },
      {
        uid: '67890',
        id: '67890',
        email: 'user@example.com',
        name: 'Regular User',
        displayName: 'Regular User',
        role: 'user',
        profileCompleted: true,
        status: 'active',
        language: 'en'
      }
    ];
  }
  
  // TODO: Implement real API call
  return [];
}

/**
 * Update a user's role (admin only)
 */
export async function updateUserRole(
  userId: string, 
  role: string
): Promise<{ success: boolean; error?: string }> {
  if (isMockAuthEnabled()) {
    console.log(`Mock: Updated user ${userId} to role ${role}`);
    return { success: true };
  }
  
  // TODO: Implement real API call
  return { success: true };
}

/**
 * Delete a user (admin only)
 */
export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  if (isMockAuthEnabled()) {
    console.log(`Mock: Deleted user ${userId}`);
    return { success: true };
  }
  
  // TODO: Implement real API call
  return { success: true };
}
