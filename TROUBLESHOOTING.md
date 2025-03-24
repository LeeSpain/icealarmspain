# Troubleshooting Guide for Ice Guardian Alert

This document provides solutions for common issues encountered when building, deploying, or running the Ice Guardian Alert application.

## Blank Screen / Loading Stuck Issues

If you encounter a blank screen or the loading message doesn't disappear:

### 1. Check Environment Variables in Vercel

Missing environment variables are the most common cause of blank screens in production:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Ice Guardian Alert project
3. Click on "Settings" in the top navigation
4. Click on "Environment Variables" in the left sidebar
5. Verify these required variables are set:
   - `VITE_FIREBASE_API_KEY` - Your Firebase API key
   - `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
6. If any are missing, add them with the values from your Firebase project
7. Click "Save" and redeploy your application

### 2. How to Get Your Firebase Configuration Values

If you need to find your Firebase configuration values:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the web app icon (</>) in the Project Overview 
4. Select your app from the list
5. Click on "Config" in the SDK setup options
6. Copy the values from the displayed configuration object:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY", // Use this for VITE_FIREBASE_API_KEY
     projectId: "YOUR_PROJECT_ID", // Use this for VITE_FIREBASE_PROJECT_ID
     // other values...
   };
   ```

### 3. Clear Browser Cache and Try Again

Sometimes browser caching can cause issues with new deploys:

1. Clear your browser cache (Ctrl+Shift+Delete or ⌘+Shift+Delete on Mac)
2. Try loading the site in an incognito/private browsing window
3. Try a different browser entirely

### 4. Check Browser Console for Specific Errors

1. Open your browser's developer tools (F12 or right-click → Inspect)
2. Go to the Console tab
3. Look for error messages:
   - "Firebase not initialized" - Environment variables issue
   - "ChunkLoadError" - Build configuration issue
   - "TypeError: Cannot read property of undefined" - Initialization sequence issue

### 5. Verify Firebase Project Settings

If you're still having issues:

1. Confirm your Firebase project is active
2. Verify that the web app is registered and enabled in the Firebase console
3. Make sure your API key hasn't been rotated or changed

## Common Errors and Solutions

### "Firebase app already exists" Error

This can happen if Firebase is initialized multiple times:

1. Check that you're only importing and initializing Firebase once
2. Look for duplicate imports of the Firebase configuration

### "Missing or insufficient permissions" Error

This indicates a Firebase Authentication or Database permission issue:

1. Check Firebase Console → Authentication → Sign-in methods
2. Ensure all required sign-in methods are enabled
3. Verify Security Rules in Firebase Console if using Firestore or Realtime Database

## Vercel-Specific Deployment Issues

### Environment Variables Not Loading

If your environment variables appear to be set but aren't working:

1. Check for typos in the variable names
2. Make sure you've selected the right environment (Production, Preview, Development)
3. Try redeploying with "Clear cache and redeploy" option

### Cold Start Issues

If the app works after a few refreshes but initially shows a blank screen:

1. Check if there's a long initialization process in your code
2. Consider adding a pre-rendering step to your build process
3. Implement a better loading state that appears immediately

## Getting Help

If you're still experiencing issues:

1. Capture the full console output with errors
2. Take a screenshot of your Vercel environment variables (with sensitive data redacted)
3. Document the steps to reproduce the issue
4. Contact support at support@iceguardian.com
