
interface Window {
  appLoaded?: boolean;
  appStarted?: boolean;
  appComponentMounted?: boolean;
  recoveryAttempted?: boolean;
  forceAppVisibility?: () => void;
  
  // Define loading stages with proper types - allow any stage name
  loadingStages?: Record<string, boolean>;
  renderingStages?: Record<string, boolean>;
}
