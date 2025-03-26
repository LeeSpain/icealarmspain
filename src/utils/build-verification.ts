
// Build verification utility to help diagnose loading issues
console.log("Build verification loaded");

// Create global variables to track loading stages
declare global {
  interface Window {
    loadingStages: Record<string, boolean>;
    renderingStages: Record<string, boolean>;
  }
}

// Initialize tracking objects
window.loadingStages = window.loadingStages || {};
window.renderingStages = window.renderingStages || {};

// Track that the build verification has loaded
window.loadingStages.buildVerificationLoaded = true;

// Log environment information
console.log("Environment:", import.meta.env.MODE);
console.log("Debug build:", import.meta.env.VITE_DEBUG_BUILD === "true");

// Check Firebase configuration
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

if (firebaseApiKey && firebaseProjectId) {
  console.log("Firebase configuration available");
  window.loadingStages.firebaseConfigAvailable = true;
} else {
  console.warn("Firebase configuration incomplete or missing");
  window.loadingStages.firebaseConfigAvailable = false;
}

// Export an empty object to satisfy module requirements
export {};
