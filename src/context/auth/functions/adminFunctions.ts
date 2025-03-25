
import { User } from '../types';
import { determineUserRole } from '../utils';

// Admin functions

// Create a new user (admin only)
export const createUser = async (email: string, password: string, userData: any): Promise<User> => {
  // This is a mock implementation for development
  
  // Check if the current user is an admin
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    throw new Error('Not authenticated');
  }
  
  const currentUser = JSON.parse(storedUser);
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  // Create a new user
  const role = userData.role || determineUserRole(email);
  const devUserId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
  
  const user: User = {
    uid: devUserId,
    id: devUserId,
    email: email,
    name: userData?.displayName || email.split('@')[0],
    displayName: userData?.displayName || email.split('@')[0],
    role,
    status: 'active',
    profileCompleted: !!userData?.displayName,
    language: userData?.language || 'en',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  // In a real implementation, this would save to a database
  console.log('New user created by admin:', user);
  
  return user;
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  // This is a mock implementation for development
  
  // Check if the current user is an admin
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    throw new Error('Not authenticated');
  }
  
  const currentUser = JSON.parse(storedUser);
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  // Return mock users
  return [
    {
      uid: 'dev-admin-1',
      id: 'dev-admin-1',
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
      uid: 'dev-callcenter-1',
      id: 'dev-callcenter-1',
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
      uid: 'dev-member-1',
      id: 'dev-member-1',
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
  // This is a mock implementation for development
  
  // Check if the current user is an admin
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    throw new Error('Not authenticated');
  }
  
  const currentUser = JSON.parse(storedUser);
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  console.log(`User role updated: ${userId} to ${role}`);
};

// Delete user (admin only)
export const deleteUser = async (userId: string): Promise<void> => {
  // This is a mock implementation for development
  
  // Check if the current user is an admin
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    throw new Error('Not authenticated');
  }
  
  const currentUser = JSON.parse(storedUser);
  if (currentUser.role !== 'admin') {
    throw new Error('Not authorized. Admin access required.');
  }
  
  console.log(`User deleted: ${userId}`);
};
