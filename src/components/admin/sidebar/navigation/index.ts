
import { NavItem } from './types';
import { dashboardItems } from './dashboard';
import { userManagementItems } from './user-management';
import { deviceManagementItems } from './device-management';
import { alertsIncidentsItems } from './alerts-incidents';
import { callCenterItems } from './call-center';
import { productsInventoryItems } from './products-inventory';
import { salesOrdersItems } from './sales-orders';
import { financeItems } from './finance';
import { reportsAnalyticsItems } from './reports-analytics';
import { supportKnowledgeItems } from './support-knowledge';
import { configurationItems } from './configuration';

// Use 'export type' for re-exporting types
export type { NavItem } from './types';

export const navigationItems: NavItem[] = [
  ...dashboardItems,
  userManagementItems,
  deviceManagementItems,
  alertsIncidentsItems,
  callCenterItems,
  productsInventoryItems,
  salesOrdersItems,
  financeItems,
  reportsAnalyticsItems,
  supportKnowledgeItems,
  configurationItems
];
