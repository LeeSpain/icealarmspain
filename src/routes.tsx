import React from "react";
import { RouteConfig } from "./routes/types";
import { withLazyLoading } from "./utils/lazy-imports";
import TestingPanel from "./components/test/TestingPanel";
import { routes as allRoutes } from "./routes/index";
import Index from "./pages/Index";

// Use lazy loading but with null fallbacks
const SOSPendantPage = withLazyLoading(() => import("./pages/SOSPendantPage"), "Loading SOS Pendant page...");
const MedicalDispenserPage = withLazyLoading(() => import("./pages/MedicalDispenserPage"), "Loading Medical Dispenser page...");
const GlucoseMonitorPage = withLazyLoading(() => import("./pages/GlucoseMonitorPage"), "Loading Glucose Monitor page...");
const Signup = withLazyLoading(() => import("./pages/signup"), "Loading Signup page...");
const Checkout = withLazyLoading(() => import("./pages/Checkout"), "Loading Checkout page...");

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

// Combine the routes with custom routes taking precedence
export const routes = [
  ...customRoutes,
  ...protectedRoutes.filter(r => !customRoutes.some(cr => cr.path === r.path))
];
