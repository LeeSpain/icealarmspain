import React from "react";
import { RouteConfig } from "./routes/types";
import { withLazyLoading } from "./utils/lazy-imports";
import TestingPanel from "./components/test/TestingPanel";
import Index from "./pages/Index"; // Import the Index component directly

// Use lazy loading with null fallbacks for other pages
const SOSPendantPage = withLazyLoading(() => import("./pages/SOSPendantPage"));
const MedicalDispenserPage = withLazyLoading(() => import("./pages/MedicalDispenserPage"));
const GlucoseMonitorPage = withLazyLoading(() => import("./pages/GlucoseMonitorPage"));
const Signup = withLazyLoading(() => import("./pages/signup"));
const Checkout = withLazyLoading(() => import("./pages/Checkout"));

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Define the routes that we've already implemented and need to keep
const customRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />,  // Use Index component directly for homepage
  },
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
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/testing", // Testing route
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
  ...customRoutes,  // Put custom routes first to ensure they take precedence
  ...protectedRoutes
];
