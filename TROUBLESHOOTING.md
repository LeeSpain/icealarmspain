
# Troubleshooting Guide for Ice Guardian Alert

This document provides solutions for common issues encountered when building, deploying, or running the Ice Guardian Alert application.

## Blank Screen / Loading Stuck Issues

If you encounter a blank screen or the loading message doesn't disappear:

### 1. Check Environment Variables

Missing environment variables are the most common cause of blank screens in production:

```bash
# Required variables for Firebase:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 2. Vercel Deployment Instructions

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Ice Guardian Alert project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" section
5. Add both required variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
6. Click "Save" and redeploy your application

### 3. Check Browser Console

Open your browser's developer tools (F12) and check the console tab for errors.

Common error patterns:
- "Firebase not initialized" - Environment variables issue
- "ChunkLoadError" - Build configuration issue
- "TypeError: Cannot read property of undefined" - Initialization sequence issue

### 4. Clear Cache and Try Again

Sometimes browser caching can cause issues with new deploys:

1. Clear your browser cache (Ctrl+Shift+Delete or ⌘+Shift+Delete on Mac)
2. Try loading the site in an incognito/private browsing window
3. Try a different browser entirely

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

## Getting Help

If you're still experiencing issues:

1. Capture the full console output with errors
2. Note which environment you're deploying to
3. Document the steps to reproduce the issue
4. Contact support at support@iceguardian.com
