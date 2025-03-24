
import { mainRoutes } from './mainRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { adminRoutes } from './adminRoutes';
import { callCenterRoutes } from './callCenterRoutes';

// Export all routes from a central location
export const routes = [
  ...mainRoutes,
  ...dashboardRoutes,
  ...adminRoutes,
  ...callCenterRoutes
];
