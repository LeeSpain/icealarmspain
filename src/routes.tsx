import React from "react";
import { RouteConfig } from "./routes/types";
import { withLazyLoading } from "./utils/lazy-imports";
import TestingPanel from "./components/test/TestingPanel";

// Import Index directly to avoid lazy loading issues
import Index from "./pages/Index";

// Use lazy loading for other routes
const SOSPendantPage = withLazyLoading(() => import("./pages/SOSPendantPage"), "Loading SOS Pendant page...");
const MedicalDispenserPage = withLazyLoading(() => import("./pages/MedicalDispenserPage"), "Loading Medical Dispenser page...");
const GlucoseMonitorPage = withLazyLoading(() => import("./pages/GlucoseMonitorPage"), "Loading Glucose Monitor page...");
const Signup = withLazyLoading(() => import("./pages/signup"), "Loading Signup page...");
const Checkout = withLazyLoading(() => import("./pages/Checkout"), "Loading Checkout page...");

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Define the routes that we've already implemented and need to keep
const customRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />,
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

// Combine the imported routes with our custom routes, ensuring custom routes take precedence
export const routes = [
  ...customRoutes,
  ...protectedRoutes.filter(route => !customRoutes.some(cr => cr.path === route.path))
];
