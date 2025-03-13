
import React from 'react';
import { RouteConfig } from './types';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CallCenterDashboard from "../pages/CallCenterDashboard";

export const callCenterRoutes: RouteConfig[] = [
  {
    path: "/call-center",
    element: (
      <ProtectedRoute allowedRoles={['callcenter']}>
        <CallCenterDashboard />
      </ProtectedRoute>
    )
  }
];
