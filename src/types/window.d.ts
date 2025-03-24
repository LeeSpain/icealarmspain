
interface Window {
  missingFirebaseConfig?: boolean;
  appRendered?: boolean;
  appRenderFailed?: boolean;
  renderApp?: () => void;
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
