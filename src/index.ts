
// Import build verification first for better diagnostics
import './utils/build-verification';

// Import our new enhanced renderer rescue utility FIRST
import './utils/renderer-rescue';

// Import startup recovery - ONLY this one recovery utility
import './utils/startup-recovery';

// This file is a simple entry point for easier imports
export * from './App';
