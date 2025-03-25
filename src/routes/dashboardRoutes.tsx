
import React from 'react';
import { RouteConfig } from './types';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import DashboardEmergencyContactsPage from '@/pages/dashboard/DashboardEmergencyContactsPage';

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin', 'member']}>
        <DashboardHome />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/emergency-contacts",
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin', 'member']}>
        <DashboardEmergencyContactsPage />
      </ProtectedRoute>
    )
  }
];
