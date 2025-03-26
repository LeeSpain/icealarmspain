
interface Window {
  appLoaded?: boolean;
  appStarted?: boolean;
  loadingStages?: {
    htmlLoaded: boolean;
    mainScriptStarted: boolean;
    reactInitialized: boolean;
    appRendered: boolean;
  };
  renderingStages?: {
    mainStarted: boolean;
    rootCreated: boolean;
    appMounted: boolean;
    appRendered: boolean;
  };
}
