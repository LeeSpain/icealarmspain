
import React from "react";
import { RouteConfig } from "./routes/types";
import SOSPendantPage from "./pages/SOSPendantPage";
import MedicalDispenserPage from "./pages/MedicalDispenserPage";
import GlucoseMonitorPage from "./pages/GlucoseMonitorPage";
import Signup from "./pages/signup";
import TestingPanel from "./components/test/TestingPanel";

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Define the routes that we've already implemented and need to keep
const customRoutes: RouteConfig[] = [
  {
    path: "/sos-pendant",
    element: <SOSPendantPage />,
  },
  {
    path: "/medical-dispenser",
    element: <MedicalDispenserPage />,
  },
  {
    path: "/glucose-monitor",
    element: <GlucoseMonitorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/testing", // Add testing route
    element: <TestingPanel />,
  }
];

// Mark protected routes
const protectedRoutes = allRoutes.map(route => {
  // Mark dashboard and admin routes as protected
  if (route.path.startsWith('/dashboard') || 
      route.path.startsWith('/admin') || 
      route.path.startsWith('/call-center')) {
    return {
      ...route,
      protected: true,
      allowedRoles: route.path.startsWith('/admin') 
        ? ['admin'] 
        : route.path.startsWith('/call-center')
          ? ['callcenter', 'admin']
          : undefined
    };
  }
  return route;
});

// Combine the imported routes with our custom routes
export const routes = [
  ...protectedRoutes,
  ...customRoutes
];
