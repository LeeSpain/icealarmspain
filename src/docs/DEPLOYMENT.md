
# Deployment Guide for ICE Alarm España

This guide provides detailed steps to deploy the ICE Alarm España application to production environments.

## Prerequisites

- Node.js 16+ and npm installed
- Firebase project created (for authentication)
- Access to your hosting platform of choice (Vercel, Netlify, Firebase Hosting, etc.)

## Pre-Deployment Checklist

Before deploying, ensure the following:

1. **Environment Variables**:
   - Create a `.env` file based on `.env.example`
   - Add all required Firebase credentials
   - Set `VITE_ENVIRONMENT=production`

2. **Build and Test**:
   - Run `npm run build` to create production build
   - Test the production build with `npm run preview`
   - Fix any warnings or errors before proceeding

3. **Performance Check**:
   - Run Lighthouse or PageSpeed Insights to verify performance
   - Address any critical performance issues

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

1. Install Firebase CLI:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Initialize Firebase in your project:
   ```
   firebase init
   ```
   - Select "Hosting"
   - Choose your Firebase project
   - Set "dist" as your public directory
   - Configure as a single-page app (Yes)
   - Set up automatic builds and deploys (optional)

4. Deploy to Firebase:
   ```
   firebase deploy
   ```

### Option 2: Vercel

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

3. Follow the prompts to link to your Vercel account and project.

### Option 3: Netlify

1. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```
   netlify deploy
   ```

3. Or simply drag and drop the `dist` folder to Netlify's dashboard after building.

## Post-Deployment Verification

After deployment, perform these checks:

1. **Authentication**: Verify login/signup works correctly
2. **Navigation**: Test all routes and navigation flows
3. **Forms**: Submit all forms to ensure they work as expected
4. **Payments**: Test payment processes with test cards
5. **Responsive Design**: Check the site on mobile, tablet, and desktop
6. **Cross-Browser**: Verify functionality in Chrome, Firefox, Safari, and Edge

## Monitoring and Updates

1. Set up error monitoring (e.g., Sentry)
2. Configure analytics to track user behavior
3. Schedule regular updates and maintenance

## Troubleshooting

If you encounter issues during deployment:

1. Check the deployment logs on your hosting platform
2. Verify environment variables are correctly set
3. Ensure Firebase configuration matches your project
4. For routing issues, confirm your hosting platform is configured for SPA routing

For further assistance, contact the development team at [your-support-email].
