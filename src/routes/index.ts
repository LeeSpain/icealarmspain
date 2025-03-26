
import { RouteConfig } from './types';
import { mainRoutes } from './mainRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { adminRoutes } from './adminRoutes';
import { callCenterRoutes } from './callCenterRoutes';

// Ensure home route gets priority by placing mainRoutes first
export const routes: RouteConfig[] = [
  ...mainRoutes,
  ...dashboardRoutes,
  ...adminRoutes,
  ...callCenterRoutes
];

// Export individual route groups as well for direct access
export {
  mainRoutes,
  dashboardRoutes,
  adminRoutes,
  callCenterRoutes
};
