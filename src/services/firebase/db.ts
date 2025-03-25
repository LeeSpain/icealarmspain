
// Mock database service
import { User } from '@/context/auth/types';

export const createUserProfile = async (user: User): Promise<void> => {
  console.log('Creating user profile in mock DB:', user);
  return Promise.resolve();
};

export const getUserProfile = async (uid: string): Promise<any | null> => {
  console.log('Getting user profile from mock DB:', uid);
  return {
    name: 'Mock User',
    displayName: 'Mock User',
    role: 'user',
    status: 'active',
    profileCompleted: true,
    language: 'en',
  };
};
