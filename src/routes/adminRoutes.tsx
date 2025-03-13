
import React from 'react';
import { RouteConfig } from './types';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import UserManagementPage from "../pages/admin/UserManagementPage";
import ClientsPage from "../pages/admin/ClientsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import RolesPage from "../pages/admin/RolesPage";
import PermissionsPage from "../pages/admin/PermissionsPage";
import ClientOnboardingPage from "../pages/admin/ClientOnboardingPage";

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute adminOnly>
        <UserManagementPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/clients",
    element: (
      <ProtectedRoute adminOnly>
        <ClientsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/admin-users",
    element: (
      <ProtectedRoute adminOnly>
        <AdminUsersPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/roles",
    element: (
      <ProtectedRoute adminOnly>
        <RolesPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/permissions",
    element: (
      <ProtectedRoute adminOnly>
        <PermissionsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/client-onboarding",
    element: (
      <ProtectedRoute adminOnly>
        <ClientOnboardingPage />
      </ProtectedRoute>
    )
  }
];
