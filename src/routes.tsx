
import React from "react";
import { RouteObject } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Define route objects for use in App.tsx
export const routes: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />
  }
];
