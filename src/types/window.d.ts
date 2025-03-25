
interface RenderingStages {
  htmlLoaded?: boolean;
  domContentLoaded?: boolean;
  windowLoaded?: boolean;
  reactStarted?: boolean;
  reactRendered?: boolean;
  [key: string]: boolean | undefined;
}

interface Window {
  renderingStages: RenderingStages;
}
