
# Deployment Guide for Ice Guardian Alert

This document contains detailed instructions for deploying the Ice Guardian Alert application to Vercel and other hosting platforms.

## Required Environment Variables

The following environment variables **MUST** be set in your deployment environment:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

These values can be found in your Firebase project settings in the Firebase console.

## Deployment Instructions for Vercel

1. Go to your Vercel dashboard and select your project
2. Navigate to "Settings" tab 
3. Click on "Environment Variables" section
4. Add the following variables:
   - `VITE_FIREBASE_API_KEY`: Your Firebase API key
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
5. Click "Save" to apply the changes
6. Trigger a new deployment from the "Deployments" tab

The values for these environment variables can be found in your local `.env` file or in the Firebase console.

## Common Deployment Issues

### Blank Screen or Loading Message

If you see a loading message that doesn't go away, this is typically caused by missing environment variables. Check that:

1. You've set all required environment variables in your Vercel project settings
2. The values are correct (copied exactly from your Firebase console)
3. You've redeployed the application after setting the variables

### Verifying Environment Variables

To check if your environment variables are being correctly injected:

1. Open the deployed site in a browser
2. Open the browser's developer console (F12 or right-click → Inspect → Console)
3. Look for messages related to Firebase configuration
4. If you see "Firebase config valid: false", your environment variables are not correctly set

## Local Development

For local development, copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
# Then edit the .env file with your values
```

## Getting Help

If you continue to experience deployment issues, please contact the development team with:

1. The URL of your deployment
2. Screenshots of any error messages
3. Console logs from the browser developer tools

