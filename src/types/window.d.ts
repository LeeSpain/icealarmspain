
interface Window {
  appLoaded?: boolean;
  appStarted?: boolean;
  appComponentMounted?: boolean;
  recoveryAttempted?: boolean;
  forceAppVisibility?: () => void;
  
  // Define loading stages with proper types - accept any string key for flexibility
  loadingStages?: Record<string, boolean>;
  renderingStages?: Record<string, boolean>;
}
