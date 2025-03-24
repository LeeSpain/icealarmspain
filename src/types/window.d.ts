
interface Window {
  missingFirebaseConfig?: boolean;
  appRendered?: boolean;
  appRenderFailed?: boolean;
  renderApp?: () => void;
  buildVerified?: boolean;
  buildInfo?: {
    timestamp: string;
    environment: string;
    firebaseConfigComplete: boolean;
  };
  appDiagnostics?: {
    startTime: string;
    environment?: string;
    firebaseConfigValid?: boolean;
    renderAttempted?: boolean;
    renderCompleted?: boolean;
    renderTime?: string | null;
    secondAttempt?: boolean;
    errors: Array<{time: string, error: string}>;
    events: Array<{time: string, event: string}>;
  };
}

// This makes TypeScript recognize the `import.meta.env` object properly
interface ImportMeta {
  env: {
    MODE: string;
    DEV: boolean;
    PROD: boolean;
    VITE_FIREBASE_API_KEY?: string;
    VITE_FIREBASE_AUTH_DOMAIN?: string;
    VITE_FIREBASE_PROJECT_ID?: string;
    VITE_FIREBASE_STORAGE_BUCKET?: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
    VITE_FIREBASE_APP_ID?: string;
    VITE_FIREBASE_MEASUREMENT_ID?: string;
    VITE_DEBUG_BUILD?: string;
    VITE_ENVIRONMENT?: string;
    VITE_BUILD_TIME?: string;
    VITE_BUILD_ID?: string;
    VITE_ENABLE_MOCK_AUTH?: string;
    [key: string]: any;
  };
}
