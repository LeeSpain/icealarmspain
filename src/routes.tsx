import React from "react";
import { RouteConfig } from "./routes/types";
import { withLazyLoading } from "./utils/lazy-imports";
import TestingPanel from "./components/test/TestingPanel";
import Index from "./pages/Index"; // Import Index directly to avoid lazy loading for home page
import NotFound from "./pages/NotFound"; // Explicitly import NotFound page

// Use lazy loading but with null fallbacks
const SOSPendantPage = withLazyLoading(() => import("./pages/SOSPendantPage"), "Loading SOS Pendant page...");
const MedicalDispenserPage = withLazyLoading(() => import("./pages/MedicalDispenserPage"), "Loading Medical Dispenser page...");
const GlucoseMonitorPage = withLazyLoading(() => import("./pages/GlucoseMonitorPage"), "Loading Glucose Monitor page...");
const Signup = withLazyLoading(() => import("./pages/signup"), "Loading Signup page...");
const Checkout = withLazyLoading(() => import("./pages/Checkout"), "Loading Checkout page...");
const Login = withLazyLoading(() => import("./pages/login"), "Loading Login page...");

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
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/testing", // Testing route
    element: <TestingPanel />,
  }
];

// Create a high-priority home route that loads immediately
const homeRoute: RouteConfig = {
  path: "/",
  element: <Index />, // Use direct import instead of lazy loading
  priority: "highest"  // Custom property to indicate highest priority
};

// Create a catch-all route for 404 errors
const notFoundRoute: RouteConfig = {
  path: "*",
  element: <NotFound />,
};

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

// Filter out any duplicate home routes from allRoutes
const otherMainRoutes = allRoutes.filter(route => 
  route.path !== "/" && 
  !protectedRoutes.find(pr => pr.path === route.path)
);

// Combine all routes with a carefully controlled order
export const routes = [
  homeRoute,                     // Home route first with highest priority
  ...customRoutes,               // Then custom routes
  ...otherMainRoutes,            // Then other main routes
  ...protectedRoutes,            // Then protected routes
  notFoundRoute,                 // Catch-all route last
];
