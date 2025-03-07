
import { Role } from './types';
import { toast } from "react-toastify";

// Mock role data
export const initialRoles: Role[] = [
  {
    id: "role-001",
    name: "Administrator",
    description: "Full system access with all permissions",
    status: "active",
    permissionCount: 32,
    userCount: 5,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:20:00Z",
    isDefault: true,
    isMutable: false
  },
  {
    id: "role-002",
    name: "Call Center Agent",
    description: "Access to customer support and call management features",
    status: "active",
    permissionCount: 12,
    userCount: 24,
    createdAt: "2023-01-16T11:30:00Z",
    updatedAt: "2023-06-12T09:45:00Z",
    isDefault: true,
    isMutable: true
  },
  {
    id: "role-003",
    name: "Sales Representative",
    description: "Access to sales and customer information",
    status: "active",
    permissionCount: 8,
    userCount: 15,
    createdAt: "2023-02-05T14:30:00Z",
    updatedAt: "2023-07-18T16:20:00Z",
    isMutable: true
  },
  {
    id: "role-004",
    name: "Technician",
    description: "Access to device management and technical support",
    status: "active",
    permissionCount: 10,
    userCount: 18,
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-08-22T11:10:00Z",
    isMutable: true
  },
  {
    id: "role-005",
    name: "Regional Manager",
    description: "Access to region-specific information and management",
    status: "active",
    permissionCount: 15,
    userCount: 8,
    createdAt: "2023-04-12T13:45:00Z",
    updatedAt: "2023-09-14T10:35:00Z",
    isMutable: true
  },
  {
    id: "role-006",
    name: "Billing Staff",
    description: "Access to billing and payment information",
    status: "inactive",
    permissionCount: 6,
    userCount: 0,
    createdAt: "2023-05-20T10:30:00Z",
    updatedAt: "2023-10-05T15:40:00Z",
    isMutable: true
  }
];

// Simulate API fetch
export const fetchRoles = async (): Promise<Role[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return initialRoles;
};

// Create role
export const createRole = (name: string, description: string, status: 'active' | 'inactive'): Role => {
  return {
    id: `role-${Date.now()}`,
    name,
    description,
    status,
    permissionCount: 0,
    userCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isMutable: true
  };
};
