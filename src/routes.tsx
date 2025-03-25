
import React from "react";
import { lazy } from "react";
import PlaceholderPage from "./components/placeholder/PlaceholderPage";
import TestingPage from "./pages/TestingPage";
import HomePage from "./pages/HomePage";

// Define route configuration type
export interface RouteConfig {
  path: string;
  element: any;
  protected?: boolean;
  allowedRoles?: string[];
}

// Use placeholder components for most routes
const createPlaceholder = (name: string) => () => React.createElement(PlaceholderPage, { name });

// Route definitions with placeholders
export const routes: RouteConfig[] = [
  {
    path: "/",
    element: HomePage,
    protected: false,
  },
  {
    path: "/about",
    element: createPlaceholder("About Page"),
    protected: false,
  },
  {
    path: "/contact",
    element: createPlaceholder("Contact Page"),
    protected: false,
  },
  {
    path: "/login",
    element: createPlaceholder("Login Page"),
    protected: false,
  },
  {
    path: "/signup",
    element: createPlaceholder("Signup Page"),
    protected: false,
  },
  {
    path: "/products",
    element: createPlaceholder("Products Page"),
    protected: false,
  },
  {
    path: "/testing",
    element: TestingPage,
    protected: false,
  },
  {
    path: "/dashboard",
    element: createPlaceholder("Dashboard Page"),
    protected: true,
  },
  {
    path: "/member-dashboard",
    element: createPlaceholder("Member Dashboard"),
    protected: true,
    allowedRoles: ["member"],
  },
  {
    path: "/admin-dashboard",
    element: createPlaceholder("Admin Dashboard"),
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/ai-guardian",
    element: createPlaceholder("AI Guardian Dashboard"),
    protected: true,
    allowedRoles: ["member", "admin"],
  },
  {
    path: "*",
    element: createPlaceholder("Not Found Page"),
    protected: false,
  }
];
