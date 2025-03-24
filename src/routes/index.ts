
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

// Add a debug log to check routes loading
console.log("Routes loaded:", { 
  mainCount: mainRoutes.length,
  dashboardCount: dashboardRoutes.length, 
  adminCount: adminRoutes.length,
  callCenterCount: callCenterRoutes.length,
  totalCount: mainRoutes.length + dashboardRoutes.length + adminRoutes.length + callCenterRoutes.length
});
