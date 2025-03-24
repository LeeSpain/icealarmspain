
# Troubleshooting Guide for Ice Guardian Alert

This document provides solutions for common issues encountered when building, deploying, or running the Ice Guardian Alert application.

## Blank Screen / Loading Stuck Issues

If you encounter a blank screen or the loading message doesn't disappear:

### 1. Check Environment Variables

Missing environment variables are the most common cause of blank screens in production:

```bash
# Verify that all required variables are set in your environment file
cat .env.production

# Required variables:
# - VITE_FIREBASE_API_KEY
# - VITE_FIREBASE_AUTH_DOMAIN
# - VITE_FIREBASE_PROJECT_ID
# - VITE_FIREBASE_STORAGE_BUCKET
# - VITE_FIREBASE_MESSAGING_SENDER_ID
# - VITE_FIREBASE_APP_ID
```

### 2. Try the Debug Build

Use the debug build option to get more verbose logging:

```bash
npm run build:debug
```

This adds additional console logging and enables the `VITE_DEBUG_BUILD` flag.

### 3. Check Console Logs

Open your browser's developer tools (F12) and check the console tab for errors.

Common error patterns:
- "Firebase not initialized" - Environment variables issue
- "ChunkLoadError" - Build configuration issue
- "TypeError: Cannot read property of undefined" - Initialization sequence issue

### 4. Verify the Build Output

Inspect the generated build files:

```bash
# Check the main JavaScript bundle
ls -la dist/assets/*.js

# Ensure index.html was generated properly
cat dist/index.html
```

Look for any missing scripts or malformed HTML.

### 5. Test with a Local Server

Test the build locally before deploying:

```bash
npx serve dist
```

Visit http://localhost:3000 and check if the application works correctly.

## Environment Variable Issues

If your environment variables aren't being injected correctly:

1. Make sure all variables in `.env.production` start with `VITE_` for client-side use
2. Verify that the deploy script is correctly copying the environment file
3. Check for any syntax errors in your environment files (no spaces around = signs)

## Firebase Configuration Issues

If Firebase isn't initializing:

1. Verify your Firebase project is properly set up in the Firebase console
2. Check that the web app is registered and the configuration matches your environment variables
3. Test authentication with a minimal Firebase example to confirm your credentials work

## Build Process Issues

If the build process fails:

1. Clear the cache and node modules:
```bash
rm -rf node_modules/.vite
npm cache clean --force
rm -rf node_modules
npm install
```

2. Try with the --force flag:
```bash
vite build --force
```

3. Check for TypeScript errors:
```bash
npx tsc --noEmit
```

## React Rendering Issues

If React isn't rendering properly:

1. Check that the root element exists in the DOM
2. Verify that ReactDOM.createRoot is being called correctly
3. Look for errors during React initialization in the console

## Deployment Checklist

Before deploying, always:

1. Run `npm run build` locally and test with `npx serve dist`
2. Verify all required environment variables are set
3. Check for any TypeScript or ESLint errors
4. Review the console for warnings or errors
5. Test critical paths in the application

## Getting Help

If you're still experiencing issues:

1. Capture the full console output with errors
2. Note which environment you're deploying to
3. Document the steps to reproduce the issue
4. Share the build logs if available

