
import { ReactNode } from 'react';

export interface AdminDashboardContentProps {
  activeSection: string;
  dashboardData: any;
  addActivity: (type: string, description: string) => void;
}

declare const AdminDashboardContent: React.FC<AdminDashboardContentProps>;
export default AdminDashboardContent;
