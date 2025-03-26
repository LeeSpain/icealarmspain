
/**
 * Window interface extensions for our application
 */
interface Window {
  appLoaded?: boolean;
  appStarted?: boolean;
  appComponentMounted?: boolean;
  recoveryAttempted?: boolean;
  forceAppVisibility?: () => void;
  rescueDom?: () => void;
  
  // Define loading stages with proper types
  loadingStages?: Record<string, boolean>;
  renderingStages?: Record<string, boolean>;
}
