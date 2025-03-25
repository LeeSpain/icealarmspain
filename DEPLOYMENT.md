
# Deployment Instructions

This document contains information on how to deploy the Ice Guardian Alert application to various environments.

## Prerequisites

- Node.js 16+ and npm
- Access to the Firebase console for the deployment target
- Environment variable files (.env.development, .env.staging, .env.production)

## Environment Variables

The application requires the following environment variables to be set:

### Required for all environments:
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_ENVIRONMENT` - One of: development, staging, production

### Optional:
- `VITE_SUPABASE_URL` - Supabase URL (if using Supabase)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (if using Supabase)
- `VITE_AUTH_REDIRECT_URL` - URL to redirect to after authentication
- `VITE_API_URL` - API URL for backend services
- `VITE_ENABLE_MOCK_AUTH` - Enable mock authentication (true/false)
- `VITE_ENABLE_ANALYTICS` - Enable analytics (true/false)
- `VITE_DEBUG_BUILD` - Enable extra debugging (true/false)

## Lovable Deployment

When deploying with Lovable:

1. Go to the project settings in Lovable
2. Navigate to the "Environment Variables" section
3. Ensure all required environment variables are set for production
4. Click "Publish" to deploy your application

## Troubleshooting Deployment Issues

### Blank Screen After Deployment

If the application shows a blank screen after deployment, check the following:

1. **Environment Variables**:
   - Ensure all required environment variables are set in the production environment.
   - In Lovable, check Project Settings > Environment Variables.

2. **Console Errors**:
   - Check the browser console for JavaScript errors.
   - Common issues include missing environment variables or API connectivity problems.

3. **Network Issues**:
   - Check the Network tab in browser dev tools to see if any requests are failing.
   - Verify that APIs and services are accessible from the deployed environment.

4. **Debug Build**:
   - Try enabling the debug build by setting `VITE_DEBUG_BUILD=true` in environment variables
   - This adds extra logging and more verbose error messages.

## Post-Deployment Verification

After deploying, always verify:

1. The application loads correctly
2. Authentication works as expected
3. API calls are successful
4. No console errors appear

## Support

If deployment issues persist, contact the development team with:
- Environment name
- Build command used
- Console error logs
- Network request logs
- Build output logs

