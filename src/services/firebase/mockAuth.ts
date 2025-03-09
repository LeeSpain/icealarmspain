
export class MockAuth {
  currentUser: any = null;
  authStateListeners: Array<(user: any | null) => void> = [];
  persistenceType: string = 'session';
  
  // Mock implementation of onAuthStateChanged
  onAuthStateChanged(callback: (user: any | null) => void) {
    // Add the callback to our listeners array
    this.authStateListeners.push(callback);
    
    // Immediately call the callback with the current user state
    setTimeout(() => callback(this.currentUser), 100);
    
    // Return a function that would normally unsubscribe from the auth state listener
    return () => {
      this.authStateListeners = this.authStateListeners.filter(cb => cb !== callback);
    };
  }
  
  // Mock implementation of signInWithEmailAndPassword
  async signInWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signIn attempt:", email, "Persistence:", this.persistenceType);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Normalize the email to lowercase for case-insensitive comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    // Validate email format
    if (!normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
      console.error("Mock Auth: Invalid email format", normalizedEmail);
      throw new Error("The email address is badly formatted.");
    }
    
    // Special handling for lwakeman@icealarm.es - our primary test account
    if (normalizedEmail === "lwakeman@icealarm.es") {
      console.log("Mock Auth: Attempting login for lwakeman@icealarm.es with password:", password);
      
      // Accept only Arsenal@2025 for this account (strict matching)
      if (password === "Arsenal@2025") {
        console.log("Mock Auth: Special user login successful for lwakeman@icealarm.es");
        
        this.currentUser = {
          uid: 'special-mock-uid-lwakeman-' + Date.now(),
          email: normalizedEmail,
          displayName: 'Lee Wakeman',
          role: 'admin' // Special admin access
        };
        
        // Notify all listeners that the auth state has changed
        this.authStateListeners.forEach(callback => callback(this.currentUser));
        
        return { user: this.currentUser };
      } else {
        console.error("Mock Auth: Login failed for lwakeman@icealarm.es - wrong password:", password);
        throw new Error("The password is invalid or the user does not have a password.");
      }
    }
    
    // Check specific email accounts with the custom password
    const specialAccounts = [
      { email: "lwakeman@icealarm.es", password: "Arsenal@2025" },
      { email: "wakemanlee20@gmail.com", password: "Arsenal@2025" },
      { email: "icealarmespana@gmail.com", password: "Arsenal@2025" }
    ];
    
    // Special access accounts check
    const specialAccount = specialAccounts.find(account => 
      account.email === normalizedEmail && 
      account.password === password
    );
    
    if (specialAccount) {
      console.log("Mock Auth: Special access login successful for", normalizedEmail);
      
      this.currentUser = {
        uid: 'mock-uid-' + normalizedEmail.split('@')[0] + '-' + Date.now(),
        email: normalizedEmail,
        displayName: normalizedEmail.split('@')[0].charAt(0).toUpperCase() + normalizedEmail.split('@')[0].slice(1),
        role: 'admin' // Special accounts get admin role
      };
      
      // Notify all listeners that the auth state has changed
      this.authStateListeners.forEach(callback => callback(this.currentUser));
      
      return { user: this.currentUser };
    }
    
    // Fixed admin credentials - always allow admin@icealarm.es with password admin123
    if (normalizedEmail === "admin@icealarm.es" && password === "admin123") {
      console.log("Mock Auth: Admin login successful");
      
      this.currentUser = {
        uid: 'mock-uid-admin-' + Date.now(),
        email: normalizedEmail,
        displayName: 'Admin User',
        role: 'admin'
      };
      
      // Notify all listeners that the auth state has changed
      this.authStateListeners.forEach(callback => callback(this.currentUser));
      
      return { user: this.currentUser };
    }
    
    // Other test accounts
    else if (
      (normalizedEmail === "member@icealarm.es" && password === "member123") ||
      (normalizedEmail === "agent@icealarm.es" && password === "agent123") || 
      (normalizedEmail.includes('admin') && password === 'admin123') ||
      (normalizedEmail.includes('member') && password === 'member123') ||
      (normalizedEmail.includes('agent') && password === 'agent123') ||
      (normalizedEmail.includes('demo') && password.length >= 6)
    ) {
      console.log("Mock Auth: Test account login successful for", normalizedEmail);
      
      // Create user based on email
      const displayName = normalizedEmail.split('@')[0];
      let role = 'member';
      
      if (normalizedEmail.includes('admin')) role = 'admin';
      else if (normalizedEmail.includes('agent')) role = 'callcenter';
      
      this.currentUser = {
        uid: 'mock-uid-' + Date.now(),
        email: normalizedEmail,
        displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        role: role
      };
      
      // Notify all listeners that the auth state has changed
      this.authStateListeners.forEach(callback => callback(this.currentUser));
      
      return { user: this.currentUser };
    }
    
    // Log the failed attempt
    console.error("Mock Auth: Login failed for", normalizedEmail, "- Invalid credentials");
    
    // Simulate error for invalid credentials
    throw new Error("The password is invalid or the user does not have a password.");
  }
  
  // Mock implementation of createUserWithEmailAndPassword
  async createUserWithEmailAndPassword(email: string, password: string) {
    console.log("Mock signUp:", email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error("The email address is badly formatted.");
    }
    
    // Validate password
    if (password.length < 6) {
      throw new Error("The password must be at least 6 characters long.");
    }
    
    // Simulate existing user error
    if (email.toLowerCase() === "admin@icealarm.es" || email.toLowerCase() === "member@icealarm.es" || email.toLowerCase() === "agent@icealarm.es") {
      throw new Error("The email address is already in use by another account.");
    }
    
    this.currentUser = {
      uid: 'mock-uid-' + Date.now(),
      email: email,
      displayName: '',
    };
    
    // Notify all listeners that the auth state has changed
    this.authStateListeners.forEach(callback => callback(this.currentUser));
    
    return { user: this.currentUser };
  }
  
  // Mock implementation of signOut
  async signOut() {
    console.log("Logging out user:", this.currentUser?.email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    
    // Notify all listeners that the auth state has changed
    this.authStateListeners.forEach(callback => callback(null));
  }
  
  // Mock implementation of updateProfile
  async updateProfile(user: any, profile: { displayName?: string, photoURL?: string }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (user) {
      user.displayName = profile.displayName || user.displayName;
      user.photoURL = profile.photoURL || user.photoURL;
      
      // If this is the current user, update it
      if (this.currentUser && this.currentUser.uid === user.uid) {
        this.currentUser = { ...this.currentUser, ...user };
        
        // Notify all listeners that the auth state has changed
        this.authStateListeners.forEach(callback => callback(this.currentUser));
      }
    }
  }
  
  // Mock implementation of setPersistence
  async setPersistence(persistenceType: string) {
    console.log("Setting mock persistence to:", persistenceType);
    this.persistenceType = persistenceType;
    return Promise.resolve();
  }
}
