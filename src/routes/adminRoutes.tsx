
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
import DevicesPage from "../pages/admin/DevicesPage";
import AlertsPage from "../pages/admin/AlertsPage";
import CallCenterPage from "../pages/admin/CallCenterPage";
import CallLogsPage from "../pages/admin/CallLogsPage";
import AgentPerformancePage from "../pages/admin/AgentPerformancePage";
import InventoryPage from "../pages/admin/InventoryPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductCatalogPage from "../pages/admin/ProductCatalogPage";
import ProductPricingPage from "../pages/admin/ProductPricingPage";

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
  },
  {
    path: "/admin/devices",
    element: (
      <ProtectedRoute adminOnly>
        <DevicesPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/alerts",
    element: (
      <ProtectedRoute adminOnly>
        <AlertsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/call-center",
    element: (
      <ProtectedRoute adminOnly>
        <CallCenterPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/call-logs",
    element: (
      <ProtectedRoute adminOnly>
        <CallLogsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/agent-performance",
    element: (
      <ProtectedRoute adminOnly>
        <AgentPerformancePage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/inventory",
    element: (
      <ProtectedRoute adminOnly>
        <InventoryPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute adminOnly>
        <ProductsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/product-catalog",
    element: (
      <ProtectedRoute adminOnly>
        <ProductCatalogPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/product-pricing",
    element: (
      <ProtectedRoute adminOnly>
        <ProductPricingPage />
      </ProtectedRoute>
    )
  }
];
