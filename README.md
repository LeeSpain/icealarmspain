
# ICE Alarm España

Emergency alert system for Spain.

## Authentication Setup

The application uses Firebase Authentication. You can set up your project with either:

1. **Development Mode (Default)**: Uses a mock authentication system
2. **Production Mode**: Uses real Firebase Authentication

### Setting Up Production Authentication

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in the Firebase console
3. Add the following environment variables to your `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. If the environment variables are present, the app will automatically use real Firebase Authentication.

### Default Test Users (Development Mode Only)

- Admin: admin@icealarm.es / admin123
- Member: member@icealarm.es / member123
- Call Center: agent@icealarm.es / agent123

## Running the Application

```
npm install
npm run dev
```

## Building for Production

```
npm run build
```

## Deployment

After building, you can deploy the contents of the `dist` folder to your hosting provider.
