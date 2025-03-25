
// Mock firebase service
console.log('Using mock Firebase implementation');

export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Return an unsubscribe function
    return { unsubscribe: () => {} };
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    return { user: { uid: 'mock-uid', email } };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    return { user: { uid: 'mock-uid', email } };
  },
  signOut: async () => {},
  updateProfile: async (user: any, profile: any) => {}
};
