
import MainRoutes from './mainRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { adminRoutes } from './adminRoutes';
import { callCenterRoutes } from './callCenterRoutes';

// Export all routes from a central location
export const routes = [
  MainRoutes,
  ...dashboardRoutes,
  ...adminRoutes,
  ...callCenterRoutes
];
