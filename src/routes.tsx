
import React from "react";
import { RouteConfig } from "./routes/types";
import { withLazyLoading } from "./utils/lazy-imports";
import TestingPanel from "./components/test/TestingPanel";
import Index from "./pages/Index"; // Import Index directly to avoid lazy loading for home page
import NotFound from "./pages/NotFound"; // Explicitly import NotFound page

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Create a high-priority home route that loads immediately
const homeRoute: RouteConfig = {
  path: "/",
  element: <Index />, // Use direct import instead of lazy loading
  priority: "highest"  // Custom property to indicate highest priority
};

// Create a catch-all route for 404 errors that loads immediately (no lazy loading)
const notFoundRoute: RouteConfig = {
  path: "*",
  element: <NotFound />,
};

// Combine all routes with a carefully controlled order
export const routes = [
  homeRoute,                     // Home route first with highest priority
  ...allRoutes,                  // Then all other routes
  notFoundRoute,                 // Catch-all route last
];
