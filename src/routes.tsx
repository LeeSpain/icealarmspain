
import React from "react";
import { RouteConfig } from "./routes/types";
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 
import { mainRoutes } from "./routes/mainRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { callCenterRoutes } from "./routes/callCenterRoutes";

// Create a flat array of all routes with direct imports to speed up loading
export const routes: RouteConfig[] = [
  // Home route with highest priority - define first for cleaner code organization
  // but the Route component in App.tsx is what actually gives it priority
  {
    path: "/",
    element: <Index />
  },
  
  // All other routes in order of importance
  ...mainRoutes.filter(route => route.path !== "/"),
  ...dashboardRoutes,
  ...adminRoutes,
  ...callCenterRoutes,
  
  // Not found route as fallback
  {
    path: "*",
    element: <NotFound />,
  }
];

// Export individually for direct access
export { mainRoutes, dashboardRoutes, adminRoutes, callCenterRoutes };
