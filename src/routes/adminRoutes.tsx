
import React from 'react';
import { RouteConfig } from './types';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    )
  }
];
