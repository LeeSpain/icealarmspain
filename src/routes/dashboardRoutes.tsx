
import React from 'react';
import { RouteConfig } from './types';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import DashboardChatPage from "../pages/dashboard/DashboardChatPage";
import DashboardPersonalDetailsPage from "../pages/dashboard/DashboardPersonalDetailsPage";
import DashboardEmergencyContactsPage from "../pages/dashboard/DashboardEmergencyContactsPage";
import DashboardHealthMetricsPage from "../pages/dashboard/DashboardHealthMetricsPage";
import DashboardMedicalInfoPage from "../pages/dashboard/DashboardMedicalInfoPage";
import DashboardMedicationsPage from "../pages/dashboard/DashboardMedicationsPage";
import DashboardProfilePage from "../pages/dashboard/DashboardProfilePage";
import DashboardSettingsPage from "../pages/dashboard/DashboardSettingsPage";
import DashboardHelpPage from "../pages/dashboard/DashboardHelpPage";
import SOSPendantPage from "../pages/member/SOSPendantPage";
import GlucoseMonitorPage from "../pages/member/GlucoseMonitorPage";
import MedicalDispenserPage from "../pages/member/MedicalDispenserPage";

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/chat",
    element: (
      <ProtectedRoute>
        <DashboardChatPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/personal-details",
    element: (
      <ProtectedRoute>
        <DashboardPersonalDetailsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/emergency-contacts",
    element: (
      <ProtectedRoute>
        <DashboardEmergencyContactsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/questionnaire",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/profile",
    element: (
      <ProtectedRoute>
        <DashboardProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/settings",
    element: (
      <ProtectedRoute>
        <DashboardSettingsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/help",
    element: (
      <ProtectedRoute>
        <DashboardHelpPage />
      </ProtectedRoute>
    )
  },
  // Device pages
  {
    path: "/dashboard/devices/sos-pendant",
    element: (
      <ProtectedRoute>
        <SOSPendantPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/devices/glucose-monitor",
    element: (
      <ProtectedRoute>
        <GlucoseMonitorPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/devices/medical-dispenser",
    element: (
      <ProtectedRoute>
        <MedicalDispenserPage />
      </ProtectedRoute>
    )
  },
  // Health pages
  {
    path: "/dashboard/health/metrics",
    element: (
      <ProtectedRoute>
        <DashboardHealthMetricsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/health/medications",
    element: (
      <ProtectedRoute>
        <DashboardMedicationsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/health/info",
    element: (
      <ProtectedRoute>
        <DashboardMedicalInfoPage />
      </ProtectedRoute>
    )
  }
];
