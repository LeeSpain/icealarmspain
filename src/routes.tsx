
import React from "react";
import { RouteConfig } from "./routes/types";
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 

// Create a flat array of routes with default direct imports
export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />
  },
  // Import other main routes directly to avoid any async loading issues
  ...require("./routes/mainRoutes").mainRoutes,
  ...require("./routes/dashboardRoutes").dashboardRoutes,
  ...require("./routes/adminRoutes").adminRoutes,
  ...require("./routes/callCenterRoutes").callCenterRoutes,
  {
    path: "*",
    element: <NotFound />,
  }
];
