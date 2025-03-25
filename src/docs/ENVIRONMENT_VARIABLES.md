
# Environment Variables for Ice Guardian Alert

This document provides information about the environment variables required for the Ice Guardian Alert application.

## Required Environment Variables

These variables must be set for the application to function properly:

### Firebase Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | No |

## How to Set Environment Variables

### In Lovable

1. Navigate to your project in Lovable
2. Click on **Project Settings** in the sidebar
3. Go to the **Environment Variables** section
4. Add each required variable with its corresponding value
5. Click **Save** to update the environment variables
6. Click **Publish** to deploy the changes

### For Local Development

For local development, you have two options:

1. Create a `.env` file in the project root with the required variables
2. Set the variables directly in your terminal session before running the development server

Example `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

## Troubleshooting

If you see a loading screen that doesn't go away or an error message about missing configuration:

1. Check that all required environment variables are set
2. Verify that the values are correct
3. Make sure you've republished your application after setting the variables
4. Clear your browser cache and try again

For more detailed information, refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) and [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) files.
