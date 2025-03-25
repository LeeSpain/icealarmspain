
import { getCurrentUser, signUp as createNewUser } from '@/services/auth';
import { User } from '../types';

// Create a new user (admin only)
export const createUser = async (email: string, password: string, userData: any): Promise<User> => {
  // Check if the current user is an admin
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  // Create a new user
  const result = await createNewUser(email, password, userData);
  
  if (result.error) {
    throw result.error;
  }
  
  if (!result.user) {
    throw new Error('Failed to create user');
  }
  
  console.log('New user created by admin:', result.user);
  
  return result.user;
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  // Check if the current user is an admin
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  // Return mock users
  return [
    {
      uid: 'user-admin-icealarm-es',
      id: 'user-admin-icealarm-es',
      email: 'admin@icealarm.es',
      name: 'Admin User',
      displayName: 'Admin User',
      role: 'admin',
      status: 'active',
      profileCompleted: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      uid: 'user-callcenter-icealarm-es',
      id: 'user-callcenter-icealarm-es',
      email: 'callcenter@icealarm.es',
      name: 'Call Center Agent',
      displayName: 'Call Center Agent',
      role: 'callcenter',
      status: 'active',
      profileCompleted: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      uid: 'user-user-example-com',
      id: 'user-user-example-com',
      email: 'user@example.com',
      name: 'Regular User',
      displayName: 'Regular User',
      role: 'member',
      status: 'active',
      profileCompleted: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  ];
};

// Update user role (admin only)
export const updateUserRole = async (userId: string, role: string): Promise<void> => {
  // Check if the current user is an admin
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  console.log(`User role updated: ${userId} to ${role}`);
};

// Delete user (admin only)
export const deleteUser = async (userId: string): Promise<void> => {
  // Check if the current user is an admin
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  console.log(`User deleted: ${userId}`);
};
