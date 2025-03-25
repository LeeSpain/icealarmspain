
import { User } from '../types';
import { isMockAuthEnabled } from '@/utils/environment';

// Get all users (admin function)
export const getAllUsers = async (): Promise<User[]> => {
  console.log('Admin getting all users');
  
  try {
    if (isMockAuthEnabled()) {
      // In development, return mock users
      return [
        {
          uid: '12345',
          id: '12345',
          email: 'admin@example.com',
          name: 'Admin User',
          displayName: 'Admin User',
          role: 'admin',
          profileCompleted: true,
          status: 'active'
        },
        {
          uid: '67890',
          id: '67890',
          email: 'member@example.com',
          name: 'Test User',
          displayName: 'Test User',
          role: 'member',
          profileCompleted: true,
          status: 'active'
        }
      ];
    } else {
      // In a real app, this would fetch users from Firebase Admin SDK
      console.log('Get all users not implemented in production mode');
      return [];
    }
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};

// Update a user's role (admin function)
export const updateUserRole = async (userId: string, role: string): Promise<void> => {
  console.log('Admin updating user role:', userId, role);
  
  try {
    if (isMockAuthEnabled()) {
      console.log('Mock user role updated:', userId, role);
      return;
    } else {
      // In a real app, this would update the user's role in Firebase Admin SDK
      console.log('Update user role not implemented in production mode');
    }
  } catch (error) {
    console.error('Update user role error:', error);
    throw error;
  }
};

// Delete a user (admin function)
export const deleteUser = async (userId: string): Promise<void> => {
  console.log('Admin deleting user:', userId);
  
  try {
    if (isMockAuthEnabled()) {
      console.log('Mock user deleted:', userId);
      return;
    } else {
      // In a real app, this would delete the user in Firebase Admin SDK
      console.log('Delete user not implemented in production mode');
    }
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
