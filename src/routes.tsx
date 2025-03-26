
import React from "react";
import { RouteConfig } from "./routes/types";
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 
import { mainRoutes } from "./routes/mainRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { callCenterRoutes } from "./routes/callCenterRoutes";

// Create a flat array of routes with direct imports
export const routes: RouteConfig[] = [
  // Home route explicitly defined first for priority
  {
    path: "/",
    element: <Index />
  },
  
  // All other routes, filtering out any duplicate home routes
  ...mainRoutes.filter(route => route.path !== "/"),
  ...dashboardRoutes,
  ...adminRoutes,
  ...callCenterRoutes,
  
  // Not found route
  {
    path: "*",
    element: <NotFound />,
  }
];
