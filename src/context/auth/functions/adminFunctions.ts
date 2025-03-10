
import { User } from '../types';
import { determineUserRole } from '../utils';
import { auth } from '../../../services/firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from '../../../services/firebase/config';

// Initialize Firebase Admin capabilities
const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);
const usersCollection = collection(db, 'users');

// Get all users function (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  try {
    console.log('Fetching all users');
    
    // For Firebase, we'd need to use a custom collection to store user metadata
    // This is just a basic implementation - in a real app, you'd need to sync this with auth users
    const snapshot = await getDocs(usersCollection);
    
    const users: User[] = [];
    snapshot.forEach(doc => {
      const userData = doc.data();
      users.push({
        uid: doc.id,
        id: doc.id,
        email: userData.email,
        name: userData.name || userData.email?.split('@')[0],
        displayName: userData.displayName || userData.email?.split('@')[0],
        role: userData.role || determineUserRole(userData.email || ''),
        profileCompleted: !!userData.displayName,
        language: userData.language || 'en',
        lastLogin: userData.lastLogin,
        createdAt: userData.createdAt,
      });
    });
    
    return users;
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};

// Update user role function (admin only)
export const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
  try {
    console.log(`Updating user ${userId} role to ${newRole}`);
    
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, { role: newRole });
    
    console.log(`User ${userId} role updated to ${newRole}`);
  } catch (error) {
    console.error('Update role error:', error);
    throw error;
  }
};

// Delete user function (admin only)
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    console.log('Deleting user:', userId);
    
    // Note: In a real app, you would need to use Firebase Admin SDK
    // to delete the actual auth user. This just removes the metadata.
    const userRef = doc(usersCollection, userId);
    await deleteDoc(userRef);
    
    console.log('User deleted:', userId);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
