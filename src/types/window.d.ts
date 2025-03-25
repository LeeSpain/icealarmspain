
interface Window {
  // Build verification properties
  buildVerified?: boolean;
  buildInfo?: {
    timestamp: string;
    environment: string;
    firebaseConfigComplete: boolean;
  };
  
  // App state flags
  appRendered?: boolean;
  appRenderFailed?: boolean;
  missingFirebaseConfig?: boolean;
  renderApp?: () => void;
  
  // Diagnostics
  appDiagnostics?: {
    startTime: string;
    events: Array<{time: string; event: string}>;
    errors: Array<{time: string; error: string}>;
    renderAttempted?: boolean;
    environment?: string;
    firebaseConfigValid?: boolean;
    renderCompleted?: boolean;
    renderTime?: string | null;
    secondAttempt?: boolean;
  };
}
