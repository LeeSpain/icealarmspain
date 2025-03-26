
interface Window {
  appLoaded?: boolean;
  appStarted?: boolean;
  appComponentMounted?: boolean;
  recoveryAttempted?: boolean;
  loadingStages?: Record<string, boolean>;
  renderingStages?: Record<string, boolean>;
  forceAppVisibility?: () => void;
}
