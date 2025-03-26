
import React from "react";
import { RouteConfig } from "./routes/types";
import Index from "./pages/Index"; 
import NotFound from "./pages/NotFound"; 

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Create a home route that loads immediately without any complexities
const homeRoute: RouteConfig = {
  path: "/",
  element: <Index />
};

// Create a catch-all route for 404 errors
const notFoundRoute: RouteConfig = {
  path: "*",
  element: <NotFound />,
};

// Combine all routes with a carefully controlled order
export const routes = [
  homeRoute,     // Home route first with highest priority
  ...allRoutes,  // Then all other routes
  notFoundRoute, // Catch-all route last
];
