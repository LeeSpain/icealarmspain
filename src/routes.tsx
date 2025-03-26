
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
  // Home route with highest priority
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
